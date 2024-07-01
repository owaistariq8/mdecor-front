import PropTypes from 'prop-types';
// import orderBy from 'lodash/orderBy';
import { useSelector } from 'react-redux';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Stack, Card, Divider, Typography, CardHeader } from '@mui/material';
// components
import Iconify from '../iconify';
// import Logo from '../../../components/logo-avatar/LogoAvatar';
import LogoAvatar from '../logo-avatar/LogoAvatar';
import { CustomAvatar } from '../custom-avatar';
import { StyledCardHeader } from '../settings/styles';

// ----------------------------------------------------------------------

OperatorsWidget.propTypes = {
  list: PropTypes.array,
  title: PropTypes.string,
  subheader: PropTypes.string,
};

export default function OperatorsWidget({ title, subheader, list }) {
  return (
    <Card>
      <StyledCardHeader title={title} subheader={subheader} />
      <Divider />
      <Box sx={{ overflowY: 'auto', maxHeight: '410px' }}>
        <Stack sx={{ p: 2 }}>
          {list.map((item, index) => (
            <OperatorItem key={item.id || index} operator={item} index={index} />
          ))}
        </Stack>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

OperatorItem.propTypes = {
  operator: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    avatar: PropTypes.string,
    product: PropTypes.string,
  }),
  index: PropTypes.number,
};

function OperatorItem({ operator, index }) {
  return (
    <Stack key={operator.id} direction="row" alignItems="center" spacing={1} sx={{padding:'10px 0px', borderTop:'1px solid #e9e9e9' }}>
      <CustomAvatar name={operator.name} />
      <Box sx={{ flexGrow: 1}}>
        <Typography variant="subtitle2">{operator.name}</Typography>
        <Typography variant="caption" sx={{display: 'flex', alignItems: 'center', color: 'text.secondary'}}>
          <Iconify icon="mdi:pin" width={16} color="green" />
            {operator.description}
        </Typography>
      </Box>

      <LogoAvatar
        src={operator.product}
        sx={{
          p: 1,
          width: 40,
          height: 40,
          borderRadius: '50%',
          color: 'primary.main',
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          ...(index === 1 && {
            color: 'info.main',
            bgcolor: (theme) => alpha(theme.palette.info.main, 0.08),
          }),
          ...(index === 2 && {
            color: 'error.main',
            bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
          }),
        }}
      />
    </Stack>
  );
}
