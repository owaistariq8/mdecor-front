import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Card, Grid, Container, CardContent, Divider, CardActions } from '@mui/material';
// slice
import { addCustomer } from '../../redux/slices/customer/customer';
// routes
import { PATH_CUSTOMERS } from '../../routes/paths';
// components
import { useSnackbar } from '../../components/snackbar';
import FormProvider, {
  RHFTextField,
  RHFCountryAutocomplete,
  RHFChipsInput,
} from '../../components/hook-form';
import { CustomerSchema } from '../schemas/customer';
import PageCover from '../../components/Defaults/PageCover';
import { StyledCardHeader } from '../../components/settings/styles';
import AddFormButtons from '../../components/DocumentForms/AddFormButtons';

// ----------------------------------------------------------------------

export default function CustomerAddForm() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const defaultValues = useMemo(
    () => ({
      code: '',
      firstName: '',
      lastName: '',
      type: '',
      phone: '',
      email: '',
      website: '',
      agent: {},
      isActive: true
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ ]
  );

  const methods = useForm({
    resolver: yupResolver(CustomerSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const toggleCancel = () => navigate(PATH_CUSTOMERS.customers.list);

  const onSubmit = async (data) => {
    try {
      const response = await dispatch(addCustomer(data));
      reset();
      enqueueSnackbar('Customer added successfully!');
      navigate(PATH_CUSTOMERS.customers.view(response.data.customer._id));
    } catch (error) {
      enqueueSnackbar(error?.message, { variant: `error` });
    }
  };

  return (
    <Container maxWidth={false}>
      {/* <PageCover title='Add Customer' /> */}
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid sx={{ mt: 3 }}>
          <Card>
            <StyledCardHeader title="Add Customer" />
            <CardContent>
              <Box
                rowGap={2} columnGap={2} display="grid"
                gridTemplateColumns={{ sm: 'repeat(1, 1fr)', md: 'repeat(1, 1fr 5fr)' }}
                sx={{mb:2}}
              >
                <RHFTextField name="code" label='Code' />
                <RHFTextField name="firstName" label='First Name' />
              </Box>
              <Box
                rowGap={2} columnGap={2} display="grid"
                gridTemplateColumns={{ sm: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
              >
                <RHFChipsInput name="lastName" label="Last Name"  />
                <RHFChipsInput name="phone" label="Phone"  />
                <RHFTextField name="email" label="Email" />
                <RHFTextField name="website" label="Website" />
              </Box>  
            </CardContent>
            <AddFormButtons isActive isSubmitting={isSubmitting} toggleCancel={toggleCancel} />
          </Card>
        </Grid>
      </FormProvider>
      </Container>
  );
}
