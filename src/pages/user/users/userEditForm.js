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
import { getCustomers, resetCustomers } from '../../../redux/slices/customer/customer';
import { getActiveContacts, resetActiveContacts } from '../../../redux/slices/customer/contact';
import { getActiveRoles, resetActiveRoles } from '../../../redux/slices/user/role';
import AddFormButtons from '../../../components/DocumentForms/AddFormButtons';
import { editUserSchema } from '../../schemas/user';

// ----------------------------------------------------------------------

export default function UserEditForm() {

  const { user } = useSelector((state) => state.user);
  const { activeRoles } = useSelector((state) => state.role);
  const { customers } = useSelector((state) => state.customer);
  const { activeContacts } = useSelector((state) => state.contact);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useLayoutEffect(() => {
    dispatch(getCustomers({status:'active'}));
    dispatch(getActiveRoles());
    return ()=>{ 
      dispatch(resetCustomers());
      dispatch(resetActiveRoles()); 
    }
  }, [dispatch]);

  const defaultValues = useMemo(
    () => ({
      customer: user?.customer || null,
      contact: user?.contact || null,
      name: user?.name || '',
      phone: user?.phone || '+64 ',
      email: user?.email || '',
      roles: user?.roles || [],
      isActive: user?.status==='active',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ user ]
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

const { customer } = watch();


useEffect(() => {
  if(customer?._id){
    dispatch(getActiveContacts(customer?._id));
  } else {
    dispatch(resetActiveContacts());
  }
}, [ dispatch,customer?._id ]);


const onChangeContact = (contact) => {
  if(contact?._id){
    setValue( 'name', `${contact?.firstName || ''} ${contact?.lastName || ''}` );
    setValue( 'phone', contact?.phone );
    setValue( 'email', contact?.email );
    setValue( 'contact', contact );
  } else {
    setValue( 'name', '' );
    setValue( 'phone', '' );
    setValue( 'email', '' );
    setValue( 'contact', null );
  }
}


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
            <Box rowGap={2} columnGap={2} display="grid"
              gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}
            >
              
              <RHFAutocomplete
                disabled
                name='customer'
                label="Customer"
                options={ customers }
                getOptionLabel={(option) => option?.name || ''}
                isOptionEqualToValue={(option, value) => option?._id === value?._id}
                renderOption={(props, option) => (<li  {...props} key={option?._id}>{option?.name || ''}</li>)}
              />

              <RHFAutocomplete
                name='contact'
                label="Contact"
                options={activeContacts}
                onChange={(event, newValue) => onChangeContact(newValue) }
                getOptionLabel={(option) => `${option?.firstName || ''} ${option?.lastName || ''}`}
                isOptionEqualToValue={(option, value) => option?._id === value?._id}
                renderOption={(props, option) => (<li  {...props} key={option?._id}>{option?.firstName || ''}{' '}{option?.lastName || ''}</li>)}
              />

              <RHFTextField name="name" label="Full Name*" />

              <RHFPhoneInput name="phone" label="Phone Number"  />

            </Box>
            <Box rowGap={2} columnGap={2} display="grid"
              gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' }}
            >
              <RHFTextField name="email" label="Email Address*" inputProps={{ style: { textTransform: 'lowercase' } }} />
            </Box>

            <Box
              rowGap={2} columnGap={2} display="grid"
              gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}
            >

              <RHFAutocomplete
                multiple
                disableCloseOnSelect
                filterSelectedOptions
                name="roles"
                label="Roles"
                options={ activeRoles }
                getOptionLabel={(option) => `${option?.name || ''} `}
                isOptionEqualToValue={(option, value) => option?._id === value?._id}
                renderOption={(props, option, { selected }) => ( <li {...props}> <Checkbox checked={selected} />{option?.name || ''}</li> )}
              />
              
              

            </Box>
         
            <Grid item md={12} display="flex">
              <RHFSwitch name="isActive" label="Active" />
            </Grid>

            <Stack sx={{ mt: 3 }}>
              <AddFormButtons userPage isSubmitting={isSubmitting} toggleCancel={toggleCancel} />
            </Stack>
          </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
