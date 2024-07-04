import { useLayoutEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// @mui
import { Card, CardContent, CardHeader, Container, Grid } from '@mui/material';
// routes
import { PATH_SECURITY } from '../../../routes/paths';
// slices
import {
  getUsers,
  deleteUser,
  setChangePasswordByAdminDialog,
  getUser,
} from '../../../redux/slices/user/user';
import ViewFormTopBar from '../../../components/ViewForms/ViewFormTopBar';
import ViewFormField from '../../../components/ViewForms/ViewFormField';
import { useSnackbar } from '../../../components/snackbar';
import ChangePasswordByAdminDialog from '../../../components/Dialog/ChangePasswordByAdminDialog';
import PageCover from '../../../components/Defaults/PageCover';
import { genderOptions, religionOptions, userStatusOptions } from '../../../utils/options';

// ----------------------------------------------------------------------

export default function UserViewForm() {

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  
  const { user, isLoading} = useSelector((state) => state.user);
  
  useLayoutEffect(() => {
    dispatch(getUser(id));
  }, [id, dispatch]);

  const handleBackLink = () => {
    navigate(PATH_SECURITY.root);
  };

  const handleEdit = () => {
    navigate(PATH_SECURITY.user.edit(user._id));
  };

  const handleUpdatePassword = () => {
    dispatch(setChangePasswordByAdminDialog(true))
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteUser(id));
      dispatch(getUsers());
      navigate(PATH_SECURITY.root);
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
      gender: genderOptions.find((sex)=> user?.gender === sex._id) || null,
      religion: religionOptions.find((rel)=> user?.religion === rel._id) || null,
      status: userStatusOptions.find((stat)=> user?.status === stat._id) ||  null,
      roles: user?.roles,
      isActive: user?.isActive,
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
    <Container maxWidth={false}>
      <PageCover title={`${defaultValues.firstName} ${defaultValues.lastName}`} handleBackLink={handleBackLink} backIcon />
      <Card>
        <CardContent>
          <Grid container sx={{display:{ md:'flex', sm: 'block' }, justifyContent:{md: 'space-between'}}} >
            <ViewFormTopBar isLoading={isLoading} isActive={defaultValues.isActive} onBackLink={handleBackLink} onUpdatePassword={handleUpdatePassword} onDelete={handleDelete} onEdit={handleEdit} />
            <ViewFormField isLoading={isLoading} sm={6} heading="First Name" param={defaultValues?.firstName} />
            <ViewFormField isLoading={isLoading} sm={6} heading="Last Name" param={defaultValues?.lastName} />
            <ViewFormField isLoading={isLoading} sm={6} heading="Phone" param={defaultValues?.phone} />
            <ViewFormField isLoading={isLoading} sm={6} heading="Email" param={defaultValues?.email} />
            <ViewFormField isLoading={isLoading} sm={6} heading="Religion" param={defaultValues?.religion?.label} />
            <ViewFormField isLoading={isLoading} sm={6} heading="Gender" param={defaultValues?.gender?.label} />
          </Grid>
        </CardContent>
      </Card>
    </Container>
    <ChangePasswordByAdminDialog />
    </>
  );
}
