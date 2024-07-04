import { useLayoutEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
// @mui
import { Box, Button, Card, CardContent, CardHeader, Container, Grid, IconButton } from '@mui/material';
import download from 'downloadjs';
// redux
import { deleteFile, deleteItemCategory, downloadFile, getItemCategory } from '../../../redux/slices/settings/itemCategory';
import { getItems } from '../../../redux/slices/settings/item';
// paths
import { PATH_SETTING } from '../../../routes/paths';
// components
import { useSnackbar } from '../../../components/snackbar';
import ViewFormAudit from '../../../components/ViewForms/ViewFormAudit';
import ViewFormField from '../../../components/ViewForms/ViewFormField';
import ViewFormTopBar from '../../../components/ViewForms/ViewFormTopBar';
import PageCover from '../../../components/Defaults/PageCover';
import { StyledCardHeader } from '../../../components/settings/styles';
import { ThumbnailDocButton } from '../../../components/Thumbnails';
import { GalleryItem } from '../../../components/gallery/GalleryItem';

// ----------------------------------------------------------------------

export default function ItemCategoryViewForm() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
 
  const { id } = useParams();
 
  useLayoutEffect(() => {
    dispatch(getItemCategory(id));
    dispatch(getItems(id))
  }, [id, dispatch]);

  const { itemCategory, isLoading} = useSelector((state) => state.itemCategory);
  const { items } = useSelector((state) => state.itemCategory);

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
      images: itemCategory?.images || [],
      isActive: itemCategory?.isActive,
      isDefault: itemCategory?.isDefault,
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

  const regEx = /^[^2]*/;
  const [selectedImage, setSelectedImage] = useState(-1);
  const [slides, setSlides] = useState([]);

  const handleAddItemFile = ()=>{
    // dispatch(setItemAddFileDialog(true));
  }

  const handleOpenLightbox = async (index) => {
    setSelectedImage(index);
    const image = slides[index];

    if(!image?.isLoaded && image?.fileType?.startsWith('image')){
      try {
        const response = await dispatch(downloadFile(id, image?._id));
        if (regEx.test(response.status)) {
          // Update the image property in the imagesLightbox array
          const updatedSlides = [
            ...slides.slice(0, index), // copies slides before the updated slide
            {
              ...slides[index],
              src: `data:image/png;base64, ${response.data}`,
              isLoaded: true,
            },
            ...slides.slice(index + 1), // copies slides after the updated slide
          ];

          // Update the state with the new array
          setSlides(updatedSlides);
        }
      } catch (error) {
        console.error('Error loading full file:', error);
      }
    }
  };

  const handleCloseLightbox = () => {
    setSelectedImage(-1);
  };

  const handleDeleteFile = async (fileId) => {
    try {
      await dispatch(deleteFile(id, fileId));
      await dispatch(getItemCategory(id));
      enqueueSnackbar('Image deleted successfully');
    } catch (err) {
      console.log(err);
      enqueueSnackbar('Image Deletion failed!', { variant: `error` });
    }
  };

  const handleDownloadFile = (fileId, name, extension) => {
    dispatch(downloadFile(id, fileId))
      .then((res) => {
        if (regEx.test(res.status)) {
          download(atob(res.data), `${name}.${extension}`, { type: extension });
          enqueueSnackbar(res.statusText);
        } else {
          enqueueSnackbar(res.statusText, { variant: `error` });
        }
      })
      .catch((err) => {
        if (err.Message) {
          enqueueSnackbar(err.Message, { variant: `error` });
        } else if (err.message) {
          enqueueSnackbar(err.message, { variant: `error` });
        } else {
          enqueueSnackbar('Something went wrong!', { variant: `error` });
        }
      });
  };

  return (
    <Container maxWidth={false}>
      <PageCover title={defaultValues.name} handleBackLink={handleBacklink} backIcon setting />
      <Card>
        <CardContent>
          <Grid>
            <ViewFormTopBar isActive={defaultValues.isActive} isDefault={defaultValues.isDefault} onBackLink={handleBacklink} onEdit={handleEdit} onDelete={onDelete} />
            <Grid container sx={{mt:2}}>
              <ViewFormField isLoading={isLoading} sm={12} heading="Name" param={defaultValues.name} />
              <ViewFormField isLoading={isLoading} sm={12} heading="Description" param={defaultValues.desc} />
              <ViewFormAudit defaultValues={defaultValues} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{mt:2}}>
        <StyledCardHeader subheader title="Images"/>
        <CardContent>
        <Box
            sx={{my:1, width:'100%'}}
            gap={2}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(3, 1fr)',
              md: 'repeat(5, 1fr)',
              lg: 'repeat(6, 1fr)',
              xl: 'repeat(8, 1fr)',
            }}
          >
            {defaultValues?.images?.map((image, _index) => (
              <GalleryItem isLoading={isLoading} key={image?.id} image={image} 
                onOpenLightbox={()=> handleOpenLightbox(_index)}
                onDownloadFile={()=> handleDownloadFile(image._id, image?.name, image?.extension)}
                onDeleteFile={()=> handleDeleteFile(image._id)}
                toolbar
              />
            ))}

            {itemCategory?.isActive && <ThumbnailDocButton onClick={handleAddItemFile}/>}
          </Box>
        </CardContent>
      </Card>
      <Card sx={{mt:2}}>
        <StyledCardHeader subheader title="Items"/>
        <CardContent>
            Items
        </CardContent>
      </Card>
    </Container>
  );
}
