import { useEffect, useRef } from 'react';
import * as Yup from 'yup';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_AUTH } from '../../routes/paths';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// components
import FormProvider, { RHFTextField, RHFCheckbox, RHFPasswordField } from '../../components/hook-form';

// ----------------------------------------------------------------------

export default function AuthLoginForm() {

  const navigate = useNavigate();
  const { login } = useAuthContext();
  const inputRef = useRef(null);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
    .transform((value, originalValue) => originalValue ? originalValue.toLowerCase() : value)
    .email()
    .label('Email Address')
    .trim()
    .required('Email address is Required!')
    .max(200),
    password: Yup.string().label("Password").required('Password is Required!'),
  });

  const defaultValues = {
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    setValue,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const { email, password } = watch()

  useEffect(() => {
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      reset();
    } catch (error) {
      console.error("error : ",error || '');
      setError('afterSubmit', {
        ...error,
        message: error,
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} sx={{ mt: 1, mb:1 }}>
        {!!errors?.afterSubmit && <Alert sx={{width:'380px'}} severity="error">{errors?.afterSubmit?.message}</Alert>}
        <RHFTextField  type="email"  name="email" label="Email address*" autoComplete="email"  inputRef={inputRef}
          inputProps={{ style: { textTransform: 'lowercase' } }}
        />
        <RHFPasswordField name="password" id="password" label="Password*" autoComplete="current-password" />
        <LoadingButton fullWidth color="secondary" size="large" type="submit" variant="contained" loading={isSubmitSuccessful || isSubmitting}>
          Login
        </LoadingButton>
      </Stack>
      <Stack alignItems="flex-end" sx={{ my: 2 }}>
        <Link component={RouterLink} to={PATH_AUTH.register} variant="body2" color="inherit" underline="always" >
          Create Account
        </Link>
        <Link component={RouterLink} to={PATH_AUTH.resetPassword} variant="body2" color="inherit" underline="always" >
         Forgot password?
        </Link>
      </Stack>
    </FormProvider>
  );

}
