import { useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dialog, DialogContent, Button, DialogTitle, Divider, DialogActions } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import {  
  addItemFiles,
  setItemAddFileDialog,
} from '../../redux/slices/settings/item';

import FormProvider from '../hook-form/FormProvider';
import { RHFUpload } from '../hook-form';
import { validateImageFileType } from '../file-thumbnail';

function DialogItemAddFile() {
    
  const dispatch = useDispatch();
  const { addFileDialog, item, isLoading } = useSelector((state) => state.item);
  
  const handleCloseDialog = ()=>{ 
    dispatch(setItemAddFileDialog(false)) 
    reset();
  }
  
  const { enqueueSnackbar } = useSnackbar();
  
  const AddFilesSchema = Yup.object().shape({
    images: Yup.mixed().required('Item image is required!')
    .test(
      'fileType',
      'Only the following formats are accepted: .jpeg, .jpg, gif, .bmp, .webp',
      validateImageFileType
    ).nullable(true),
  });

  const methods = useForm({
    resolver: yupResolver(AddFilesSchema),
    defaultValues:{
      images: null
    },
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;
  const { images } = watch();

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


  const onSubmit = async (data) => {
    try {
      await dispatch(addItemFiles(item?._id, data))
      await dispatch(setItemAddFileDialog(false));
      await reset();
      await enqueueSnackbar('Images uploaded successfully!');
    } catch (error) {
      enqueueSnackbar('Failed images upload', { variant: `error` });
      console.error(error);
    }
  };

  return (
    <Dialog fullWidth maxWidth="xl" open={addFileDialog} onClose={handleCloseDialog}>
      <DialogTitle variant='h3' sx={{pb:1, pt:2}}>Add Images for ({item?.name})</DialogTitle>
      <Divider orientation="horizontal" flexItem />
      <DialogContent dividers sx={{pt:0}}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
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
          </FormProvider>
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' onClick={handleCloseDialog}>Cancel</Button>
        <LoadingButton loading={isSubmitting} onClick={handleSubmit(onSubmit)} variant='contained'>Save</LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default DialogItemAddFile;
