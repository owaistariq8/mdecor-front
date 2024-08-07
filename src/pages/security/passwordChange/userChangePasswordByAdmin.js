import * as Yup from 'yup';
import { useState } from 'react';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// @mui
import { createTheme } from '@mui/material/styles';
import { green, blue } from '@mui/material/colors';
import { LoadingButton } from '@mui/lab';
import { Stack, Card, Container, IconButton, InputAdornment, Grid } from '@mui/material';
// components
import Iconify from '../../../components/iconify';
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, { RHFTextField } from '../../../components/hook-form';
import { Cover } from '../../../components/Defaults/Cover';
import { userPasswordUpdate, sendResetPasswordEmail, resetLoadingResetPasswordEmail } from '../../../redux/slices/user/user';
import AddFormButtons from '../../../components/DocumentForms/AddFormButtons';
import { PATH_SECURITY } from '../../../routes/paths';
import { StyledCardContainer, StyledTooltip } from '../../../theme/styles/default-styles';
import { useAuthContext } from '../../../auth/useAuthContext';

// ----------------------------------------------------------------------

export default function UserChangePassword() {
  const navigate = useNavigate();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { user, isLoadingResetPasswordEmail } = useSelector((state) => state.user);

  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { isAllAccessAllowed } = useAuthContext();
  const ChangePassWordSchema = Yup.object().shape({
    newPassword: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .max(18, 'Password must be less than 18 characters')
      .required('New Password is required'),
    confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
  });


  const theme = createTheme({
    palette: {
      success: green,
      primary: blue,
    },
  });

  const defaultValues = {
    newPassword: '',
    confirmNewPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(ChangePassWordSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const toggleCancel = () => navigate(PATH_SECURITY.user.view(user._id));

  const senResetPasswordLink = async () => {
    try{
      await dispatch(sendResetPasswordEmail(user?.email))
      await dispatch(resetLoadingResetPasswordEmail())
      await enqueueSnackbar('Email sent successfully!');
    }catch(e){
      dispatch(resetLoadingResetPasswordEmail())
      enqueueSnackbar(e, { variant: `error` } );
    }
  }

  const onSubmit = async (data) => {
    try {
      await dispatch(userPasswordUpdate(data, user._id, true));
      reset();
      enqueueSnackbar('Update success!');
      navigate(PATH_SECURITY.user.view(user._id));
    } catch (error) {
      if (error.Message) {
        enqueueSnackbar(error.Message, { variant: `error` });
      } else if (error.message) {
        enqueueSnackbar(error.message, { variant: `error` });
      } else {
        enqueueSnackbar('Something went wrong!', { variant: `error` });
      }
      console.log('Error:', error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} >
      <Container maxWidth={false}>
        <StyledCardContainer>
          <Cover name="Change Password" icon="mdi:user-circle" />
        </StyledCardContainer>
        <Grid container spacing={2} sx={{ justifyContent: 'center', allignItem: 'center' }}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3}}>
              <Stack spacing={3} alignItems="flex-end" sx={{ pb: 3 }}>
                <RHFTextField name="firstName" label="First Name" value={user?.firstName || '' } disabled />
                <RHFTextField name="lastName" label="Last Name" value={user?.lastName || '' } disabled />
                <RHFTextField name="login" label="Login" value={user?.login || '' } disabled />
                <RHFTextField name="email" label="Email" value={user?.email || ''} disabled />
                { isAllAccessAllowed && <Grid container item sm={12} md={12} sx={{ display: { md: 'flex'}, justifyContent: 'space-between' }} > 
                  <LoadingButton disabled={isLoadingResetPasswordEmail} loading={isLoadingResetPasswordEmail} onClick={senResetPasswordLink} size="small" variant="contained" color='primary' sx={{ ml: 'auto', mr: 1, my:-1 }} >
                    <StyledTooltip title="Send reset Password email" placement="top" disableFocusListener tooltipcolor={theme.palette.primary.dark} color={theme.palette.text}  >
                      <Iconify icon="mdi:password-reset" sx={{ width: 25, height: 25 }} />
                    </StyledTooltip>
                  </LoadingButton>
                </Grid>}
                <RHFTextField
                  name="newPassword"
                  label="New Password"
                  type={showNewPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowNewPassword(!showNewPassword)} edge="end">
                          <Iconify icon={showNewPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  autoComplete="current-password"
                />
                <RHFTextField
                  name="confirmNewPassword"
                  label="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          edge="end"
                        >
                          <Iconify
                            icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  autoComplete="current-password"
                />
                {/* <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    Change Password
                  </LoadingButton> */}
              </Stack>
              <AddFormButtons userPage isSubmitting={isSubmitting} toggleCancel={toggleCancel} />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </FormProvider>
  );
}
