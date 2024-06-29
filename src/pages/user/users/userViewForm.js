import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// @mui
import { Card, Grid } from '@mui/material';
// routes
import { PATH_USER } from '../../../routes/paths';
// slices
import {
  getUsers,
  deleteUser,
  setChangePasswordByAdminDialog,
} from '../../../redux/slices/user/user';
import ViewFormTopBar from '../../../components/ViewForms/ViewFormTopBar';
import ViewFormField from '../../../components/ViewForms/ViewFormField';
import { Cover } from '../../../components/Defaults/Cover';
import { useSnackbar } from '../../../components/snackbar';
import { StyledCardContainer, StyledTooltip } from '../../../theme/styles/default-styles';
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

  const handleBackLink = () => {
    navigate(PATH_USER.root);
  };

  const handleEdit = () => {
    navigate(PATH_USER.users.edit(user._id));
  };

  const handleUpdatePassword = () => {
    dispatch(setChangePasswordByAdminDialog(true))
  };

  const handleDelete = async () => {
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
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      phone: user?.phone || '',
      mobile: user?.mobile || '',
      email: user?.email || '',
      gender: user?.gender || '',
      religion: user?.religion,
      roles: user?.roles,
      status: user?.status || '',
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
          <Grid container sx={{display:{ md:'flex', sm: 'block' }, justifyContent:{md: 'space-between'}}} >
            <ViewFormTopBar isActive={defaultValues.status==="active"} onBackLink={handleBackLink} onDelete={handleDelete} onEdit={handleEdit} />
            <ViewFormField isLoading={isLoading} sm={6} heading="First Name" param={defaultValues?.firstName} />
            <ViewFormField isLoading={isLoading} sm={6} heading="Last Name" param={defaultValues?.lastName} />
            <ViewFormField isLoading={isLoading} sm={6} heading="Phone" param={defaultValues?.phone} />
            <ViewFormField isLoading={isLoading} sm={6} heading="Email" param={defaultValues?.email} />
            <ViewFormField isLoading={isLoading} sm={6} heading="Religion" param={defaultValues?.religion} />
            <ViewFormField isLoading={isLoading} sm={6} heading="Gender" param={defaultValues?.gender} />
          </Grid>
        </Card>
      </Grid>
      <ChangePasswordByAdminDialog />
    </>
  );
}
