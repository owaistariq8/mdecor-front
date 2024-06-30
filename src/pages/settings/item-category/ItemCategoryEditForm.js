import * as Yup from 'yup';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Card, Grid, Stack, Container } from '@mui/material';
// ROUTES
import { PATH_SETTING } from '../../../routes/paths';
// slice
import { updateItemCategory } from '../../../redux/slices/settings/itemCategory';
// components
import { useSnackbar } from '../../../components/snackbar';
// assets
import FormProvider, { RHFTextField } from '../../../components/hook-form';
import AddFormButtons from '../../../components/DocumentForms/AddFormButtons';
import { Cover } from '../../../components/Defaults/Cover';
import { StyledCardContainer } from '../../../theme/styles/default-styles';

// ----------------------------------------------------------------------

export default function ItemCategoryEditForm() {

  const { itemCategory } = useSelector((state) => state.itemCategory);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const CategorySchema = Yup.object().shape({
    name: Yup.string().min(2).max(50).required('Name is required!'),
    description: Yup.string().max(10000),
    isActive: Yup.boolean(),
    isDefault: Yup.boolean(),
  });

  const defaultValues = useMemo(
    () => ({
      name: itemCategory?.name,
      description: itemCategory?.description || '',
      image:itemCategory?.image || '',
      isActive: itemCategory?.isActive,
      isDefault: itemCategory.isDefault,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [itemCategory]
  );

  const methods = useForm({
    resolver: yupResolver(CategorySchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      await dispatch(updateItemCategory(data));
      reset();
      enqueueSnackbar('Item Category updated successfully!');
      navigate(PATH_SETTING.item_category.list);
    } catch ( error ) {
      enqueueSnackbar( error, { variant: `error` });
      console.error( error );
    }
  };

  const toggleCancel = () => navigate(PATH_SETTING.item_category.view(itemCategory?._id));

  return (
    <Container maxWidth={false}>
      <StyledCardContainer>
        <Cover name="Update Item Category" />
      </StyledCardContainer>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={18} md={12}>
            <Card sx={{ p:3, pb:1 }}>
              <Stack spacing={2}>
                <RHFTextField name="name" label="Name" />
                <RHFTextField name="description" label="Description" minRows={8} multiline />
              </Stack>
              <AddFormButtons isActive isDefault isSubmitting={isSubmitting} toggleCancel={toggleCancel} />
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </Container>
  );
}
