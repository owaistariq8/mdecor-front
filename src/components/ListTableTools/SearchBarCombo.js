import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { Grid, TextField, InputAdornment, Button, Stack, 
  FormControl, Select, InputLabel, MenuItem, IconButton, Switch, FormControlLabel, Autocomplete, 
  useTheme} from '@mui/material';
import { BUTTONS } from '../../constants/default-constants';
import Iconify from '../iconify';
import useResponsive from '../../hooks/useResponsive';
import { StyledTooltip } from '../../theme/styles/default-styles';
import { fDate } from '../../utils/formatTime';
import { useAuthContext } from '../../auth/useAuthContext';

function SearchBarCombo({
  isFiltered,
  filterName,
  onFilterName,
  onResetFilterName,
  onAddButton,
  addButtonName="Add New",
  onReload,
}) {
  
  const theme = useTheme();
  
  return (
    <Grid container rowSpacing={1} columnSpacing={1} sx={{display:'flex', }}>
          <Grid item xs={12} sm={12} md={8} lg={6}>
            {onFilterName && 
              <TextField
                fullWidth
                value={filterName}
                onChange={onFilterName}
                size="small"
                placeholder="Search..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify  icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (isFiltered && (
                    <InputAdornment position="end">
                      <Button fullWidth onClick={onResetFilterName} color='error' startIcon={<Iconify icon='eva:trash-2-outline' />}>Clear</Button>
                    </InputAdornment>
                  )
                  ),
                }}
              />
            }
          </Grid>
         
          <Grid item xs={12} sm={12} md={4} lg={6}>
            <Grid container rowSpacing={1} columnSpacing={1} sx={{display:'flex', justifyContent:'flex-end'}}>
              {onReload && 
                  <Grid item>
                    <StyledTooltip title='Reload' placement="top" disableFocusListener>
                      <Button onClick={onReload} variant='contained' size='small' sx={{minWidth:'42px'}}><Iconify color="#fff" sx={{ height: '24px', width: '24px'}} icon='mdi:reload' /></Button>
                    </StyledTooltip>
                </Grid>
              }
              {onAddButton && 
                  <Grid item>
                    <StyledTooltip title={addButtonName} placement="top" disableFocusListener>
                      <Button onClick={onAddButton} variant='contained' size='small' sx={{minWidth:'42px'}}><Iconify color="#fff" sx={{ height: '24px', width: '24px'}} icon='eva:plus-fill' /></Button>
                    </StyledTooltip>
                </Grid>
              }
            </Grid>
        </Grid>
    </Grid>
  );
}

SearchBarCombo.propTypes = {
  isFiltered: PropTypes.bool,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  onResetFilterName: PropTypes.func,
  onAddButton: PropTypes.func,
  addButtonName: PropTypes.string,
  onReload: PropTypes.func,
};

export default SearchBarCombo;
