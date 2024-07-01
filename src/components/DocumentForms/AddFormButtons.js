import PropTypes from 'prop-types';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Grid, Stack } from '@mui/material';
import ConfirmDialog from '../confirm-dialog';
import { BUTTONS, DIALOGS } from '../../constants/default-constants';
import { RHFSwitch } from '../hook-form';

AddFormButtons.propTypes = {
  active: PropTypes.bool,
  _default: PropTypes.bool,
  disableDelete: PropTypes.bool,
  
  isSubmitting: PropTypes.bool,
  toggleCancel: PropTypes.func
};

export default function AddFormButtons(
  {
    active,
    _default,
    disableDelete,
    
    isSubmitting,
    toggleCancel
  }

) {
  
  return (
    <Box py={2}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item display="flex">
          {active !==undefined && <RHFSwitch checked={active} name="active" label="Active" /> }
          {_default !==undefined && <RHFSwitch checked={_default} name="_default" label="Default" /> }
          {disableDelete !==undefined && <RHFSwitch name="disableDelete" label="DisableDelete" /> }
        </Grid>
        <Grid item>
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" size="large" onClick={toggleCancel}>{BUTTONS.CANCEL}</Button>
            <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>{BUTTONS.SAVE}</LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
