import * as Yup from 'yup';
import { useLayoutEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Card, Grid, Stack, Container, Box } from '@mui/material';
// ROUTES
import { PATH_SETTING } from '../../../routes/paths';
// slice
import { addItem } from '../../../redux/slices/settings/item';
import { getActiveItemCategories, resetActiveItemCategories } from '../../../redux/slices/settings/itemCategory';
// components
import { useSnackbar } from '../../../components/snackbar';
// assets
import FormProvider, { RHFAutocomplete, RHFTextField } from '../../../components/hook-form';
import AddFormButtons from '../../../components/DocumentForms/AddFormButtons';
import { Cover } from '../../../components/Defaults/Cover';
import { StyledCardContainer } from '../../../theme/styles/default-styles';

// ----------------------------------------------------------------------

export default function ItemAddForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { activeItemCategories } = useSelector((state) => state.itemCategory);

  // useLayoutEffect(() => {
  //   dispatch(getActiveItemCategories());
  //   return () =>{
  //     dispatch(resetActiveItemCategories());
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [dispatch]);

  const ItemSchema = Yup.object().shape({
    name: Yup.string().min(2).max(50).required('Name is required!'),
    itemCategory: Yup.object().required('Category is required!'),
    description: Yup.string().max(10000),
    stockQuantity: Yup.number().max(1000),
    status: Yup.string(),
    isActive: Yup.boolean(),
  });

  const defaultValues = useMemo(
    () => ({
      name: '',
      itemCategory:null,
      description: '',
      stockQuantity:0,
      status:'active',
      image:'',
      isActive: true,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

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
      await dispatch(addItem(data));
      reset();
      enqueueSnackbar('Item added successfully!');
      navigate(PATH_SETTING.item.list);
    } catch ( error ) {
      enqueueSnackbar( error, { variant: `error` });
      console.error( error );
    }
  };

  const toggleCancel = () => navigate(PATH_SETTING.item.list);

  return (
    <Container maxWidth={false}>
      <StyledCardContainer>
        <Cover name="New Item" />
      </StyledCardContainer>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={18} md={12}>
            <Card sx={{ p:3, pb:1 }}>
              <Stack spacing={2}>
                <RHFTextField name="name" label="Name" />
                <RHFAutocomplete
                  name="itemCategory" 
                  label="Item Category"
                  options={activeItemCategories}
                  getOptionLabel={(option) => option?.name || ''}
                  isOptionEqualToValue={(option, value) => option._id === value._id}
                  renderOption={(props, option) => (<li {...props} key={option.key}> {option.name || ''}</li>)}
                />
                <Box rowGap={2} columnGap={2} display="grid" gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }} >
                  <RHFTextField type='number' name="price" label="Price" />
                  <RHFTextField type='number' name="stockQuantity" label="Stock Quantity" />
                </Box>
                <RHFTextField name="description" label="Description" minRows={8} multiline />
              </Stack>
              <AddFormButtons isActive isSubmitting={isSubmitting} toggleCancel={toggleCancel} />
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </Container>
  );
}
