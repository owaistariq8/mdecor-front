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
// assets
// components
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, { RHFSwitch, RHFTextField, RHFPasswordField, RHFAutocomplete, RHFPhoneInput } from '../../../components/hook-form';
// slice
import { addUser } from '../../../redux/slices/user/user';
import { getCustomers, resetCustomers } from '../../../redux/slices/customer/customer';
import { getActiveContacts, resetActiveContacts } from '../../../redux/slices/customer/contact';
import { getActiveRoles, resetActiveRoles } from '../../../redux/slices/user/role';
import { addUserSchema , editUserSchema} from '../../schemas/user';
import AddFormButtons from '../../../components/DocumentForms/AddFormButtons';

UserAddForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
  isInvite: PropTypes.bool,
};

export default function UserAddForm({ isEdit = false, currentUser, isInvite }) {

  const { customers } = useSelector((state) => state.customer);
  const { activeRoles } = useSelector((state) => state.role);
  const { activeContacts } = useSelector((state) => state.contact);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useLayoutEffect(() => {
    dispatch(getCustomers({status:'active'}));
    dispatch(getActiveRoles());
    return () =>{
      dispatch(resetCustomers());
      dispatch(resetActiveRoles());
      dispatch(resetActiveContacts());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);


  const defaultValues = useMemo(
    () => ({
      customer: null,
      contact: null,
      name: '',
      phone: '+64 ',
      email: '',
      password: '',
      confirmPassword: '',
      roles: [],
      isActive: true,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ currentUser ]
  );
  // isInvite && editUserSchema || !isInvite && 
  const methods = useForm({
    resolver: yupResolver(  editUserSchema || addUserSchema ),
    defaultValues,
  });

  const {
    reset,
    setValue,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

const { customer, contact } = watch();

  useEffect(() => {
    setValue('customer',customers.find(c => c?.type?.toUpperCase() === "SP" ));
  },[ customers, setValue ])

  useEffect(() => {
    if(customer?._id){
      dispatch(getActiveContacts(customer?._id));
    } else {
      dispatch(resetActiveContacts());
    }
  }, [ dispatch, customer?._id ]);

  useEffect(() => {
    if(contact?._id){
      setValue( 'name', `${contact?.firstName || ''} ${contact?.lastName || ''}` );
      setValue( 'phone', contact?.phone );
      setValue( 'email', contact?.email );
    } else {
      setValue( 'name', '' );
      setValue( 'phone', '' );
      setValue( 'email', '' );
    }
  }, [ dispatch, contact, setValue ]);

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

  const toggleCancel = () =>  navigate(PATH_USER.root);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
          <Stack spacing={2} >
            <Box rowGap={2} columnGap={2} display="grid"
              gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}
            >
              <RHFAutocomplete
                name='customer'
                label="Customer*"
                options={ customers }
                getOptionLabel={(option) => option?.name || ''}
                isOptionEqualToValue={(option, value) => option?._id === value?._id}
                renderOption={(props, option) => (<li  {...props} key={option?._id}>{option?.name || ''}</li>)}
              />
              
              <RHFAutocomplete
                name='contact'
                label="Contact"
                options={activeContacts}
                getOptionLabel={(option) => `${option?.firstName || ''} ${option?.lastName || ''}`}
                isOptionEqualToValue={(option, value) => option?._id === value?._id}
                renderOption={(props, option) => (<li  {...props} key={option?._id}>{option?.firstName || ''}{' '}{option?.lastName || ''}</li>)}
              />

              <RHFTextField name="name" label="Full Name*" />
              <RHFPhoneInput name="phone" label="Phone Number" />
            </Box>

            <Box
              rowGap={2} columnGap={2} display="grid"
              gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' }}
            >
              <RHFTextField name="email" label="Email Address*" inputProps={{ style: { textTransform: 'lowercase' } }} />
            </Box>
            <Box sx={{ mb: 3 }} rowGap={2} columnGap={2} display="grid" 
              gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)',}}
            >
              <RHFPasswordField name="password" label="Password*"/>
              <RHFPasswordField name="confirmPassword" label="Confirm Password*" />
            </Box>

            <Box rowGap={2} columnGap={2} display="grid"
              gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}
            >

              <RHFAutocomplete
                multiple
                disableCloseOnSelect
                filterSelectedOptions
                name="roles"
                label="Roles*"
                options={ activeRoles }
                getOptionLabel={(option) => `${option?.name || ''} `}
                isOptionEqualToValue={(option, value) => option?._id === value?._id}
                renderOption={(props, option, { selected }) => ( <li {...props}> <Checkbox checked={selected} />{option?.name || ''}</li> )}
              />

            </Box>
            <Box rowGap={2} columnGap={2} display="grid"
              gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' }}
            >
              

              

             

            </Box>
            <Grid item md={12} display="flex">
              <>
              <RHFSwitch name="isActive" label="Active" />
              </>
            </Grid>
            <Stack sx={{ mt: 3 }}>
              <AddFormButtons userPage saveButtonName="Save" isSubmitting={isSubmitting} toggleCancel={toggleCancel} />
            </Stack>
          </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
