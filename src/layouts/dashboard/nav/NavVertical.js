import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// @mui
import { Box, Stack, Drawer,Typography, Link, Grid } from '@mui/material'
// hooks
// import { useSettingsContext } from '../../../components/settings';
import useResponsive from '../../../hooks/useResponsive';
// config
import { CONFIG, NAV  } from '../../../config-global';
// components
import Logo from '../../../components/logo';
import Scrollbar from '../../../components/scrollbar';
import { NavSectionVertical } from '../../../components/nav-section';
//
import NavigationConfig from './NavigationConfig';
import NavDocs from './NavDocs';
import NavToggleButton from './NavToggleButton';

// ----------------------------------------------------------------------

NavVertical.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function NavVertical({ openNav, onCloseNav }) {
  
  const navConfig = NavigationConfig();

  const { pathname } = useLocation();
  const isDesktop = useResponsive('up', 'lg');
  const [envColor, setEnvColor]= useState('#897A69');
  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (CONFIG.ENV.toLocaleLowerCase() === 'dev' || CONFIG.ENV.toLocaleLowerCase === 'development' ) {
      setEnvColor('green');
    }else if(CONFIG.ENV.toLocaleLowerCase() === 'test' ) {
      
      setEnvColor('#4082ed');
    }
  }, []);

  
  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
      >
        <Logo sx={{ width: '80%', margin: '0 auto', mt:2 }} />
        <Grid sx={{ margin: '0 auto'}}>          
            {CONFIG.ENV.toLocaleLowerCase() !== 'live' && ( <Typography sx={{ background: envColor, borderRadius: '50px', fontSize: '10px', padding: '2px 5px', color: '#FFF', }} > 
            {`${CONFIG.ENV.toLocaleUpperCase()} ${CONFIG.VERSION}`} </Typography> )}
            {CONFIG.ENV.toLocaleLowerCase() === 'live' && ( <Typography sx={{ color: '#897A69', fontSize: '10px' }}> {CONFIG.VERSION} </Typography> )}
        </Grid>
      <NavSectionVertical data={navConfig} />
      <Box sx={{ flexGrow: 1 }} />
      <NavDocs />
    </Scrollbar>
  );
  return (
    <Box component="nav" sx={{ flexShrink: { lg: 0 }, width: { lg: NAV.W_DASHBOARD }}}>
      <NavToggleButton sx={{top: 22}}/>
      {isDesktop ? (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              zIndex: 0,
              width: NAV.W_DASHBOARD,
              bgcolor: 'transparent',
              borderRightStyle: 'solid',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: {
              width: NAV.W_DASHBOARD,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
