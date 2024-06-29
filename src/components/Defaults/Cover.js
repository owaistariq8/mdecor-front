import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import { Button, Grid } from '@mui/material';
import { StyledRoot, StyledInfo } from '../../theme/styles/default-styles';
// utils
import { PATH_SETTING } from '../../routes/paths';
// auth
import CoverSettingsIcons from './CoverSettingsIcons';
import CoverTitles from './CoverTitles';
import useResponsive from '../../hooks/useResponsive';
import CoverAvatar from './CoverAvatar';
import Iconify from '../iconify';

// ----------------------------------------------------------------------

Cover.propTypes = {
  name: PropTypes.string,
  icon: PropTypes.string,
  avatar: PropTypes.bool,
  setting: PropTypes.bool,
  generalSettings: PropTypes.bool,
  backLink: PropTypes.bool,
  isArchived: PropTypes.bool,
};
export function Cover({
  name,
  icon,
  avatar,
  setting,
  generalSettings,
  backLink,
  isArchived,
}) {
  const navigate = useNavigate();
  const handleSettingsNavigate = () => navigate(PATH_SETTING.root);
  const handleBackLink = () => window.history.back();
  const isMobile = useResponsive('down', 'sm');

  return (
    <StyledRoot style={{ p: { xs: 0, md: 0 } }} isArchived={isArchived} >
      <StyledInfo style={{ width: '100%', flex: 1, display: 'flex', justifyContent: 'space-between' }} >
        {icon? (
         <CoverAvatar icon={icon} /> 
        ):avatar && (
          <CoverAvatar avatar={avatar} />
        )}
        <CoverTitles title={avatar && isMobile ? '' : name} />
        <CoverSettingsIcons setting={ !isArchived && setting} handleSettingsNavigate={handleSettingsNavigate} generalSettings={generalSettings && !isArchived } />
      </StyledInfo>
      <Grid container justifyContent='space-between' columnGap={2} sx={{ position: 'absolute', bottom:10, px:3}}>
          <Grid item>
            {backLink && <Button size='small' startIcon={<Iconify icon="mdi:arrow-left" />} variant='outlined' sx={{float:'left'}} onClick={handleBackLink}>Back</Button>}
          </Grid>
          
      </Grid>
    </StyledRoot>
  );
}
