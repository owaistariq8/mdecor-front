import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dialog, DialogContent, Button, DialogTitle, Divider, DialogActions } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { getDocumentHistory, setDocumentVersionEditDialogVisibility, updateDocumentVersionNo } from '../../redux/slices/document/document';
import FormProvider from '../hook-form/FormProvider';

import { RHFTextField } from '../hook-form';

function UpdateDocumentVersionDialog() {
    
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  
  const { documentHistory, documentVersionEditDialogVisibility } = useSelector((state) => state.document);
  const handleCloseDialog = ()=>{ 
    dispatch(setDocumentVersionEditDialogVisibility(false));
    reset();
  }

  const defaultValues = useMemo(
    () => ({
      updatedVersion: Number(documentHistory?.documentVersions[0]?.versionNo) || 0,
    }),
    [ documentHistory ]
  );

  const SendEmailSchema = Yup.object().shape({
    updatedVersion: Yup.number().required("Version is required").max(1000).nullable(),
  });


  const methods = useForm({
    resolver: yupResolver(SendEmailSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting },
  } = methods;
  const { updatedVersion } = watch;
  useEffect(()=>{
    if(Number(documentHistory?.documentVersions[0]?.versionNo) !== Number(updatedVersion)){
      setValue('updatedVersion',documentHistory?.documentVersions[0]?.versionNo)
    }
  },[ updatedVersion, documentHistory, setValue ])
  
  const onSubmit = async (data) => {    
    try {
      await dispatch(updateDocumentVersionNo(documentHistory?._id, data));
      await dispatch(getDocumentHistory(documentHistory?._id))
      await handleCloseDialog();
      await reset();
      enqueueSnackbar("Version updated successfully");  
    } catch (err) {
      enqueueSnackbar(`Failed: ${err.message}`, { variant: 'error' });
      console.error(err.message);
    }
  }

  return (
    <Dialog fullWidth maxWidth="xs" open={documentVersionEditDialogVisibility} onClose={handleCloseDialog}>
      <DialogTitle variant='h3' sx={{pb:1, pt:2}}>Update Version</DialogTitle>
      <Divider orientation="horizontal" flexItem />
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} mb={5}>
        <DialogContent dividers sx={{pt:3}}>
          <RHFTextField type="number" name="updatedVersion" label="Version No."/>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' onClick={handleCloseDialog}>Cancel</Button>
          <LoadingButton loading={isSubmitting} type='submit' variant='contained'>Update</LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}

export default UpdateDocumentVersionDialog;
