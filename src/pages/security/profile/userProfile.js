import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// @mui
import {
  Card,
  Grid,
  Container,
  Link,
} from '@mui/material';
// routes
import { PATH_SECURITY } from '../../../routes/paths';
// auth
import { useAuthContext } from '../../../auth/useAuthContext';
// _mock_
import {
  getUser
} from '../../../redux/slices/user/user';
// components
import ViewFormField from '../../../components/ViewForms/ViewFormField';
import ViewFormAudit from '../../../components/ViewForms/ViewFormAudit';
import { getCustomer , setCustomerDialog } from '../../../redux/slices/customer/customer';
import ViewFormEditDeleteButtons from '../../../components/ViewForms/ViewFormEditDeleteButtons';
import CustomerDialog from '../../../components/Dialog/CustomerDialog';

// ----------------------------------------------------------------------

export default function UserProfile() {
  // const { customer } = useSelector((state) => state.customer);
  // const { contact } = useSelector((state) => state.contact);
  const { user, initial } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useAuthContext();

  useEffect(() => {
    if (userId) {
      dispatch(getUser(userId));
    }
  }, [dispatch, userId, initial]);

  useEffect(() => {
    dispatch(setCustomerDialog(false));
  }, [dispatch]);

  const handleCustomerDialog = (event) =>{
    event.preventDefault();
    dispatch(setCustomerDialog(true))
    if ( user?.customer?._id) {
      dispatch(getCustomer(user?.customer?._id));
    }
  }

  
  const handleEdit = () => {
    navigate(PATH_SECURITY.user.editProfile);
  };

  const defaultValues = useMemo(
    () => ({
      customer: user?.customer?.name || '',
      contact: `${user?.contact?.firstName || '' } ${user?.contact?.lastName || '' }` || '',
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      phone: user?.phone || '',
      email: user?.email || '',
      roles: user?.roles || [],
      status: user?.status || 'inactive',
      createdAt: user?.createdAt || '',
      updatedAt: user?.updatedAt || '',
    }),
    [user]
  );
  return (
    <>
      <Container maxWidth={false}>
        <Card sx={{ p: 3 }}>
          <ViewFormEditDeleteButtons 
              status={defaultValues.status}
              handleEdit={handleEdit} 
            />
          <Grid container>
            <ViewFormField
              sm={6}
              heading="Customer"
              node={
                defaultValues?.customer && (
                  <Link onClick={ handleCustomerDialog } href="#" underline="none">
                    {defaultValues?.customer}
                  </Link>
                )
              }
            />
            <ViewFormField sm={6} heading="Full Name" param={`${defaultValues?.firstName} ${defaultValues?.lastName}`} />
            <ViewFormField sm={6} heading="Phone" param={defaultValues?.phone} />
            <ViewFormField sm={12} heading="email" param={defaultValues?.email} />
            <ViewFormField
              sm={6}
              heading="Roles"
              userRolesChips={defaultValues?.roles}
            />
          </Grid>
          <ViewFormField />
          <Grid container>
            <ViewFormAudit defaultValues={defaultValues} />
          </Grid>
        </Card>
      </Container>

      <CustomerDialog />

    </>
  );
}
