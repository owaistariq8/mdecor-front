import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash/debounce';
// @mui
import { Card, Table, TableBody, Container, TableContainer } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
// routes
import { PATH_SECURITY } from '../../../routes/paths';
// components
import { useSnackbar } from '../../../components/snackbar';
import Scrollbar from '../../../components/scrollbar';
import { Cover } from '../../../components/Defaults/Cover';
import {
  useTable,
  getComparator,
  TableNoData,
  TableSkeleton,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from '../../../components/table';
// sections
import UserTableToolbar from './UserTableToolbar';
import UserTableRow from './UserTableRow';
import {
  getUsers,
  resetUsers,
  ChangeRowsPerPage,
  ChangePage,
  setFilterBy,
  setActiveFilterList,
  setEmployeeFilterList,
  getUser,
} from '../../../redux/slices/user/user';
import { fDate } from '../../../utils/formatTime';
// constants
import TableCard from '../../../components/ListTableTools/TableCard';
import { StyledCardContainer } from '../../../theme/styles/default-styles';

// ----------------------------------------------------------------------

// const STATUS_OPTIONS = ['all', 'active', 'banned'];

const ROLE_OPTIONS = ['Administrator', 'Normal User', 'Guest User', 'Restriced User'];

const TABLE_HEAD = [
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'email', visibility: 'xs1', label: 'Email', align: 'left' },
  { id: 'phone', visibility: 'xs2', label: 'Phone Number', align: 'left' },
  { id: 'roles.name.[]', visibility: 'md1', label: 'Roles', align: 'left' },
  { id: 'contact.firstName', label: 'Contact', align: 'left' },
  { id: 'isActive', label: 'Active', align: 'center' },
  { id: 'createdAt', label: 'Created At', align: 'right' },
];

// ----------------------------------------------------------------------

export default function UserList() {
  const {
    dense,
    order,
    orderBy,
    setPage,
    selected,
    onSelectRow,
    onSort,
  } = useTable({
    defaultOrderBy: 'isOnline', defaultOrder: 'desc',
  });

  const dispatch = useDispatch();
  const {
    users,
    error,
    responseMessage,
    initial,
    userEditFormVisibility,
    userFormVisibility,
    filterBy, 
    employeeFilterList, 
    filterRegion,
    activeFilterList, 
    page, 
    rowsPerPage, 
    isLoading
  } = useSelector((state) => state.user);

  const onChangeRowsPerPage = (event) => {
    dispatch(ChangePage(0));
    dispatch(ChangeRowsPerPage(parseInt(event.target.value, 10))); 
  };
  const  onChangePage = (event, newPage) => { dispatch(ChangePage(newPage)) }
  
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [ tableData, setTableData ] = useState([]);
  const [ filterName, setFilterName ] = useState('');
  

  useLayoutEffect(() => {
    dispatch(getUsers());
    return ()=>{
      dispatch(resetUsers());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, userEditFormVisibility, userFormVisibility]);

  useEffect(() => {
    setTableData(users);
  }, [users, error, enqueueSnackbar, responseMessage, initial]);
  
  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterName
  });
  
  const denseHeight = 60;
  const isFiltered = filterName !== '';
  const isNotFound = (!dataFiltered.length && !!filterName) ||(!dataFiltered.length && !isLoading);

  const debouncedSearch = useRef(debounce((value) => {
    dispatch(ChangePage(0))
    dispatch(setFilterBy(value))
  }, 500))

  const handleFilterName = (event) => {
    debouncedSearch.current(event.target.value);
    setFilterName(event.target.value)
    setPage(0);
  };

  useEffect(() => {
      debouncedSearch.current.cancel();
  }, [debouncedSearch]);

  useEffect(()=>{
      setFilterName(filterBy)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const handleViewRow = (id) => {
    navigate(PATH_SECURITY.user.view(id));
  };

  const handleResetFilter = () => {
    dispatch(setFilterBy(''))
    setFilterName('');
  };

  const onRefresh = () => {
    dispatch(getUsers());
  };

  return (
      <Container maxWidth={false}>
        <StyledCardContainer><Cover icon="ph:users-light" name="Users" /></StyledCardContainer>
        <TableCard>
          <UserTableToolbar
            isFiltered={isFiltered}
            filterName={filterName}
            onFilterName={handleFilterName}
            onResetFilter={handleResetFilter}
            onReload={onRefresh}
          />

        {!isNotFound && <TablePaginationCustom
            count={dataFiltered.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
          />}
          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <TableSelectedAction
              dense={dense}
              numSelected={selected.length}
              rowCount={tableData.length}
            />

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
                        <UserTableRow
                        key={row._id}
                        row={row}
                        selected={selected.includes(row._id)}
                        onSelectRow={() => onSelectRow(row._id)}
                        onViewRow={() => handleViewRow(row._id)}
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
            count={dataFiltered.length}
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

function applyFilter({ inputData, comparator, filterName }) {
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
        (_user) =>
          _user?.name?.toString().toLowerCase().indexOf(filterName) >= 0 ||
          _user?.email?.toString().toLowerCase().indexOf(filterName) >= 0 ||
          _user?.phone?.toString().toLowerCase().indexOf(filterName) >= 0 ||
          fDate(_user?.createdAt)?.toLowerCase().indexOf(filterName) >= 0
      );
    }

  } else {
    inputData = [];
  }
  

 
  return inputData;
}
