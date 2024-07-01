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
        px: 2, pb: 1, pt: 25,
        display: 'block',
        textAlign: 'center',
        position: 'relative', // Ensure the stack is positioned relatively
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `url('/favicon.svg')`,
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '70%',
          opacity: 0.1, // Set the opacity of the background image
          zIndex: -1, // Ensure the background is behind the content
        },
      }}
    >
        <Typography gutterBottom variant="subtitle1">Hi, {user?.name || ''}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', pb:1 }}>Know more about our products and services</Typography>
    </Stack>
  );
}
