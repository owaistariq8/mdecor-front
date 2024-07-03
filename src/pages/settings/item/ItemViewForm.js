import { useLayoutEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
// @mui
import { Card, Container, Grid } from '@mui/material';
// redux
import { deleteItem, getItem } from '../../../redux/slices/settings/item';
// paths
import { PATH_SETTING } from '../../../routes/paths';
// components
import { useSnackbar } from '../../../components/snackbar';
import ViewFormAudit from '../../../components/ViewForms/ViewFormAudit';
import ViewFormField from '../../../components/ViewForms/ViewFormField';
import ViewFormTopBar from '../../../components/ViewForms/ViewFormTopBar';
import PageCover from '../../../components/Defaults/PageCover';

// ----------------------------------------------------------------------

export default function RoleViewForm() {

  const { id } = useParams();
  const { item, isLoading } = useSelector((state) => state.item);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useLayoutEffect(() => {
    dispatch(getItem(id));
  }, [id, dispatch]);
  

  const onDelete = async () => {
    try {
      await dispatch(deleteItem(item?._id));
      navigate(PATH_SETTING.item.list);
      enqueueSnackbar('Item archived successfully!');
    } catch (error) {
      enqueueSnackbar(error, { variant: `error` });
      console.log('Error:', error);
    }
  };
  
  const handleEdit = async () => {
    navigate(PATH_SETTING.item.edit(item._id));
  };

  const handleBacklink = async () => {
    navigate(PATH_SETTING.item.list);
  };

  const defaultValues = useMemo(
    () => ({
      name: item?.name,
      description: item?.description || '',
      isActive: item?.isActive,
      createdAt: item?.createdAt || '',
      createdByFullName: item?.createdBy?.name || '',
      createdIP: item?.createdIP || '',
      updatedAt: item?.updatedAt || '',
      updatedByFullName: item?.updatedBy?.name || '',
      updatedIP: item?.updatedIP || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [item]
  );
  
  return (
    <Container maxWidth={false}>
      <PageCover title={item?.name} handleBacklink={handleBacklink} backIcon setting /> 
      <Card sx={{ p: 2 }}>
        <Grid>
          <ViewFormTopBar onEdit={handleEdit} onDelete={onDelete} />
          <Grid container sx={{mt:2}}>
            <ViewFormField isLoading={isLoading} sm={12} heading="Name" param={defaultValues.name} />
            <ViewFormField isLoading={isLoading} sm={12} heading="Description" param={defaultValues.desc} />
            <ViewFormAudit defaultValues={defaultValues} />
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}
