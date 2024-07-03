import PropTypes from 'prop-types';
import React from 'react';
import { Card, CardContent, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PATH_SETTING } from '../../routes/paths';
import Iconify from '../iconify';
import { StyledCardHeader } from '../settings/styles';

const PageCover = ({title, setting, backIcon, handleBackLink}) => 
    <Card sx={{my:2}}>
      <StyledCardHeader avatar={backIcon && <BackButton onClick={handleBackLink} />} action={setting && <SettingButton />} title={title}/>
      <CardContent sx={{maxHeight:30, px:0, py:0}}>{` `}</CardContent>
    </Card>;

export default PageCover;

PageCover.propTypes = {
  title: PropTypes.string,
  setting: PropTypes.bool,
  backIcon: PropTypes.bool,
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