import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Grid, Stack, Typography, Link, Divider } from '@mui/material';
import { Subtitles } from '@mui/icons-material';
// layouts
import LoginLayout from '../../layouts/login';
// routes
import { PATH_AUTH } from '../../routes/paths';
//
import AuthRegisterForm from './AuthRegisterForm';

import { CONFIG } from '../../config-global';
import AuthWithSocial from './AuthWithSocial';
// ----------------------------------------------------------------------

export default function Register() {
  return (
    <LoginLayout title={CONFIG.MESSAGE_REGISTER_USER}>
      <Divider sx={{mt:2}}>
        <Typography variant="h4">Create Account</Typography>
      </Divider>
      <AuthRegisterForm />
      <Divider
        sx={{
          mt: 2,
          typography: 'overline',
          color: 'text.disabled',
          '&::before, ::after': {
            borderTopStyle: 'solid',
          },
        }}
      >
        OR
      </Divider>
      <Stack direction="row" spacing={0.5} sx={{ mt:1, justifyContent: 'center' }}>
        <Typography variant="body2"> Already have an account? </Typography>
        <Link component={RouterLink} to={PATH_AUTH.login} variant="body2">Sign in here</Link>
      </Stack>
      <Typography variant='caption'  textAlign='center' lineHeight={2}>
        {'By signing up, I agree to '}
        <Link underline="always" color="text.primary">Terms of Service</Link>
        {' and '}
        <Link underline="always" color="text.primary">Privacy Policy</Link>.
      </Typography>

      {/* <AuthWithSocial /> */}
    </LoginLayout>
  );
}
