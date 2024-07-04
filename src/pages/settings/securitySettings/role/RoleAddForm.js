import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Card, Grid, Stack, Container, CardContent } from '@mui/material';
// ROUTES
import { PATH_SETTING } from '../../../../routes/paths';
// slice
import { addRole } from '../../../../redux/slices/user/role';
// components
import { useSnackbar } from '../../../../components/snackbar';
// assets
import FormProvider, { RHFTextField, RHFSwitch, RHFAutocomplete } from '../../../../components/hook-form';
import AddFormButtons from '../../../../components/DocumentForms/AddFormButtons';
import PageCover from '../../../../components/Defaults/PageCover';

// ----------------------------------------------------------------------

export default function RoleAddForm() {

  const { userRoleTypes } = useSelector((state) => state.role);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const AddRoleSchema = Yup.object().shape({
    name: Yup.string().min(2).max(50).required('Role Name is required!'),
    desc: Yup.string().max(10000),
    roleType:  Yup.object().nullable().required('Role Type is required!'),
    isActive: Yup.boolean(),
    disableDelete: Yup.boolean(),
  });
  const defaultValues = useMemo(
    () => ({
      name: '',
      desc: '',
      roleType: null,
      isActive: true,
      disableDelete: false,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const methods = useForm({
    resolver: yupResolver(AddRoleSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      await dispatch(addRole(data));
      reset();
      enqueueSnackbar('Role Save Successfully!');
      navigate(PATH_SETTING.role.list);
    } catch ( error ) {
      enqueueSnackbar( error?.message, { variant: `error` });
      console.error( error );
    }
  };

  const toggleCancel = () => navigate(PATH_SETTING.role.list);

  return (
    <Container maxWidth={false}>
      <PageCover title='New Role' setting />
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={18} md={12}>
            <Card sx={{ p:3, pb:1 }}>
              <Stack spacing={2}>
                <RHFTextField name="name" label="Name" />
                <RHFAutocomplete
                  name="roleType" 
                  label="Role Type"
                  options={userRoleTypes}
                  getOptionLabel={(option) => option?.name || ''}
                  isOptionEqualToValue={(option, value) => option.name === value.name}
                  renderOption={(props, option) => (<li {...props} key={option.key}> {option.name || ''}</li>)}
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
