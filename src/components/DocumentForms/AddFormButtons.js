import PropTypes from 'prop-types';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Grid, Stack } from '@mui/material';
import ConfirmDialog from '../confirm-dialog';
import { BUTTONS, DIALOGS } from '../../constants/default-constants';
import { RHFSwitch } from '../hook-form';

AddFormButtons.propTypes = {
  isActive: PropTypes.bool,
  isDefault: PropTypes.bool,
  disableDelete: PropTypes.bool,
  
  isSubmitting: PropTypes.bool,
  toggleCancel: PropTypes.func
};

export default function AddFormButtons(
  {
    isActive,
    isDefault,
    disableDelete,
    
    isSubmitting,
    toggleCancel
  }

) {
  
  return (
    <Box py={2} px={4} sx={{borderTop:'1px solid lightgray'}}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item display="flex">
          {isActive !==undefined && <RHFSwitch checked={isActive} name="isActive" label="Active" /> }
          {isDefault !==undefined && <RHFSwitch checked={isDefault} name="isDefault" label="Default" /> }
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
