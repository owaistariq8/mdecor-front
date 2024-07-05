import PropTypes from 'prop-types';
import { useState, useEffect , useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash/debounce';
// @mui
import {
  Table,
  Button,
  TableBody,
  Container,
  TableContainer,
  // Stack,
} from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
// routes
import { PATH_CUSTOMERS } from '../../routes/paths';
// components
import {
  useTable,
  getComparator,
  TableNoData,
  TableSkeleton,
  TableHeadCustom,
  TablePaginationCustom,
} from '../../components/table';
import Scrollbar from '../../components/scrollbar';
import ConfirmDialog from '../../components/confirm-dialog';

// sections
import CustomerListTableRow from './CustomerListTableRow';
import CustomerListTableToolbar from './CustomerListTableToolbar';
import { getCustomers, resetCustomers, ChangePage, ChangeRowsPerPage, setFilterBy, setExcludeReporting, getCustomer } from '../../redux/slices/customer/customer';
import TableCard from '../../components/ListTableTools/TableCard';
import { fDate } from '../../utils/formatTime';
import { useSnackbar } from '../../components/snackbar';
import { exportCSV } from '../../utils/exportCSV';
import PageCover from '../../components/Defaults/PageCover';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'code', label: 'Code', align: 'left' },
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'phone', label: 'Phone', align: 'left' },
  { id: 'email', label: 'Email', align: 'left' },
  { id: 'city', label: 'City', align: 'left' },
  { id: 'isActive', label: 'Active', align: 'center' },
  { id: 'createdAt', label: 'Created At', align: 'left' },
];

// ----------------------------------------------------------------------
 
export default function CustomerList() {
  const {
    order,
    orderBy,
    setPage,
    selected,
    onSelectRow,
    onSort,
  } = useTable({
    defaultOrderBy: 'createdAt', defaultOrder: 'desc',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  
  const [tableData, setTableData] = useState([]);
  const [filterStatus, setFilterStatus] = useState([]);
  const [openConfirm, setOpenConfirm] = useState(false);
  const { customers, filterBy, verified, excludeReporting, page, rowsPerPage, isLoading } = useSelector((state) => state.customer);
  const [filterVerify, setFilterVerify] = useState(verified);
  const [filterExcludeRepoting, setFilterExcludeRepoting] = useState(excludeReporting);
  const [filterName, setFilterName] = useState(filterBy);

  const onChangeRowsPerPage = (event) => {
    dispatch(ChangePage(0));
    dispatch(ChangeRowsPerPage(parseInt(event.target.value, 10)));
  };
  const onChangePage = (event, newPage) => { 
    dispatch(ChangePage(newPage)) 
  }

  useEffect(() => {
    dispatch(getCustomers());
    return ()=> { dispatch( resetCustomers() ) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch ]);

  useEffect(() => {
    setTableData(customers || []);
  }, [customers]);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const denseHeight = 60;
  const isFiltered = filterName !== '' || !!filterStatus.length;
  const isNotFound = (!dataFiltered.length && !!filterName) || (!isLoading && !dataFiltered.length);

  const handleCloseConfirm = () => setOpenConfirm(false);

  const debouncedSearch = useRef(debounce((value) => {
      dispatch(ChangePage(0))
      dispatch(setFilterBy(value))
  }, 500))

  const handleFilterName = (event) => {
    debouncedSearch.current(event.target.value)
    setFilterName(event.target.value)
    setPage(0);
  };

  useEffect(() => {
    debouncedSearch.current.cancel();
  }, [debouncedSearch]);

  const handleViewRow = (id) => {
    dispatch(getCustomer(id));
    navigate(PATH_CUSTOMERS.customers.view(id));
  };

  const handleResetFilter = () => {
    dispatch(setFilterBy(''))
    setFilterName('');
    setFilterStatus([]);
  }; 

  const [exportingCSV, setExportingCSV] = useState(false);
  const onExportCSV = async (fetchAllContacts, fetchAllSites) => {
    const response = dispatch(await exportCSV( 'Customers' ));
    response.then((res) => {
        setExportingCSV(false);
      enqueueSnackbar(res.message, {variant:`${res.hasError?"error":""}`});
    });
  };

  return (
    <Container maxWidth={false}>
      <PageCover title='Customers' />
      <TableCard >
        <CustomerListTableToolbar
          isFiltered={isFiltered}
          filterName={filterName}
          onFilterName={handleFilterName}
          onResetFilter={handleResetFilter}
        />

        {!isNotFound && <TablePaginationCustom
          count={customers?customers.length : 0}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={onChangePage}
          onRowsPerPageChange={onChangeRowsPerPage}
        />}
        
        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>

          <Scrollbar>
            <Table size="small" sx={{ minWidth: 360 }}>
              <TableHeadCustom
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                onSort={onSort}
              />

              <TableBody>
                {(isLoading ? [...Array(rowsPerPage)] : dataFiltered)
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) =>
                    row ? (
                      <CustomerListTableRow
                        key={row._id}
                        row={row}
                        selected={selected.includes(row._id)}
                        onSelectRow={() => onSelectRow(row._id)}
                        onViewRow={() => handleViewRow(row._id)}
                        style={index % 2 ? { background: 'red' } : { background: 'green' }}
                      />
                    ) : (
                      !isNotFound && <TableSkeleton key={index} sx={{ height: denseHeight }} />
                    )
                  )}
                  <TableNoData isNotFound={isNotFound} />
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>

        {!isNotFound && <TablePaginationCustom
          count={customers?customers.length : 0}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={onChangePage}
          onRowsPerPageChange={onChangeRowsPerPage}
        />}

      </TableCard>
    </Container>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, comparator, filterName, filterVerify, filterExcludeRepoting, filterStatus }) {
  if(Array.isArray(inputData) && inputData.length>0) {
    const stabilizedThis = inputData.map((el, index) => [el, index]);

    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });

    inputData = stabilizedThis.map((el) => el[0]);
    if (filterName) {
      filterName = filterName.trim();
      filterName = filterName.toLowerCase();

      inputData = inputData.filter(
        (customer) =>
          customer?.code?.toString().toLowerCase().indexOf(filterName) >= 0 ||
          `${customer?.firstName} ${customer?.lastName}`?.toString().toLowerCase().indexOf(filterName) >= 0 ||
          customer?.email?.toString().toLowerCase().indexOf(filterName) >= 0 ||
          customer?.phone?.toString().toLowerCase().indexOf(filterName) >= 0 ||
          customer?.city?.toString().toLowerCase().indexOf(filterName) >= 0 ||
          fDate(customer?.createdAt)?.toLowerCase().indexOf(filterName) >= 0
      );
    }
  } else {
    inputData = [];
  }
  

  return inputData;
}
