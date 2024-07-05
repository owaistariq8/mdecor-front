import PropTypes from 'prop-types';
import { TableCell } from '@mui/material';
import { alpha, createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import { StyledTooltip } from '../../theme/styles/default-styles';
import Iconify from '../iconify';
import { ICONS } from '../../constants/icons/default-icons';
import useLimitString from '../../hooks/useLimitString';

TableCellCustom.propTypes = {
  align: PropTypes.string,
  onClick: PropTypes.func,
  node: PropTypes.node,
  param: PropTypes.string,
  maxWidth: PropTypes.number,
  isDefault: PropTypes.bool,
};

export default function TableCellCustom({ align, onClick, param, node, maxWidth, isDefault }) {

  const theme = createTheme({
    palette: { success: green },
  });

  return (
      <TableCell className='ellipsis-cell' onClick={onClick} align={align}
          color="inherit"
          sx={{
            cursor: onClick?'pointer':'auto',
            textDecoration: onClick?'underline':'none',
            textDecorationStyle: 'dotted',
            fontWeight: onClick?'bold':'',
            whiteSpace: maxWidth?'nowrap':'',      // Prevent text from wrapping
            overflow: 'hidden',       // Hide any overflow
            textOverflow: 'ellipsis', // Add ellipsis for overflowed text
            maxWidth,
            '&:hover': {
              color: () => alpha(theme.palette.info.main, 0.98),
            },
          }}
          >
        {/* { useLimitString( param , stringLength || 30) }  */}
        {param}
        {isDefault && 
          <StyledTooltip onClick={onClick} title={ICONS.DEFAULT.heading} placement="top" disableFocusListener tooltipcolor={theme.palette.primary.main}>
            <Iconify icon={ICONS.DEFAULT.icon} color={theme.palette.primary.main} width="17px" height="17px" sx={{ mb: -0.3, ml: 0.5, cursor:"pointer"}}/>
          </StyledTooltip>
        }
        { node }
      </TableCell>
  );
}


