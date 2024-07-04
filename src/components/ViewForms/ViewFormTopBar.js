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
import SkeletonViewFormField from '../skeleton/SkeletonViewFormField';

function ViewFormTopBar({
  isLoading,
  
  isActive,
  isDefault,
  isRequired,
  onBackLink,
  onUpdatePassword,
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
      {isLoading?(
          <SkeletonViewFormField />
        ) : (
          <>
            <Grid item sx={{display:'flex', mt:0.5,mr:1}}>
              <StyledStack>
                {/* {onBackLink &&
                  <>
                    <IconTooltip title='Back' onClick={onBackLink} color={theme.palette.primary.main} icon="mdi:arrow-left" />
                    <Divider orientation="vertical" flexItem />
                  </>
                } */}
                
                {isActive!==undefined &&
                  <IconTooltip
                    title={isActive?ICONS.ACTIVE.heading:ICONS.INACTIVE.heading}
                    color={isActive?ICONS.ACTIVE.color:ICONS.INACTIVE.color}
                    icon={isActive?ICONS.ACTIVE.icon:ICONS.INACTIVE.icon}
                  />
                }

                {isDefault!==undefined &&
                  <IconTooltip
                    title={isDefault?ICONS.DEFAULT.heading:ICONS.NOT_DEFAULT.heading}
                    color={isDefault?ICONS.DEFAULT.color:ICONS.NOT_DEFAULT.color}
                    icon={isDefault?ICONS.DEFAULT.icon:ICONS.NOT_DEFAULT.icon}
                  />
                }
              </StyledStack>
            </Grid>

            <Grid item  sx={{ ml:'auto', mt:0.5}}>
              <StyledStack>
                {onUpdatePassword && 
                  <IconTooltip title="Update Password" onClick={onUpdatePassword} color={theme.palette.primary.main} icon="tabler:fingerprint"/>
                }

                {onEdit && 
                  <IconTooltip title="Edit" onClick={onEdit} color={theme.palette.info.dark} icon="tabler:edit"/>
                }

                {onDelete &&
                  <IconTooltip title="Delete" onClick={onDeleteConfirm} color={theme.palette.error.dark} icon="tabler:trash" />
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
          </>
        )
      }
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
  onUpdatePassword: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};
