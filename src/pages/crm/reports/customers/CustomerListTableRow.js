import PropTypes from 'prop-types';
// @mui
import {
  Switch,
  TableCell,
  Chip,
} from '@mui/material';
// utils
import { fDate } from '../../../../utils/formatTime';
// components
import LinkTableCellWithIcon from '../../../../components/ListTableTools/LinkTableCellWithIcon';
import LinkTableCell from '../../../../components/ListTableTools/LinkTableCell';
import { useScreenSize } from '../../../../hooks/useResponsive';
import { StyledTableRow } from '../../../../theme/styles/default-styles'


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
  const { name, isActive, createdAt, type } = row;
  
  const smScreen = useScreenSize('sm')
  return (
    <StyledTableRow hover selected={selected}>
      <LinkTableCellWithIcon
        align="left"
        onClick={ onViewRow }
        param={name}
        main={type?.toLowerCase() === 'sp'}
      />
      <TableCell align="center">
        {' '}
        <Switch checked={isActive} disabled size="small" />{' '}
      </TableCell>
      <TableCell>{fDate(createdAt)}</TableCell>
    </StyledTableRow>
  );
}
