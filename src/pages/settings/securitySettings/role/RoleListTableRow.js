import PropTypes from 'prop-types';
// @mui
import { useState } from 'react';
import { Button, IconButton, Switch, TableCell } from '@mui/material';
// utils
import { fDate } from '../../../../utils/formatTime';
import { useWidth } from '../../../../hooks/useResponsive';
import { StyledTableRow } from '../../../../theme/styles/default-styles'
import ConfirmDialog from '../../../../components/confirm-dialog';
import Iconify from '../../../../components/iconify';

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
  const { name, desc, roleType, isActive, disableDelete, createdAt } = row;
  const width = useWidth();

  const [openConfirm, setOpenConfirm] = useState(false);
  
  const toggleConfirm = () => {
    setOpenConfirm(!openConfirm)
  };

  return (
    <>
      <StyledTableRow hover selected={selected}>
        {/* <LinkTableCell align="left" onClick={onViewRow} param={name} /> */}
        <TableCell align="left">{name}</TableCell>
        <TableCell align="left">{desc}</TableCell>
        <TableCell align="left">{roleType}</TableCell>
        <TableCell align="center"><Switch checked={isActive} disabled size="small" /></TableCell>
        <TableCell align="right">{fDate(createdAt)}</TableCell>
        <TableCell align="right">
          {onEditRow && 
            <IconButton color='info' onClick={onEditRow}><Iconify icon="tabler:edit" /></IconButton>
          }
          {!disableDelete && onDeleteRow && 
            <IconButton color='error' onClick={toggleConfirm}><Iconify icon="tabler:trash" /></IconButton>
          }
        </TableCell>  
      </StyledTableRow>
      <ConfirmDialog open={openConfirm} onClose={toggleConfirm}
        title="Delete" content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>Delete</Button>
        }
      />
    </>
  );
}
