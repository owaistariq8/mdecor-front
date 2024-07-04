import * as Yup from 'yup';
import { useCallback, useLayoutEffect, useMemo } from 'react';
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
import { getActiveItemCategories, getItemCategories, resetActiveItemCategories, resetItemCategories } from '../../../redux/slices/settings/itemCategory';
// components
import { useSnackbar } from '../../../components/snackbar';
// assets
import FormProvider, { RHFAutocomplete, RHFTextField, RHFUpload } from '../../../components/hook-form';
import AddFormButtons from '../../../components/DocumentForms/AddFormButtons';
import PageCover from '../../../components/Defaults/PageCover';
import { validateImageFileType } from '../../../components/file-thumbnail';

// ----------------------------------------------------------------------

export default function ItemAddForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { activeItemCategories } = useSelector((state) => state.itemCategory);

  useLayoutEffect(() => {
    dispatch(getActiveItemCategories());
    return () =>{
      dispatch(resetActiveItemCategories());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const ItemSchema = Yup.object().shape({
    name: Yup.string().required('Name is required!').min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
    category: Yup.object().nullable().required('Category is required!'),
    price: Yup.number().nullable().required('Price is required!').min(1, 'Price can\'t be 0'),
    stockQuantity: Yup.number().nullable().min(0, 'Quantity must be at least 0').max(1000, 'Quantity must be less than 1000'),
    desc: Yup.string().nullable().max(10000, 'Description must be less than 10000 characters'),
    images: Yup.mixed() .required('Image is required!')
      .test('fileType', 'Only the following formats are accepted: .jpeg, .jpg, .gif, .bmp, .webp',
        validateImageFileType
      ).nullable(true),
    isActive: Yup.boolean()
  });

  const defaultValues = useMemo(
    () => ({
      name: '',
      category:null,
      desc: '',
      price:null,
      stockQuantity:null,
      images:[],
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
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const { images } = watch();

  
  const onSubmit = async (data) => {
    try {
      await dispatch(addItem(data));
      reset();
      enqueueSnackbar('Item added successfully!');
      navigate(PATH_SETTING.item.list);
    } catch ( error ) {
      enqueueSnackbar( error?.message, { variant: `error` });
      console.error( error );
    }
  };

  const handleDropMultiFile = useCallback(
    async (acceptedFiles) => {
      const docFiles = images || [];
      console.log(acceptedFiles);
      const newFiles = acceptedFiles.map((file, index) => 
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        
      );
      setValue('images', [...docFiles, ...newFiles], { shouldValidate: true });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ images ]
  );

  const toggleCancel = () => navigate(PATH_SETTING.item.list);

  return (
    <Container maxWidth={false}>
      <PageCover title="New Item" setting />   
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
                <RHFUpload multiple  thumbnail 
                  name="images" imagesOnly
                  onDrop={handleDropMultiFile}
                  onRemove={(inputFile) =>
                    images && images.length > 1 ?
                    setValue('images', images?.filter((file) => file !== inputFile), { shouldValidate: true })
                    :setValue('images', '', { shouldValidate: true })
                  }
                  onRemoveAll={() => setValue('images', '', { shouldValidate: true })}
                />
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
