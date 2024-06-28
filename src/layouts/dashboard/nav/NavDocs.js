// @mui
import { Stack, Button, Typography } from '@mui/material';
// auth
import { useAuthContext } from '../../../auth/useAuthContext';

// ----------------------------------------------------------------------

export default function NavDocs() {
  const { user } = useAuthContext();
  return (
    <Stack
      sx={{
        px: 5, pb: 5, pt: 15,
        display: 'block',
        textAlign: 'center',
        background: `url('/logo/m-decore-icon.svg')`,
        backgroundPosition:'center top',
        backgroundRepeat:'no-repeat',
        backgroundBlendMode:'lighten',
        backgroundSize:"70%"
      }}
      >
        <Typography gutterBottom variant="subtitle1">Hi, {user?.name || ''}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', pb:1 }}>Know more about our products and services</Typography>
    </Stack>
  );
}
