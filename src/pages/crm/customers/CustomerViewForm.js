import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
// @mui
import { Card, Grid } from '@mui/material';
// routes
import { PATH_CRM } from '../../../routes/paths';
// hooks
import { useSnackbar } from '../../../components/snackbar';
import useResponsive from '../../../hooks/useResponsive';
// slices
import {
  deleteCustomer,
} from '../../../redux/slices/customer/customer';
// components
import ViewFormAudit from '../../../components/ViewForms/ViewFormAudit';
import ViewFormField from '../../../components/ViewForms/ViewFormField';
import ViewPhoneComponent from '../../../components/ViewForms/ViewPhoneComponent';
import ViewFormEditDeleteButtons from '../../../components/ViewForms/ViewFormEditDeleteButtons';
import FormLabel from '../../../components/DocumentForms/FormLabel';
import { FORMLABELS } from '../../../constants/default-constants';
import { FORMLABELS as formLABELS } from '../../../constants/customer-constants';

// ----------------------------------------------------------------------

export default function CustomerViewForm() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useResponsive('down', 'sm');
  const { customer, isLoading } = useSelector((state) => state.customer);
  const { enqueueSnackbar } = useSnackbar();
  const { customerId } = useParams();
  const defaultValues = useMemo(
    () => ({
      id: customer?._id || '',
      name: customer?.name || '',
      site: customer?.site || null,
      contact: customer?.contact || null,
      status: customer?.status,
      createdAt: customer?.createdAt || '',
      updatedAt: customer?.updatedAt || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [customer]
  );
  
  const handleEdit = async () =>  customerId && navigate(PATH_CRM.customers.edit(customerId));

  const onDelete = async () => {
    try {
      await dispatch(deleteCustomer(customerId));
      navigate(PATH_CRM.customers.list);
    } catch (err) {
      enqueueSnackbar(err, { variant: `error` });
      console.log('Error:', err);
    }
  };


  return (
      <Grid container direction="row" mt={isMobile && 2}>
          <Card sx={{ width: '100%', p: '1rem', mb:3 }}>
            <ViewFormEditDeleteButtons
              handleEdit={ customer?.status==='active' ? undefined : handleEdit }
              onDelete={ customer?.status==='active' ? undefined : onDelete }
              supportSubscription={ customer?.status==='active' ? undefined : defaultValues.supportSubscription}
              backLink={() => navigate(PATH_CRM.customers.list)}
              excludeReports={ customer?.status==='active' ? undefined : defaultValues.excludeReports}
            />

            <Grid container>
              <ViewFormField isLoading={isLoading} variant='h4' sm={6} md={6} heading={formLABELS.CUSTOMER.NAME.label} param={defaultValues?.name} />
            </Grid>
            

            {defaultValues.site && (
              <Grid container>
                <FormLabel content={FORMLABELS.SITEINFORMATION} />
                <ViewFormField isLoading={isLoading} sm={6} heading="Site Name" param={defaultValues?.site?.name} />
                <ViewFormField isLoading={isLoading} sm={6} heading={formLABELS.STREET.label} param={defaultValues?.site.address?.street} />
                <ViewFormField isLoading={isLoading} sm={6} heading={formLABELS.SUBURB.label} param={defaultValues?.site.address?.suburb} />
                <ViewFormField isLoading={isLoading} sm={6} heading={formLABELS.CITY.label} param={defaultValues?.site.address?.city} />
                <ViewFormField isLoading={isLoading} sm={6} heading={formLABELS.POSTCODE.label} param={defaultValues?.site.address?.postcode} />
                <ViewFormField isLoading={isLoading} sm={6} heading={formLABELS.REGION.label} param={defaultValues?.site.address?.region} />
                <ViewFormField isLoading={isLoading} sm={6} heading={formLABELS.COUNTRY.label} param={defaultValues?.site.address?.country} />
                <ViewPhoneComponent isLoading={isLoading} sm={6} heading="Phone" value={defaultValues?.site?.phone || '' } />
                <ViewFormField isLoading={isLoading} sm={6} heading={formLABELS.CUSTOMER.EMAIL} param={defaultValues?.site?.email} />
                <ViewFormField isLoading={isLoading} sm={6} heading={formLABELS.CUSTOMER.WEBSITE} param={defaultValues?.site?.website} />
                <ViewFormField 
                  isLoading={isLoading} sm={6} 
                  heading='Contact' 
                  param={defaultValues?.contact?.firstName} 
                  secondParam={defaultValues?.contact?.lastName}
                />
              </Grid>
            )}
          </Card>
      </Grid>
  );
}
