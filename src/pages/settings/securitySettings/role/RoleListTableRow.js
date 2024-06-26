import PropTypes from 'prop-types';
// @mui
import { Switch, TableCell } from '@mui/material';
// utils
import { fDate } from '../../../../utils/formatTime';
import LinkTableCell from '../../../../components/ListTableTools/LinkTableCell';
import { useWidth } from '../../../../hooks/useResponsive';
import { StyledTableRow } from '../../../../theme/styles/default-styles'

// ----------------------------------------------------------------------

RoleListTableRow.propTypes = {
  row: PropTypes.object,
  style: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onViewRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function RoleListTableRow({
  row,
  style,
  selected,
  onSelectRow,
  onDeleteRow,
  onEditRow,
  onViewRow,
}) {
  const { name, roleType, isActive, isDefault, createdAt } = row;

  // const [openConfirm, setOpenConfirm] = useState(false);

  // const [openPopover, setOpenPopover] = useState(null);

  const width = useWidth();

  // const handleOpenConfirm = () => {
  //   setOpenConfirm(true);
  // };

  // const handleCloseConfirm = () => {
  //   setOpenConfirm(false);
  // };

  // const handleOpenPopover = (event) => {
  //   setOpenPopover(event.currentTarget);
  // };

  // const handleClosePopover = () => {
  //   setOpenPopover(null);
  // };

  return (
    <>
      <StyledTableRow hover selected={selected}>
        {/* <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell> */}
        {/* <Iconify icon="octicon:package-dependents-16" sx={{ color: 'text.disabled' }} /> */}
        <LinkTableCell align="left" onClick={onViewRow} param={name} isDefault={isDefault}  />
        {( width === 'lg' || width === 'xl' ) &&  <TableCell align="left"> {roleType} </TableCell>}
        <TableCell align="center">
          {' '}
          <Switch checked={isActive} disabled size="small" />{' '}
        </TableCell>
        <TableCell align="right">{fDate(createdAt)}</TableCell>
        {/* <TableCell align="center">
          <IconButton color={openPopover ? 'primary' : 'default'} onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>   */}
      </StyledTableRow>

      {/* <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:trash-2-outline" />
          Delete
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEditRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          Edit
        </MenuItem>
      </MenuPopover> */}

      {/* <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      /> */}
    </>
  );
}
