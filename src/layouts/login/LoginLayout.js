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
};

export default function LoginLayout({ children, title }) {
  return (
    <StyledRoot>
      <StyledContent>
        <Grid sx={{ display: 'flex', justifyContent: 'center'}} alignItems="center" spacing={2} container >
          <Grid item textAlign='right'>
            <Logo disabledLink />
            {title &&
            <>
              <Typography variant="h5" sx={{mt:-1}}>{title}</Typography>
              <Typography variant="body2" sx={{fontStyle:'italic', color:'gray', fontSize:'small', mt:-1}}>V{CONFIG.VERSION}</Typography>
            </>
            }
          </Grid>
        </Grid>
        <Stack> {children} </Stack>
      </StyledContent>
    </StyledRoot>
  );
}
