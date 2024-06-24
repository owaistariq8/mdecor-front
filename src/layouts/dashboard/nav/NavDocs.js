// @mui
import { Stack, Button, Typography } from '@mui/material';
// auth
import { useAuthContext } from '../../../auth/useAuthContext';
// routes

// ----------------------------------------------------------------------

export default function NavDocs() {
  const { user } = useAuthContext();
  return (
    <Stack
      sx={{
        px: 5, pb: 5, pt: 25,
        display: 'block',
        textAlign: 'center',
        backgroundPosition:'center top',
        backgroundRepeat:'no-repeat',
        backgroundSize:"70%"
      }}
      >
        <Typography gutterBottom variant="subtitle1">Hi, {user?.displayName}</Typography>
    </Stack>
  );
}
