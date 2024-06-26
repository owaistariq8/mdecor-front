import { useEffect, useState } from 'react';
// @mui
import { Stack, Box , Typography, Link } from '@mui/material';
// config
import { NAV, CONFIG } from '../../../config-global';
// utils
import { hideScrollbarX } from '../../../utils/cssStyles';
// components
import Logo from '../../../components/logo';
import { NavSectionMini } from '../../../components/nav-section';
//
import NavigationConfig from './NavigationConfig';
import NavToggleButton from './NavToggleButton';
import { PATH_SETTING } from '../../../routes/paths';

// ----------------------------------------------------------------------

export default function NavMini() {
  const [envColor, setEnvColor]= useState('#897A69');
  const navConfig = NavigationConfig();

  useEffect(() => {
    if (CONFIG.ENV.toLocaleLowerCase() === 'dev' || CONFIG.ENV.toLocaleLowerCase === 'development' ) {
      setEnvColor('green');
    }else if(CONFIG.ENV.toLocaleLowerCase() === 'test' ) {
      
      setEnvColor('#4082ed');
    }
  }, []);

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_DASHBOARD_MINI },
      }}
    >
      <NavToggleButton
        sx={{
          top: 22,
          left: NAV.W_DASHBOARD_MINI - 12,
        }}
      />

      <Stack
        sx={{
          pb: 2,
          height: 1,
          position: 'fixed',
          width: NAV.W_DASHBOARD_MINI,
          borderRight: (theme) => `solid 1px ${theme.palette.divider}`,
          ...hideScrollbarX,
        }}
      >
        <Logo src="/favicon.svg" sx={{ mx: 'auto', my: 1, width: '50px', height: '50px' }} />

        <NavSectionMini data={navConfig} />
      </Stack>
    </Box>
  );
}
