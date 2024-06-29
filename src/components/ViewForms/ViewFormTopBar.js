import PropTypes from 'prop-types';
import { LoadingButton } from '@mui/lab';
import { Divider, Grid } from '@mui/material';
import { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { green } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import { StyledStack } from '../../theme/styles/default-styles';
import ConfirmDialog from '../confirm-dialog';
import useResponsive from '../../hooks/useResponsive';
import IconTooltip from '../Icons/IconTooltip';
import { ICONS } from '../../constants/icons/default-icons';

function ViewFormTopBar({
  isLoading,
  
  isActive,
  isDefault,
  isRequired,
  onBackLink,
  onEdit,
  onDelete,
}) {
  
  const navigate = useNavigate()

  const [openConfirm, setOpenConfirm] = useState(false);

  const theme = createTheme({
    palette: {
      success: green,
    },
  });

  const onDeleteConfirm = () => {
      setOpenConfirm(!openConfirm);
  };

  const { isMobile } = useResponsive('down', 'sm');
  const methods = useForm();

  const {
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful },
  } = methods;
  
  return (
    <Grid container justifyContent="space-between" sx={{pb:1, px:0.5}}>
      <Grid item sx={{display:'flex', mt:0.5,mr:1}}>
        <StyledStack>
          {onBackLink &&
            <>
              <IconTooltip title='Back' onClick={onBackLink} color={theme.palette.primary.main} icon="mdi:arrow-left" />
              <Divider orientation="vertical" flexItem />
            </>
          }
          
          {isActive!==undefined &&
            <IconTooltip
              title={isActive?ICONS.ACTIVE.heading:ICONS.INACTIVE.heading}
              color={isActive?ICONS.ACTIVE.color:ICONS.INACTIVE.color}
              icon={isActive?ICONS.ACTIVE.icon:ICONS.INACTIVE.icon}
            />
          }
        </StyledStack>
      </Grid>

      <Grid item  sx={{ ml:'auto', mt:0.5}}>
        <StyledStack>
          {onEdit && 
            <IconTooltip title="Edit" onClick={onEdit} color={theme.palette.primary.main} icon="mdi:pencil-outline"/>
          }

          {onDelete &&
            <IconTooltip title="Archive" onClick={onDeleteConfirm} color={theme.palette.error.dark} icon="mdi:archive" />
          }
        </StyledStack>

        <ConfirmDialog open={openConfirm} onClose={onDeleteConfirm} title="Archive"
          content="Are you sure you want to Archive?"
          action={
            <LoadingButton variant="contained" color="error" loading={(isSubmitSuccessful || isSubmitting) && isLoading}
              disabled={isSubmitting} onClick={handleSubmit(onDelete)}
            >
              Archive
            </LoadingButton>
          }
        />
      </Grid>
    </Grid>
  );
}
export default memo(ViewFormTopBar)

ViewFormTopBar.propTypes = {
  isLoading:PropTypes.bool,

  isActive:PropTypes.bool,
  isDefault:PropTypes.bool,
  isRequired: PropTypes.bool,
  
  onBackLink: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};
