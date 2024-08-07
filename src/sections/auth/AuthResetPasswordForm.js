import { useState } from 'react';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import FormProvider, { RHFTextField } from '../../components/hook-form';
import axios from '../../utils/axios';
import { CONFIG } from '../../config-global';
import { TITLES } from '../../constants/default-constants';
import { useSnackbar } from '../../components/snackbar';

// ----------------------------------------------------------------------

export default function AuthResetPasswordForm() {
  const [ disable, setDisable ] = useState(false)
  const { enqueueSnackbar } = useSnackbar();
  const regEx = /^[4][0-9][0-9]$/;


  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  });

  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: { email: '' },
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${CONFIG.SERVER_URL}security/forgetPassword`, data);
      enqueueSnackbar(response.data.Message);
      setDisable(true)
      // await new Promise((resolve) => setTimeout(resolve, 500));
      // sessionStorage.setItem('email-recovery', data.email);
      // navigate(PATH_AUTH.newPassword);
    } catch (error) {
      console.error(error?.message);
      if (regEx.test(error.MessageCode)) {
        reset();
        setError('afterSubmit', {
          ...error,
          message: error.Message,
        });
      } else {
        setError('afterSubmit', {
          ...error,
          message: 'Something went wrong',
        });
      }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {!!errors.afterSubmit && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errors.afterSubmit.message}
        </Alert>
      )}

      <RHFTextField name="email" label="Email" disabled={disable} />

      <LoadingButton
        fullWidth
        color='secondary'
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        disabled={disable}
        sx={{ mt: 2 }}
      >
        {disable ? TITLES.CHECK_EMAIL : TITLES.FORGOT_REQUEST}
      </LoadingButton>
    </FormProvider>
  );
}
