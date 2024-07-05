import PropTypes from 'prop-types';
// @mui
import { Switch, TableCell } from '@mui/material';
// utils
import { useScreenSize } from '../../../hooks/useResponsive';
import { StyledTableRow } from '../../../theme/styles/default-styles'
import { TableCellCustom } from '../../../components/table';

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
  const mdScreen = useScreenSize('md')

  return (
      <StyledTableRow hover selected={selected}>
        <TableCellCustom onClick={onViewRow} param={name} isDefault={isDefault} />
        {mdScreen &&  <TableCellCustom maxWidth={700} param={desc} />}
        <TableCell align="center"><Switch checked={isActive} disabled size="small" /></TableCell>
      </StyledTableRow>
  );
}
