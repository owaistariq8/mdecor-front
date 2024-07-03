import PropTypes from 'prop-types';
import { useEffect, useLayoutEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Card, Grid, Stack, Checkbox, Container } from '@mui/material';
// routes
import { PATH_SECURITY } from '../../../routes/paths';
// components
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, { RHFSwitch, RHFTextField, RHFPasswordField, RHFAutocomplete, RHFPhoneInput } from '../../../components/hook-form';
// slice
import { addUser } from '../../../redux/slices/user/user';
import { addUserSchema } from '../../schemas/user';
import AddFormButtons from '../../../components/DocumentForms/AddFormButtons';
import { genderOptions, religionOptions, userStatusOptions } from '../../../utils/options';
import PageCover from '../../../components/Defaults/PageCover';

export default function UserAddForm() {

  const { activeRoles } = useSelector((state) => state.role);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  // useLayoutEffect(() => {
  //   dispatch(getActiveRoles());
  //   return () =>{
  //     dispatch(resetActiveRoles());
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [dispatch]);

  const defaultValues = useMemo(
    () => ({
      firstName: '',
      lastName: '',
      phone: '',
      mobile: '',
      email: '',
      gender: null,
      religion: null,
      roles: null,
      status: {_id:'active', label:'Active'},
      password: '',
      confirmPassword: '',
      isActive:true
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // isInvite && editUserSchema || !isInvite && 
  const methods = useForm({
    resolver: yupResolver(addUserSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      const response = await dispatch(addUser(data));
      reset();
      navigate(PATH_SECURITY.user.view(response.data.user._id));
      enqueueSnackbar('User Added Successfully');
    } catch (error) {
        enqueueSnackbar(error?.message, { variant: `error` });
        console.log('Error:', error?.message);
    }
  };

  const toggleCancel = () =>  navigate(PATH_SECURITY.root);

  return (
  <Container maxWidth={false}>
    <PageCover title='New User' />
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
          <Stack spacing={2} >
            <Box rowGap={2} columnGap={2} display="grid" gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }} >
              <RHFTextField name="firstName" label="First Name*" />
              <RHFTextField name="lastName" label="Last Name" />
              <RHFPhoneInput name="phone" label="Phone Number"  />
              <RHFTextField name="email" label="Email Address*" inputProps={{ style: { textTransform: 'lowercase' } }} />

              <RHFPasswordField name="password" label="Password*"/>
              <RHFPasswordField name="confirmPassword" label="Confirm Password*" />
              <RHFAutocomplete
                name="religion"
                label="Religion"
                options={ religionOptions }
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, value) => option?._id === value?._id || null}
              />
              <RHFAutocomplete
                name="gender"
                label="Gender"
                options={ genderOptions }
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, value) => option?._id === value?._id || null}
              />
              
              <RHFAutocomplete
                name="status"
                label="Status"
                options={ userStatusOptions }
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, value) => option?._id === value?._id || null}
              />
              <RHFAutocomplete
                name="roles"
                label="Roles"
                options={ activeRoles }
                getOptionLabel={(option) => `${option?.name || ''} `}
                isOptionEqualToValue={(option, value) => option?._id === value?._id}
              />
            
            </Box>
            <AddFormButtons isActive isSubmitting={isSubmitting} toggleCancel={toggleCancel} />
          </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  </Container>
  );
}
