import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { Grid, TextField, InputAdornment, Button, Stack, 
  FormControl, Select, InputLabel, MenuItem, IconButton, Switch, FormControlLabel, Autocomplete } from '@mui/material';
import { BUTTONS } from '../../constants/default-constants';
import Iconify from '../iconify';
import useResponsive from '../../hooks/useResponsive';
import { StyledTooltip } from '../../theme/styles/default-styles';
import { fDate } from '../../utils/formatTime';
import { useAuthContext } from '../../auth/useAuthContext';

function SearchBarCombo({
  isFiltered,
  value,
  onFilterVerify,
  filterVerify,
  setAccountManagerFilter,
  accountManagerFilter,
  setSupportManagerFilter,
  supportManagerFilter,
  employeeFilterListBy,
  onEmployeeFilterListBy,
  onFilterListByRegion,
  filterListBy,
  onFilterListBy,
  categoryVal,
  setCategoryVal,
  typeVal,
  setTypeVal,
  onChange,
  onClick,
  SubOnClick,
  SubOnClick2,
  openGraph,
  addButton,
  inviteOnClick,
  inviteButton,
  buttonIcon,
  handleAttach,
  radioStatus,
  radioStatusLabel,
  handleRadioStatus,
  onExportLoading,
  onReload,
  filterExcludeRepoting,
  handleExcludeRepoting,
  handleGalleryView,
  dateFrom,
  dateTo,
  userPage,
  settingPage,
  isDateFromDateTo,
  handleRefresh,
  handleFullScreen,
  ...other
}) {
  
  const { spContacts } = useSelector((state) => state.contact);
  const [ isDateFrom, setIsDateFrom ] = useState(new Date( Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
  const [ isDateTo, setIsDateTo ] = useState(new Date(Date.now()).toISOString().split('T')[0]);
  const isMobile = useResponsive('sm', 'down');
  const dispatch = useDispatch()

  const { isAllAccessAllowed, isSettingReadOnly, isSecurityReadOnly } = useAuthContext();

  const onChangeStartDate = (e) => setIsDateFrom(e.target.value);

  const onChangeEndDate = (e) => setIsDateTo(e.target.value);

  return (
    <Grid container rowSpacing={1} columnSpacing={1} sx={{display:'flex', }}>
          { onChange && <Grid item xs={12} sm={12} md={12} lg={setAccountManagerFilter && setSupportManagerFilter ? 4:6} xl={setAccountManagerFilter && setSupportManagerFilter ? 4:6}>
            <TextField
              fullWidth
              value={value}
              onChange={onChange}
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
                    <Button fullWidth onClick={onClick} color='error'size='small' startIcon={<Iconify icon='eva:trash-2-outline' />}>
                      {BUTTONS.CLEAR}
                    </Button>
                  </InputAdornment>
                )
                ),
              }}
            />
          </Grid>}

          {onFilterVerify &&
          <Grid item xs={12} sm={6} md={4} lg={2} xl={2}>
            <Stack alignItems="flex-start">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                size='small'
                name="isVerified"
                value={filterVerify}
                label="Verified"
                onChange={onFilterVerify}
              >
                <MenuItem key="all" value="all">All</MenuItem>
                <MenuItem key="verified" value="verified">Verified</MenuItem>
                <MenuItem key="unverified" value="unverified">Not Verified</MenuItem>
                </Select>
            </FormControl>
            </Stack>
          </Grid>}
          
         
          { isDateFromDateTo && 
            <Grid item xs={12} sm={6} md={4} lg={2} xl={2}  >
                <TextField  
                  value={isDateFrom} 
                  type="date"
                  format={isDateFrom ?? "dd/mm/yyyy"}
                  label="Start date"
                  sx={{width: '100%'}}
                  onChange={onChangeStartDate} 
                  error={ isDateFrom && dateTo && dateTo < isDateFrom } 
                  helperText={ isDateFrom && dateTo && dateTo < isDateFrom && `Start Date should be less than End date ${fDate(isDateTo)}`} 
                  size="small" 
                  InputLabelProps={{ shrink: true }}
                />
            </Grid>
          }

          { isDateFromDateTo && 
            <Grid item xs={12} sm={6} md={4} lg={2} xl={2} >
                <TextField  
                  value={isDateTo} 
                  type="date"
                  format={ isDateTo ?? "dd/mm/yyyy"} 
                  label="End date"
                  sx={{width: '100%'}}
                  onChange={onChangeEndDate} 
                  error={ isDateFrom && isDateTo && isDateFrom > isDateTo } 
                  helperText={isDateFrom && isDateTo && isDateFrom > dateTo && `End Date should be greater than Start date ${fDate(isDateFrom)}`} 
                  size="small" 
                  InputLabelProps={{ shrink: true }}
                />
            </Grid>
          }

         

          {onFilterListBy &&
          <Grid item xs={12} sm={6} md={4} lg={2} xl={2}>
            <Stack alignItems="flex-start">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                size='small'
                name="isVerified"
                value={filterListBy}
                label="Status"
                onChange={onFilterListBy}
              >
                <MenuItem key="all" value="all">All</MenuItem>
                <MenuItem key="verified" value="active">Active</MenuItem>
                <MenuItem key="unverified" value="inActive">In-Active</MenuItem>
                </Select>
            </FormControl>
            </Stack>
          </Grid>}

          

          {handleExcludeRepoting &&
            <Grid item xs={12} sm={6} md={4} lg={2} xl={2}>
              <Stack alignItems="flex-start">
              <FormControl fullWidth={isMobile} sx={{ml:2, width:'200px'}}>
                <InputLabel id="demo-simple-select-label">Reporting</InputLabel>
                <Select
                  sx={{width:'200px'}}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  size="small"
                  value={filterExcludeRepoting}
                  label="Reporting"
                  onChange={handleExcludeRepoting}
                >
                  <MenuItem key="all" value='all'>All</MenuItem>
                  <MenuItem key="excluded" value='excluded'>Exclude Reporting</MenuItem>
                  <MenuItem key="included" value='included'>Include Reporting</MenuItem>
                  </Select>
              </FormControl>
              </Stack>
            </Grid>
          }

          {handleRadioStatus !== undefined &&
            <Grid item xs={12} sm={6} md={4} lg={2} xl={2}>
                <FormControlLabel control={<Switch checked={radioStatus} 
                  onClick={(event)=>{handleRadioStatus(event.target.checked)}} />} label={radioStatusLabel} />
            </Grid>
          }

          <Grid item xs={12} sm={6} md={4} lg={2} xl={2} sx={{ml:'auto'}}>
            <Grid container rowSpacing={1} columnSpacing={2} sx={{display:'flex', justifyContent:'flex-end'}}>
              {onReload && 
                  <Grid item>
                    <StyledTooltip title='Reload' placement="top" disableFocusListener tooltipcolor="#103996" color="#103996">
                    <IconButton onClick={onReload} color="#fff" sx={{background:"#2065D1", borderRadius:1, height:'1.7em', p:'8.5px 14px',
                      '&:hover': {
                        background:"#103996", 
                        color:"#fff"
                      }
                    }}>
                      <Iconify color="#fff" sx={{ height: '24px', width: '24px'}} icon='mdi:reload' />
                    </IconButton>
                  </StyledTooltip>
                </Grid>
              }
                
              {handleRefresh && 
                <Grid item>
                    <StyledTooltip title="Refresh" placement="top" disableFocusListener tooltipcolor="#103996" color="#103996">
                      <IconButton onClick={handleRefresh} color="#fff" sx={{background:"#2065D1", borderRadius:1, height:'1.7em', p:'8.5px 14px',
                        '&:hover': {
                          background:"#103996", 
                          color:"#fff"
                        }
                      }}>
                        <Iconify color="#fff" sx={{ height: '24px', width: '24px'}} icon='mdi:reload' />
                      </IconButton>
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
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.string,
  SubOnClick: PropTypes.func,
  SubOnClick2: PropTypes.func,
  addButton: PropTypes.string,
  inviteOnClick: PropTypes.func,
  inviteButton: PropTypes.string,
  buttonIcon: PropTypes.string,
  onFilterVerify:PropTypes.func,
  filterVerify:PropTypes.string,
  setAccountManagerFilter:PropTypes.func,
  accountManagerFilter:PropTypes.object,
  setSupportManagerFilter:PropTypes.func,
  supportManagerFilter:PropTypes.object,
  filterListBy: PropTypes.string,
  onFilterListBy: PropTypes.func,
  categoryVal: PropTypes.object,
  setCategoryVal: PropTypes.func,
  openGraph: PropTypes.func,
  typeVal: PropTypes.object,
  setTypeVal: PropTypes.func,
  employeeFilterListBy: PropTypes.string,
  onEmployeeFilterListBy: PropTypes.func,
  onFilterListByRegion: PropTypes.func,
  filterByRegion: PropTypes.object,
  signInLogsFilter:PropTypes.number,
  onSignInLogsFilter:PropTypes.func,
  transferredMachine:PropTypes.bool,
  handleAttach: PropTypes.func,
  radioStatus: PropTypes.bool,
  radioStatusLabel: PropTypes.string,
  handleRadioStatus: PropTypes.func,
  onExportCSV: PropTypes.func,
  onExportLoading: PropTypes.bool,
  onReload: PropTypes.func,
  filterExcludeRepoting: PropTypes.string,
  handleExcludeRepoting: PropTypes.func,
  handleGalleryView: PropTypes.func,
  dateFrom: PropTypes.string,
  dateTo: PropTypes.string,
  isDateFromDateTo: PropTypes.bool,
  machineSettingPage: PropTypes.bool,
  userPage: PropTypes.bool,
  settingPage: PropTypes.bool,
  isPm2Environments: PropTypes.bool,
  handleRefresh: PropTypes.func,
  isPm2LogTypes: PropTypes.bool,
  handleFullScreen: PropTypes.func,
};

export default SearchBarCombo;
