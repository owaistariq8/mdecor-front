import { useLayoutEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
// @mui
import { Card, Container, Grid } from '@mui/material';
// redux
import { deleteItemCategory, getItemCategory } from '../../../redux/slices/settings/itemCategory';
// paths
import { PATH_SETTING } from '../../../routes/paths';
// components
import { useSnackbar } from '../../../components/snackbar';
import ViewFormAudit from '../../../components/ViewForms/ViewFormAudit';
import ViewFormField from '../../../components/ViewForms/ViewFormField';
import ViewFormTopBar from '../../../components/ViewForms/ViewFormTopBar';
import { StyledCardContainer } from '../../../theme/styles/default-styles';
import { Cover } from '../../../components/Defaults/Cover';

// ----------------------------------------------------------------------

export default function ItemCategoryViewForm() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
 
  const { id } = useParams();
 
  useLayoutEffect(() => {
    dispatch(getItemCategory(id));
  }, [id, dispatch]);

  const { itemCategory, isLoading} = useSelector((state) => state.itemCategory);

  const onDelete = async () => {
    try {
      await dispatch(deleteItemCategory(itemCategory?._id));
      navigate(PATH_SETTING.item_category.list);
      enqueueSnackbar('Item Category archived successfully!');
    } catch (error) {
      enqueueSnackbar(error, { variant: `error` });
      console.log('Error:', error);
    }
  };
  
  const handleEdit = async () => {
    navigate(PATH_SETTING.item_category.edit(itemCategory._id));
  };

  const handleBacklink = async () => {
    navigate(PATH_SETTING.item_category.list);
  };

  const defaultValues = useMemo(
    () => ({
      name: itemCategory?.name,
      desc: itemCategory?.desc || '',
      active: itemCategory?.active,
      _default: itemCategory?._default,
      createdAt: itemCategory?.createdAt || '',
      createdByFullName: itemCategory?.createdBy?.name || '',
      createdIP: itemCategory?.createdIP || '',
      updatedAt: itemCategory?.updatedAt || '',
      updatedByFullName: itemCategory?.updatedBy?.name || '',
      updatedIP: itemCategory?.updatedIP || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [itemCategory]
  );

  return (
    <Container maxWidth={false}>
      <StyledCardContainer><Cover name={itemCategory?.name} generalSettings/></StyledCardContainer>
      <Card sx={{ p: 2 }}>
        <Grid>
          <ViewFormTopBar isActive={defaultValues.active} isDefault={defaultValues._default} onBackLink={handleBacklink} onEdit={handleEdit} onDelete={onDelete} />
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
