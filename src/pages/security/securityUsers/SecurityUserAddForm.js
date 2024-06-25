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
import { PATH_SECURITY } from '../../../routes/paths';
// assets
// components
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, { RHFSwitch, RHFTextField, RHFPasswordField, RHFAutocomplete, RHFPhoneInput } from '../../../components/hook-form';
// slice
import { addSecurityUser } from '../../../redux/slices/securityUser/securityUser';
import { getCustomers, resetCustomers } from '../../../redux/slices/customer/customer';
import { getActiveContacts, resetActiveContacts } from '../../../redux/slices/customer/contact';
import { getActiveRoles, resetActiveRoles } from '../../../redux/slices/securityUser/role';
import { addUserSchema , editUserSchema} from '../../schemas/securityUser';
import AddFormButtons from '../../../components/DocumentForms/AddFormButtons';

SecurityUserAddForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
  isInvite: PropTypes.bool,
};

export default function SecurityUserAddForm({ isEdit = false, currentUser, isInvite }) {

  const { allActiveCustomers } = useSelector((state) => state.customer);
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
      regions: [],
      customers: [],
      machines: [],
      dataAccessibilityLevel: 'RESTRICTED',
      isActive: true,
      isInvite,
      multiFactorAuthentication: false,
      currentEmployee: false,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ currentUser ]
  );
  // isInvite && editUserSchema || !isInvite && 
  const methods = useForm({
    resolver: yupResolver( isInvite && editUserSchema || !isInvite && addUserSchema ),
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
    setValue('customer',allActiveCustomers.find(c => c?.type?.toUpperCase() === "SP" ));
  },[ allActiveCustomers, setValue ])

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
      const message = !isInvite ? "User Added Successfully":"User Invitation Sent Successfulllfy";
      const response = await dispatch(addSecurityUser(data, isInvite));
      reset();
      navigate(PATH_SECURITY.users.view(response.data.user._id));
      enqueueSnackbar(message);
    } catch (error) {
        enqueueSnackbar(error, { variant: `error` });
        console.log('Error:', error);
    }
  };

  const toggleCancel = () =>  navigate(PATH_SECURITY.root);

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
                options={ allActiveCustomers }
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
              <RHFTextField name="email" label="Login/Email Address*" inputProps={{ style: { textTransform: 'lowercase' } }} />
            </Box>
            {(!isInvite &&(
              <Box sx={{ mb: 3 }} rowGap={2} columnGap={2} display="grid" 
                gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)',}}
              >
                <RHFPasswordField name="password" label="Password*"/>
                <RHFPasswordField name="confirmPassword" label="Confirm Password*" />
              </Box>
            ))}

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

              <RHFAutocomplete
                disableClearable
                name="dataAccessibilityLevel"
                label="Data Accessibility Level"
                options={ [ 'RESTRICTED', 'GLOBAL' ] }
                isOptionEqualToValue={(option, value) => option === value}
                renderOption={(props, option, { selected }) => ( <li {...props}> <Checkbox checked={selected} />{option|| ''}</li> )}
              />

            </Box>
            <Box rowGap={2} columnGap={2} display="grid"
              gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' }}
            >
              

              <RHFAutocomplete
                multiple
                disableCloseOnSelect
                filterSelectedOptions
                name="customers" 
                label="Customers"
                options={allActiveCustomers}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, value) => option?._id === value?._id}
                renderOption={(props, option) => ( <li {...props} key={option?._id}> {option?.name || ''} </li> )}
                ChipProps={{ size: 'small' }}
              />

             

            </Box>
            <Grid item md={12} display="flex">
                {(!isInvite &&(
                  <>
                  <RHFSwitch name="isActive" label="Active" />
                  <RHFSwitch name="multiFactorAuthentication" label="Multi-Factor Authentication" />
                  </>
              ))}
              <RHFSwitch name="currentEmployee" label="Current Employee" />
            </Grid>
            <Stack sx={{ mt: 3 }}>
              <AddFormButtons securityUserPage saveButtonName={isInvite?"Invite":"Save"} isSubmitting={isSubmitting} toggleCancel={toggleCancel} />
            </Stack>
          </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
