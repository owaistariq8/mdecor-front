import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Link } from '@mui/material';
import { useNavigate } from 'react-router';
import Iconify from '../iconify/Iconify';
import { useAuthContext } from '../../auth/useAuthContext';

function CoverSettingsIcons({
  setting,
  handleNavigate,
  backLink,
  handleBacklink,
  handleBackLinks,
  generalSettings,
  handleSettingsNavigate,
}) {

  const { isSettingAccessAllowed } = useAuthContext()
  const navigate = useNavigate();
  
  return (
    <Grid style={{ flex: 1, display: 'flex', justifyContent: 'end' }}>
    
      {generalSettings && (
        <Link
          title="Settings"
          sx={{
            cursor: 'hover',
            mt: 'auto',
            color: 'common.white',
            mx: 2,
            mb: { xs: 0, md: 1 },
          }}
          component="button"
          variant="body2"
          onClick={handleSettingsNavigate}
        >
          <Iconify icon="mdi:cog" />
        </Link>
      )}
    </Grid>
  );
}

CoverSettingsIcons.propTypes = {
  setting: PropTypes.bool,
  handleNavigate: PropTypes.func,
  backLink: PropTypes.bool,
  handleBacklink: PropTypes.func,
  handleBackLinks: PropTypes.func,
  generalSettings: PropTypes.bool,
  handleSettingsNavigate: PropTypes.func,
};

export default CoverSettingsIcons;
