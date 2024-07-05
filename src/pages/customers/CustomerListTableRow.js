import PropTypes from 'prop-types';
// @mui
import {
  Switch,
  TableCell,
  Chip,
} from '@mui/material';
// utils
import { fDate } from '../../utils/formatTime';
// components
import { useScreenSize } from '../../hooks/useResponsive';
import { StyledTableRow } from '../../theme/styles/default-styles'
import { TableCellCustom } from '../../components/table';

// ----------------------------------------------------------------------

CustomerListTableRow.propTypes = {
  row: PropTypes.object,
  style: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onViewRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  isArchived: PropTypes.bool,
};


export default function CustomerListTableRow({
  row,
  style,
  selected,
  onSelectRow,
  onDeleteRow,
  onEditRow,
  onViewRow,
  isArchived,
}) {
  const { code, firstName, lastName, phone, email, isActive, createdAt } = row;
  
  const smScreen = useScreenSize('sm');
  const mdScreen = useScreenSize('md');
  
  return (
    <StyledTableRow hover selected={selected}>
      <TableCellCustom onClick={onViewRow} param={code} />
      <TableCellCustom onClick={onViewRow} param={`${firstName} ${lastName}`} />
      {smScreen && <TableCellCustom param={phone} />}
      {mdScreen && <TableCellCustom param={email} />}
      <TableCell align="center"><Switch checked={isActive} disabled size="small" /></TableCell>
      {mdScreen && <TableCell>{fDate(createdAt)}</TableCell>}
    </StyledTableRow>
  );
}
