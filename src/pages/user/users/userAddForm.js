import PropTypes from 'prop-types';
import { useEffect, useLayoutEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Card, Grid, Stack, Checkbox } from '@mui/material';
// routes
import { PATH_USER } from '../../../routes/paths';
// components
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, { RHFSwitch, RHFTextField, RHFPasswordField, RHFAutocomplete, RHFPhoneInput } from '../../../components/hook-form';
// slice
import { addUser } from '../../../redux/slices/user/user';
import { addUserSchema } from '../../schemas/user';
import AddFormButtons from '../../../components/DocumentForms/AddFormButtons';

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
      gender: '',
      religion: '',
      roles: '',
      status: '',
      isActive: true,
      password: '',
      confirmPassword: ''
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
      const message = "User Added Successfully";
      const response = await dispatch(addUser(data));
      reset();
      navigate(PATH_USER.users.view(response.data.user._id));
      enqueueSnackbar(message);
    } catch (error) {
        enqueueSnackbar(error, { variant: `error` });
        console.log('Error:', error);
    }
  };

  const religionList = ['Christianity', 'Islam', 'Hinduism', 'Buddhism', 'Judaism', 'Sikhism'];
  const genderList = ['Male', 'Female'];


  const toggleCancel = () =>  navigate(PATH_USER.root);

  return (
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
                options={ religionList }
                getOptionLabel={(option) => option}
                isOptionEqualToValue={(option, value) => option?.toLowerCase() === value}
              />
              <RHFAutocomplete
                name="gender"
                label="Gender"
                options={ genderList }
                getOptionLabel={(option) => option}
                isOptionEqualToValue={(option, value) => option?.toLowerCase() === value}
              />
              <RHFAutocomplete
                name="roles"
                label="Roles"
                options={ activeRoles }
                getOptionLabel={(option) => `${option?.name || ''} `}
                isOptionEqualToValue={(option, value) => option?._id === value?._id}
                // renderOption={(props, option, { selected }) => ( <li {...props}> <Checkbox checked={selected} />{option?.name || ''}</li> )}
              />
            
            </Box>
            <AddFormButtons isSubmitting={isSubmitting} toggleCancel={toggleCancel} />
          </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
