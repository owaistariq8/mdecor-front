// @mui
import { Divider, IconButton, Stack } from '@mui/material';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// components
import Iconify from '../../components/iconify';

// ----------------------------------------------------------------------

export default function AuthWithSocial() {
  const { loginWithGoogle, loginWithGithub, loginWithTwitter } = useAuthContext();

  const handleGoogleLogin = async () => {
    try {
      if (loginWithGoogle) {
        loginWithGoogle();
      }
    } catch (error) {
      console.error(error?.message);
    }
  };

  const handleGithubLogin = async () => {
    try {
      if (loginWithGithub) {
        loginWithGithub();
      }
    } catch (error) {
      console.error(error?.message);
    }
  };

  const handleTwitterLogin = async () => {
    try {
      if (loginWithTwitter) {
        loginWithTwitter();
      }
    } catch (error) {
      console.error(error?.message);
    }
  };

  return (
    <div>
      <Divider
        sx={{
          my: 2.5,
          typography: 'overline',
          color: 'text.disabled',
          '&::before, ::after': {
            borderTopStyle: 'solid',
          },
        }}
      >
        OR
      </Divider>

      <Stack direction="row" justifyContent="center" spacing={2}>
        <IconButton onClick={handleGoogleLogin}>
          <Iconify icon="eva:google-fill" color="#DF3E30" />
        </IconButton>

        <IconButton color="inherit" onClick={handleGithubLogin}>
          <Iconify icon="eva:github-fill" />
        </IconButton>

        <IconButton onClick={handleTwitterLogin}>
          <Iconify icon="eva:twitter-fill" color="#1C9CEA" />
        </IconButton>
      </Stack>
    </div>
  );
}
