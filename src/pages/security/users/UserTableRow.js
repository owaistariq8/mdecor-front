import PropTypes from 'prop-types';
// @mui
import {
  Switch,
  Stack,
  TableRow,
  TableCell,
  Chip
} from '@mui/material';
// components
import Iconify from '../../../components/iconify';
import { fDate } from '../../../utils/formatTime';
import CustomAvatar from '../../../components/custom-avatar/CustomAvatar';
import LinkTableCell from '../../../components/ListTableTools/LinkTableCell';
import { useScreenSize } from '../../../hooks/useResponsive';
import BadgeStatus from '../../../components/badge-status/BadgeStatus';
import { ICONS } from '../../../constants/icons/default-icons';
import { StyledTooltip } from '../../../theme/styles/default-styles';

// ----------------------------------------------------------------------

UserTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onViewRow: PropTypes.func,
};

export default function UserTableRow({
  row,
  selected,
  onEditRow,
  onViewRow,
  onSelectRow,
  onDeleteRow,
}) {
  const { firstName, lastName, email, roles, phone, createdAt, contact, isActive, isOnline, status } = row;

  const smScreen = useScreenSize('sm')
  const lgScreen = useScreenSize('lg')
  
  return (
      <TableRow hover selected={selected} >
          <Stack direction="row" alignItems="center">
            <CustomAvatar name={`${firstName} ${lastName}`} alt={`${firstName} ${lastName}`}
              BadgeProps={{
                badgeContent: <BadgeStatus status={isOnline?"online":"offline"} />,
              }}
              sx={{ p:2, ml: 1, my: 0.5, width: '30px', height: '30px' }}
            />
            <LinkTableCell align="left" onClick={onViewRow} param={`${firstName} ${lastName}`} />
          </Stack>
        { smScreen && <TableCell align="left">{email || ''}</TableCell>}
        { smScreen && <TableCell align="left">{phone || ''}</TableCell>}
        <TableCell align="center"><Switch checked={isActive} disabled size="small" /></TableCell>
        <TableCell align="right">{fDate(createdAt)}</TableCell>
      </TableRow>
  );
}
