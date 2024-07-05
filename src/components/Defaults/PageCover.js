import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card, CardContent, Grid, IconButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PATH_CUSTOMERS, PATH_SETTING } from '../../routes/paths';
import Iconify from '../iconify';
import { StyledCardHeader } from '../settings/styles';
// import IconButtonTooltip from '../Icons/IconButton';

const PageCover = ({title, setting, customerId, handleBackLink}) =>{

  const navigate = useNavigate();
  
  const handleSiteLink = ()=>{
    navigate(PATH_CUSTOMERS.customers.sites.root(customerId));
  }
  
  const handleCustomerLink = ()=>{
    navigate(PATH_CUSTOMERS.customers.view(customerId));
  }

  return (
    <Card sx={{my:2}}>
      <StyledCardHeader avatar={handleBackLink && <BackButton onClick={handleBackLink} />} action={setting && <SettingButton />} title={title}/>
      <CardContent sx={{maxHeight:customerId?55:0, px:2, py:1}}>
        {customerId && 
          <Grid item display='flex' gap={1}>
            <Button variant='contained' onClick={handleCustomerLink} startIcon={<Iconify icon="tabler:info-circle"/>}> Information</Button>
            <Button variant='contained' onClick={handleSiteLink} startIcon={<Iconify icon="tabler:current-location"/>}> Sites</Button>
          </Grid>
        }
      </CardContent>
    </Card>
  )
} 

export default PageCover;

PageCover.propTypes = {
  title: PropTypes.string,
  setting: PropTypes.bool,
  customerId: PropTypes.string,
  handleBackLink: PropTypes.func
}

const SettingButton = () => {
  const navigate = useNavigate();

  const handleSettingsNavigate = () => {
    navigate(PATH_SETTING.root);
  };

  return (
    <IconButton  sx={{mt:0.3, borderRadius:1, background: (theme) => theme.palette.background.paper, color:(theme) => theme.palette.primary.dark, '&:hover':{
      background: (theme) => theme.palette.background.paper, color:(theme) => theme.palette.primary.dark
    }}} onClick={handleSettingsNavigate}>
      <Iconify  icon="mdi:cog" />
    </IconButton>
  );
};

const BackButton = ({onClick}) => {
  const navigate = useNavigate();

  const handleBackNavigate = () => {
    navigate(window.history.back(-1));
  };

  return (
    <IconButton sx={{mt:0.3, borderRadius:1, background: (theme) => theme.palette.background.paper, color:(theme) => theme.palette.primary.dark, '&:hover':{
      background: (theme) => theme.palette.background.paper, color:(theme) => theme.palette.primary.dark
    }}} onClick={onClick || handleBackNavigate}>
      <Iconify  icon="ion:arrow-back-outline" />
    </IconButton>
  );
};

BackButton.propTypes = {
  onClick: PropTypes.func
}