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
import FormProvider, { RHFSwitch, RHFTextField, RHFAutocomplete, RHFPhoneInput } from '../../../components/hook-form';
// slice
import { updateUser } from '../../../redux/slices/user/user';
import { getActiveRoles, resetActiveRoles } from '../../../redux/slices/user/role';
import AddFormButtons from '../../../components/DocumentForms/AddFormButtons';
import { editUserSchema } from '../../schemas/user';

// ----------------------------------------------------------------------

export default function UserEditForm() {

  const { user } = useSelector((state) => state.user);
  const { activeRoles } = useSelector((state) => state.role);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  // useLayoutEffect(() => {
  //   dispatch(getActiveRoles());
  //   return ()=>{ 
  //     dispatch(resetActiveRoles()); 
  //   }
  // }, [dispatch]);

  const defaultValues = useMemo(
    () => ({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      phone: user?.phone || '',
      mobile: user?.mobile || '',
      email: user?.email || '',
      gender: user?.gender || '',
      religion: user?.religion,
      roles: user?.roles,
      status: user?.status || '',
      isActive: user?.status==="active" || false,
      password: user?.password || '',
      createdByFullName: user?.createdBy?.name,
      createdAt: user?.createdAt,
      createdIP: user?.createdIP,
      updatedByFullName: user?.updatedBy?.name,
      updatedAt: user?.updatedAt,
      updatedIP: user?.updatedIP,
    }),
    [user]
  );
  
  const methods = useForm({
    resolver: yupResolver( editUserSchema ),
    defaultValues,
  });

  const {
    reset,
    setValue,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const religionList = ['Christianity', 'Islam', 'Hinduism', 'Buddhism', 'Judaism', 'Sikhism'];
  const genderList = ['Male', 'Female'];

  const onSubmit = async (data) => {
    try {
      dispatch(updateUser(data, user._id));
      reset();
      navigate(PATH_USER.users.view(user._id));
    } catch (error) {
      enqueueSnackbar(error, { variant: `error` });
      console.log('Error:', error);
    }
  };

  const toggleCancel = () => { navigate(PATH_USER.users.view(user._id)) };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container >
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
          <Stack  spacing={2} >
            <Box rowGap={2} columnGap={2} display="grid" gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }} >
              <RHFTextField name="firstName" label="First Name*" />
              <RHFTextField name="lastName" label="Last Name" />
              <RHFPhoneInput name="phone" label="Phone Number"  />
              <RHFTextField name="email" label="Email Address*" inputProps={{ style: { textTransform: 'lowercase' } }} />
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
            <AddFormButtons isActive isSubmitting={isSubmitting} toggleCancel={toggleCancel} />
          </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
