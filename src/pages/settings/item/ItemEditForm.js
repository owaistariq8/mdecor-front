import * as Yup from 'yup';
import { useLayoutEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Card, Grid, Stack, Container, Box } from '@mui/material';
// ROUTES
import { PATH_SETTING } from '../../../routes/paths';
// slice
import { updateItem } from '../../../redux/slices/settings/item';
import { getActiveItemCategories, resetActiveItemCategories } from '../../../redux/slices/settings/itemCategory';
// components
import { useSnackbar } from '../../../components/snackbar';
// assets
import FormProvider, { RHFAutocomplete, RHFTextField } from '../../../components/hook-form';
import AddFormButtons from '../../../components/DocumentForms/AddFormButtons';
import PageCover from '../../../components/Defaults/PageCover';

// ----------------------------------------------------------------------

export default function ItemEditForm() {

  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { item, isLoading } = useSelector((state) => state.item);
  const { activeItemCategories } = useSelector((state) => state.itemCategory);

  useLayoutEffect(() => {
    dispatch(getActiveItemCategories());
    return () =>{
      dispatch(resetActiveItemCategories());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);


  const defaultValues = useMemo(
    () => ({
      name: item?.name || '',
      category:item?.category?.name || '',
      price:item?.price || 0,
      stockQuantity:item?.stockQuantity || 0,
      desc: item?.desc || '',
      isActive: item?.isActive
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [item]
  );

  const ItemSchema = Yup.object().shape({
    name: Yup.string().required('Name is required!').min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
    category: Yup.object().nullable().required('Category is required!'),
    price: Yup.number().nullable().required('Price is required').min(1, 'Price can\'t be 0'),
    stockQuantity: Yup.number().nullable().min(0, 'Quantity must be at least 0').max(1000, 'Quantity must be less than 1000'),
    desc: Yup.string().nullable().max(10000, 'Description must be less than 10000 characters'),
    isActive: Yup.boolean(),
  });

  
  const methods = useForm({
    resolver: yupResolver(ItemSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      await dispatch(updateItem(id, data));
      reset();
      enqueueSnackbar('Item updated successfully!');
      // navigate(PATH_SETTING.item.view(item._id));
    } catch ( error ) {
      enqueueSnackbar( error?.message, { variant: `error` });
      console.error( error );
    }
  };

  const toggleCancel = () => navigate(PATH_SETTING.item.view(item._id));

  return (
    <Container maxWidth={false}>
      <PageCover title='Update Item' setting /> 
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={18} md={12}>
            <Card sx={{ p:3, pb:1 }}>
              <Stack spacing={2}>
                <RHFTextField name="name" label="Name*" />
                <RHFAutocomplete
                  name="category" 
                  label="Item Category*"
                  options={activeItemCategories}
                  getOptionLabel={(option) => option?.name || ''}
                  isOptionEqualToValue={(option, value) => option._id === value._id}
                  renderOption={(props, option) => (<li {...props} key={option.key}> {option.name || ''}</li>)}
                />
                <Box rowGap={2} columnGap={2} display="grid" gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }} >
                  <RHFTextField name="price" label="Price*" />
                  <RHFTextField name="stockQuantity" label="Stock Quantity" />
                </Box>
                <RHFTextField name="desc" label="Description" minRows={8} multiline />
              </Stack>
              <AddFormButtons isActive isSubmitting={isSubmitting} toggleCancel={toggleCancel} />
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </Container>
  );
}
