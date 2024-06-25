import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector, batch } from 'react-redux';
// @mui
import { Card, Grid, Link, Button } from '@mui/material';
import ConfirmDialog from '../../../components/confirm-dialog';
// routes
import { PATH_USER } from '../../../routes/paths';
// slices
import {
  getUsers,
  deleteUser,
  getUser,
  changeUserStatus,
  setChangePasswordByAdminDialog,
} from '../../../redux/slices/user/user';
import { getCustomer , setCustomerDialog } from '../../../redux/slices/customer/customer';
import { getContact , setContactDialog } from '../../../redux/slices/customer/contact';
import ViewFormField from '../../../components/ViewForms/ViewFormField';
import ViewFormAudit from '../../../components/ViewForms/ViewFormAudit';
import ViewFormEditDeleteButtons from '../../../components/ViewForms/ViewFormEditDeleteButtons';
import { Cover } from '../../../components/Defaults/Cover';
import { useSnackbar } from '../../../components/snackbar';
import LogoAvatar from '../../../components/logo-avatar/LogoAvatar';
import CustomAvatar from '../../../components/custom-avatar/CustomAvatar';
import CustomerDialog from '../../../components/Dialog/CustomerDialog';
import ContactDialog from '../../../components/Dialog/ContactDialog';
import { StyledCardContainer, StyledTooltip } from '../../../theme/styles/default-styles';
import Iconify from '../../../components/iconify';
import FormLabel from '../../../components/DocumentForms/FormLabel';
import { ICONS } from '../../../constants/icons/default-icons';
import ChangePasswordByAdminDialog from '../../../components/Dialog/ChangePasswordByAdminDialog';

// ----------------------------------------------------------------------

export default function UserViewForm() {

  const { user, isLoading} = useSelector((state) => state.user);
  
  const [openConfirm, setOpenConfirm] = useState(false);
  const handleCloseConfirm = () => setOpenConfirm(false);

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    dispatch(setCustomerDialog(false))
    dispatch(setContactDialog(false))
  },[dispatch, user]);

  useEffect(() => {
    batch(() => {
      if (user && user?.customer && user?.customer?._id) {
        dispatch(getCustomer(user?.customer?._id));
      }
      if (user && user?.contact && user?.contact?._id) {
        dispatch(getContact(user?.customer?._id, user?.contact?._id));
      }
    });
  }, [dispatch, user]);

  const handleEdit = () => {
    navigate(PATH_USER.users.edit(user._id));
  };

  const handleCustomerDialog = (event) =>{
    event.preventDefault();  
    dispatch(setCustomerDialog(true))
  }
  
  const handleContactDialog = (event) =>{
    event.preventDefault();  
    dispatch(setContactDialog(true))
  }

  const handleUpdatePassword = () => {
    dispatch(setChangePasswordByAdminDialog(true))
  };

  const userStatus = {
    locked:new Date(user?.lockUntil).getTime() > new Date().getTime(),
    lockedBy:user?.lockedBy,
    lockedUntil:user?.lockUntil
  }



  const onDelete = async () => {
    try {
      await dispatch(deleteUser(id));
      dispatch(getUsers());
      navigate(PATH_USER.list);
    } catch (error) {
      enqueueSnackbar('User Archive failed!', { variant: `error` });
      console.log('Error:', error);
    }
  };

  const defaultValues = useMemo(
    () => ({
      customer: user?.customer?.name || '',
      contact: user?.contact || null,
      name: user?.name || '',
      phone: user?.phone || '',
      email: user?.email || '',
      login: user?.login || '',
      roles: user?.roles,
      dataAccessibilityLevel: user?.dataAccessibilityLevel || '',
      regions: user?.regions || [],
      countries: user?.regions ? user.regions.flatMap(region => region.countries) : [],
      customers: user?.customers || [],
      machines: user?.machines || [],
      isActive: user?.isActive,
      currentEmployee: user?.currentEmployee || false,
      multiFactorAuthentication: user?.multiFactorAuthentication,
      createdByFullName: user?.createdBy?.name,
      createdAt: user?.createdAt,
      createdIP: user?.createdIP,
      updatedByFullName: user?.updatedBy?.name,
      updatedAt: user?.updatedAt,
      updatedIP: user?.updatedIP,
    }),
    [user]
  );

  return (
    <>
      <Grid sx={{ p: 3, mt: -3 }}>
        <StyledCardContainer>
          <Cover name={defaultValues.name} />
        </StyledCardContainer>
        <Card sx={{ p: 3 }}>
          <ViewFormEditDeleteButtons
            handleEdit={handleEdit}
            handleUpdatePassword={handleUpdatePassword}
            onDelete={onDelete}
            backLink={() => navigate(PATH_USER.root)}
            isActive={defaultValues.isActive}
            userStatus={userStatus}
            userPage
          />
          <ConfirmDialog
            open={openConfirm}
            onClose={handleCloseConfirm}
            title="Delete"
            content="Are you sure want to delete?"
            action={
              <Button variant="contained" color="error" onClick={onDelete}>
                Delete
              </Button>
            }
          />
          <Grid container sx={{display:{ md:'flex', sm: 'block' }, justifyContent:{md: 'space-between'}}} >
          <Grid  item md={6} sm={12} xs={12} sx={{p:.5}}>
            <Grid  sx={{border: '1px solid lightgrey', borderRadius:2, px:1.5, pt:1.5, height: {md: '100%'}}}>
            <FormLabel content='Personal Information' />
              <ViewFormField isLoading={isLoading}
                  sm={12}
                  heading="Full Name"
                  node={
                    defaultValues?.name && (
                      <>
                        {defaultValues?.name}
                        
                      </>
                    )
                  }
              />
              <ViewFormField isLoading={isLoading} sm={12} heading="Phone" param={defaultValues?.phone} />
              <ViewFormField isLoading={isLoading} sm={12} heading="email" param={defaultValues?.email} />
              <ViewFormField isLoading={isLoading}
                sm={12}
                heading="Customer"
                node={
                  defaultValues?.customer && (
                    <Link onClick={handleCustomerDialog} href="#" underline="none">
                      {defaultValues?.customer}
                      
                      {!user?.customer?.isActive &&
                        <StyledTooltip title="Customer is Inactive" placement='top' disableFocusListener tooltipcolor="#FF0000" color="#FF0000">
                          <Iconify color="#FF0000" sx={{height: '24px', width: '24px', verticalAlign:"middle", ml:1 }} icon="mdi:ban" />
                        </StyledTooltip>
                      }
                    </Link>)}
              />
              <ViewFormField isLoading={isLoading}
                sm={12}
                heading="Contact"
                node={
                  <>
                    { defaultValues?.contact?.firstName && <StyledTooltip
                      placement="top" 
                      title={defaultValues?.contact?.formerEmployee ? ICONS.FORMEREMPLOYEE.heading:ICONS.NOTFORMEREMPLOYEE.heading} 
                      disableFocusListener tooltipcolor={defaultValues?.contact?.formerEmployee ? ICONS.FORMEREMPLOYEE.color:ICONS.NOTFORMEREMPLOYEE.color} 
                      color={defaultValues?.contact?.formerEmployee ? ICONS.FORMEREMPLOYEE.color:ICONS.NOTFORMEREMPLOYEE.color}
                    >
                      <Iconify icon={ICONS.FORMEREMPLOYEE.icon} sx={{mr:1, height: 20, width: 20 }}/>
                    </StyledTooltip>}
                    {defaultValues?.contact && (
                      <Link onClick={handleContactDialog} href="#" underline="none">
                        {defaultValues?.contact?.firstName || ''} {defaultValues?.contact?.lastName || ''}
                        {!defaultValues?.contact?.isActive &&
                          <StyledTooltip title="Contact is Inactive" placement='top' disableFocusListener tooltipcolor="#FF0000" color="#FF0000">
                            <Iconify color="#FF0000" sx={{height: '24px', width: '24px', verticalAlign:"middle", ml:1 }} icon="mdi:ban" />
                          </StyledTooltip>
                        }
                      </Link>)
                    }
                  </>
                    }
              />
            </Grid>
            </Grid>
            
          </Grid>
          {/* <ViewFormField /> */}
          <Grid container>
            <ViewFormAudit defaultValues={defaultValues} />
          </Grid>
        </Card>
      </Grid>
      
      <CustomerDialog />
      <ContactDialog />
      <ChangePasswordByAdminDialog />
      
    </>
  );
}
