import * as Yup from 'yup';
import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Card, Grid, Stack, Container } from '@mui/material';
// ROUTES
import { PATH_SETTING } from '../../../routes/paths';
// slice
import { addItemCategory } from '../../../redux/slices/settings/itemCategory';
// components
import { useSnackbar } from '../../../components/snackbar';
// assets
import FormProvider, { RHFTextField, RHFUpload } from '../../../components/hook-form';
import AddFormButtons from '../../../components/DocumentForms/AddFormButtons';
import { Cover } from '../../../components/Defaults/Cover';
import { StyledCardContainer } from '../../../theme/styles/default-styles';
import { validateImageFileType } from '../../../components/file-thumbnail';

// ----------------------------------------------------------------------

export default function ItemCategoryAddForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const CategorySchema = Yup.object().shape({
    name: Yup.string().min(2).max(50).required('Name is required!'),
    desc: Yup.string().max(10000),
    images: Yup.mixed().required('Category image is required!')
    .test(
      'fileType',
      'Only the following formats are accepted: .jpeg, .jpg, gif, .bmp, .webp',
      validateImageFileType
    ).nullable(true),
    isActive: Yup.boolean(),
    isDefault: Yup.boolean(),
  });

  const defaultValues = useMemo(
    () => ({
      name: '',
      desc: '',
      images:[],
      isActive: true,
      isDefault: false,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const methods = useForm({
    resolver: yupResolver(CategorySchema),
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
      await dispatch(addItemCategory(data));
      reset();
      enqueueSnackbar('Item Category added successfully!');
      navigate(PATH_SETTING.item_category.list);
    } catch ( error ) {
      enqueueSnackbar( error?.message, { variant: `error` });
      console.error( error );
    }
  };

  const handleDropMultiFile = useCallback(
    async (acceptedFiles) => {
      const docFiles = images || [];
      
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


  const toggleCancel = () => navigate(PATH_SETTING.item_category.list);

  return (
    <Container maxWidth={false}>
      <StyledCardContainer>
        <Cover name="New Item Category" />
      </StyledCardContainer>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={18} md={12}>
            <Card sx={{ p:3, pb:1 }}>
              <Stack spacing={2}>
                <RHFTextField name="name" label="Name" />
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
              <AddFormButtons isActive isDefault isSubmitting={isSubmitting} toggleCancel={toggleCancel} />
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </Container>
  );
}
