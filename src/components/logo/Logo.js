import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Link } from '@mui/material';

// ----------------------------------------------------------------------

const Logo = forwardRef(({width = 450, disabledLink = false, sx, src="/logo.svg", opacity, ...other }, ref) => {

  const logo = (<Box component="img" src={src} sx={{ width, height: 'auto', cursor: disabledLink?'default':'pointer', opacity, ...sx }}/>);

  if (disabledLink) {
    return logo;
  }

  return (
    <Link component={RouterLink} to="/" sx={{ display: 'contents' }}>{logo}</Link>
  );
});

Logo.propTypes = {
  sx: PropTypes.object,
  disabledLink: PropTypes.bool,
  src: PropTypes.string,
  width: PropTypes.number,
  opacity: PropTypes.number
};

export default Logo;
