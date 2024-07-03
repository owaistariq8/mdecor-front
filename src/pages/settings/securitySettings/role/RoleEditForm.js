import * as Yup from 'yup';
import {  useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Card, Grid, Stack, Container } from '@mui/material';
import {  PATH_SETTING } from '../../../../routes/paths';
// components
import { useSnackbar } from '../../../../components/snackbar';
import FormProvider, { RHFTextField, RHFSwitch, RHFAutocomplete } from '../../../../components/hook-form';
import { getRole, getRoles, updateRole } from '../../../../redux/slices/user/role';
import AddFormButtons from '../../../../components/DocumentForms/AddFormButtons';
import PageCover from '../../../../components/Defaults/PageCover';

// ----------------------------------------------------------------------

export default function RoleEditForm() {

  const { role, userRoleTypes } = useSelector((state) => state.role);;
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const EditRoleSchema = Yup.object().shape({
    name: Yup.string().min(2).max(50).required('Role Name is required!'),
    desc: Yup.string().max(10000),
    roleType:  Yup.object().nullable().required('Role Type is required!'),
    isActive: Yup.boolean(),
    disableDelete: Yup.boolean(),
  });


  const defaultValues = useMemo(
    () => ({
      name: role?.name || '',
      desc: role?.desc || '',
      roleType: userRoleTypes.find((type)=> type?.value === role?.roleType) || null, 
      disableDelete: role?.disableDelete || false,
      isActive: role?.isActive || false,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const methods = useForm({
    resolver: yupResolver(EditRoleSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const toggleCancel = () => navigate(PATH_SETTING.role.list);

  const onSubmit = async (data) => {
    try {
      await dispatch(updateRole(role._id, data));
      await dispatch(getRoles());
      await navigate(PATH_SETTING.role.list);
      enqueueSnackbar('Role updated Successfully!');
      reset();
    } catch ( err ) {
      enqueueSnackbar( err, { variant: `error` });
      console.error( err );
    }
  };

  return (
    <Container maxWidth={false}>
      <PageCover title={role?.name} setting />
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
          <Grid item xs={18} md={12}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <RHFTextField name="name" label="Name*" />
                <RHFAutocomplete
                  name="roleType" 
                  label="Role Type*"
                  options={userRoleTypes}
                  getOptionLabel={(option) => option.name || ''}
                  isOptionEqualToValue={(option, value) => option.value === value.value}
                  renderOption={(props, option) => ( <li {...props} key={option.key}>{option?.name || ''} </li>)}
                />
                <RHFTextField name="desc" label="Description" minRows={8} multiline />
              </Stack>
              <AddFormButtons isActive disableDelete isSubmitting={isSubmitting} toggleCancel={toggleCancel} />
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </Container>
  );
}
