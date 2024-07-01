import PropTypes from 'prop-types';
// @mui
import { Typography, Stack , Grid, Divider} from '@mui/material';
import { QRCodeCanvas } from 'qrcode.react';
// components
import Logo from '../../components/logo';
//
import { CONFIG } from '../../config-global';
//
import { StyledRoot, StyledContent } from './styles';
import { PATH_AUTH } from '../../routes/paths';

// ----------------------------------------------------------------------

LoginLayout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

export default function LoginLayout({ children, title }) {
  return (
    <StyledRoot>
      <StyledContent>
        <Grid justifyContent='center' columnGap={5} container >
          <Grid item textAlign='center' sx={{p: {sm:5, md:10}}} >
            <Typography variant='subtitle2' mb={1}>Scan QR to Sign Up</Typography>
            <QRCodeCanvas size={250} value={window.location.origin + PATH_AUTH.register} />
          </Grid>
          <Grid item textAlign='right'>
            <Logo disabledLink />
            {title &&
            <>
              <Typography variant="h5" sx={{mt:-1}}>{title}</Typography>
              <Typography variant="body2" sx={{fontStyle:'italic', color:'gray', fontSize:'small', mt:-1}}>V{CONFIG.VERSION}</Typography>
            </>
            }
            <Stack> {children} </Stack>
          </Grid>
        </Grid>
      </StyledContent>
    </StyledRoot>
  );
}
