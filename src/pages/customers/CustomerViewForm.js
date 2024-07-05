import { useLayoutEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
// @mui
import { Card, Container, Grid } from '@mui/material';
// routes
import { PATH_CUSTOMERS } from '../../routes/paths';
// hooks
import { useSnackbar } from '../../components/snackbar';
// slices
import {
  deleteCustomer,
  getCustomer,
  resetCustomer,
} from '../../redux/slices/customer/customer';
// components
import ViewFormField from '../../components/ViewForms/ViewFormField';
import PageCover from '../../components/Defaults/PageCover';
import ViewFormTopBar from '../../components/ViewForms/ViewFormTopBar';

// ----------------------------------------------------------------------

export default function CustomerViewForm() {

  const {id} = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  
  const { customer, isLoading } = useSelector((state) => state.customer);

  useLayoutEffect(()=>{
    dispatch(getCustomer(id));
    return ()=> { dispatch(resetCustomer()) }
  },[id, dispatch])
  
  const defaultValues = useMemo(
    () => ({
      fullName: `${customer?.firstName || ''} ${customer?.lastName || ''}`,
      firstName: customer?.firstName || '',
      lastName: customer?.lastName || '',
      type: customer?.type || '',
      phone: customer?.phone || '',
      email: customer?.email || '',
      website: customer?.website || '',
      agent: customer?.agent,
      isActive: customer?.isActive,
      createdAt: customer?.createdAt || '',
      updatedAt: customer?.updatedAt || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [customer]
  );

  const handleBackLink = async () =>  navigate(PATH_CUSTOMERS.customers.list);

  const handleEdit = async () =>  navigate(PATH_CUSTOMERS.customers.edit(id));

  const onDelete = async () => {
    try {
      await dispatch(deleteCustomer(id));
      navigate(PATH_CUSTOMERS.customers.list);
    } catch (err) {
      enqueueSnackbar(err?.message, { variant: `error` });
      console.log('Error:', err);
    }
  };


  return (
    <Container maxWidth={false}>
      <PageCover title={defaultValues.fullName} handleBackLink={handleBackLink} />
      <Card sx={{ width: '100%', p: '1rem', mb:3 }}>
        <Grid container direction="row">
            <ViewFormTopBar isActive={defaultValues.isActive} onDelete={onDelete} onEdit={handleEdit} />
            <ViewFormField isLoading={isLoading} sm={6} heading="First Name" param={defaultValues?.firstName} />
            <ViewFormField isLoading={isLoading} sm={6} heading="Last Name" param={defaultValues?.lastName} />
            <ViewFormField isLoading={isLoading} sm={6} heading="Phone" param={defaultValues?.phone} />
            <ViewFormField isLoading={isLoading} sm={6} heading="Email" param={defaultValues?.email} />
            <ViewFormField isLoading={isLoading} sm={6} heading="Website" param={defaultValues?.website} />
            <ViewFormField isLoading={isLoading} sm={6} heading="Agent" param={defaultValues?.agent?.name} />
        </Grid>
      </Card>
    </Container>
  );
}
