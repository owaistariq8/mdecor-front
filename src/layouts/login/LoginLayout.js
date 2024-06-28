import PropTypes from 'prop-types';
// @mui
import { Typography, Stack , Grid} from '@mui/material';
// components
import Logo from '../../components/logo';
//
import { CONFIG } from '../../config-global';
//
import { StyledRoot, StyledContent } from './styles';

// ----------------------------------------------------------------------

LoginLayout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  illustration: PropTypes.string,
};

export default function LoginLayout({ children, illustration, title }) {
  title = title || "BATHROOM ACCESSORIES";
  return (
    <StyledRoot>
      <StyledContent>
        <Grid sx={{ display: 'flex', justifyContent: 'center'}} alignItems="center" spacing={2} container >
          <Grid item>
            <Logo sx={{pointerEvents: 'none', }} />
            <Stack sx={{ alignItems: 'end' }} >
              <Typography variant="h5">{title}</Typography>
                {/* <Typography variant="body2" sx={{ mb: 6}}>{CONFIG.VERSION}</Typography> */}
            </Stack>
          </Grid>
        </Grid>
        <Stack> {children} </Stack>
      </StyledContent>
    </StyledRoot>
  );
}
