import PropTypes from 'prop-types';
// @mui
import { Switch, TableCell } from '@mui/material';
// utils
import { fDate } from '../../../utils/formatTime';
import LinkTableCell from '../../../components/ListTableTools/LinkTableCell';
import { useWidth } from '../../../hooks/useResponsive';
import { StyledTableRow } from '../../../theme/styles/default-styles'

// ----------------------------------------------------------------------

ItemCategoryListTableRow.propTypes = {
  row: PropTypes.object,
  style: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onViewRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function ItemCategoryListTableRow({
  row,
  style,
  selected,
  onSelectRow,
  onDeleteRow,
  onEditRow,
  onViewRow,
}) {
  const { name, desc, isActive, isDefault, createdAt } = row;
  const width = useWidth();

  return (
      <StyledTableRow hover selected={selected}>
        <LinkTableCell align="left" onClick={onViewRow} param={name} isDefault={isDefault}  />
        {( width === 'lg' || width === 'xl' ) &&  <TableCell align="left"> {desc} </TableCell>}
        <TableCell align="center"><Switch checked={isActive} disabled size="small" /></TableCell>
      </StyledTableRow>
  );
}
