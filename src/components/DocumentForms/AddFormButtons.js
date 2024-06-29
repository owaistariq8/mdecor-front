import PropTypes from 'prop-types';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Grid, Stack } from '@mui/material';
import ConfirmDialog from '../confirm-dialog';
import { BUTTONS, DIALOGS } from '../../constants/default-constants';
import { RHFSwitch } from '../hook-form';

AddFormButtons.propTypes = {
  isActive: PropTypes.bool,
  
  isSubmitting: PropTypes.bool,
  toggleCancel: PropTypes.func
};

export default function AddFormButtons(
  {
    isActive,
    isSubmitting,
    toggleCancel
  }

) {
  
  return (
    <Box p={2}>
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <RHFSwitch name="isActive" label="Active" />
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
