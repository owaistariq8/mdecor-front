import { useLayoutEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
// @mui
import { Box, Button, Card, CardContent, Container, Grid } from '@mui/material';
import download from 'downloadjs';
// redux
import { deleteFile, deleteItem, downloadFile, getItem, setItemAddFileDialog } from '../../../redux/slices/settings/item';
// paths
import { PATH_SETTING } from '../../../routes/paths';
// components
import { useSnackbar } from '../../../components/snackbar';
import ViewFormAudit from '../../../components/ViewForms/ViewFormAudit';
import ViewFormField from '../../../components/ViewForms/ViewFormField';
import ViewFormTopBar from '../../../components/ViewForms/ViewFormTopBar';
import PageCover from '../../../components/Defaults/PageCover';
import DialogItemAddFile from '../../../components/Dialog/DialogItemAddFile';
import FormLabel from '../../../components/DocumentForms/FormLabel';
import { GalleryItem } from '../../../components/gallery/GalleryItem';
import { ThumbnailDocButton } from '../../../components/Thumbnails';
import { StyledCardHeader } from '../../../components/settings/styles';

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
      desc: item?.desc || '',
      category:item?.category || '',
      images:item?.images || [],
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

  const regEx = /^[^2]*/;
  const [selectedImage, setSelectedImage] = useState(-1);
  const [slides, setSlides] = useState([]);

  const handleAddItemFile = ()=>{
    dispatch(setItemAddFileDialog(true));
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
      await dispatch(getItem(id))
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
      <PageCover title={item?.name} handleBacklink={handleBacklink} backIcon setting /> 
      <Card sx={{ p: 2 }}>
        <Grid>
          <ViewFormTopBar onEdit={handleEdit} onDelete={onDelete} />
          <Grid container sx={{mt:2}}>
            <ViewFormField isLoading={isLoading} sm={12} heading="Name" param={defaultValues.name} />
            <ViewFormField isLoading={isLoading} sm={12} heading="Description" param={defaultValues.desc} />
            <ViewFormAudit defaultValues={defaultValues} />
          </Grid>
          {/* <Button onClick={handleAddItemFile}>Test</Button> */}
          {/* <FormLabel content='Images' /> */}
          
        </Grid>
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

            {item?.isActive && <ThumbnailDocButton onClick={handleAddItemFile}/>}
          </Box>
        </CardContent>
      </Card>
      <DialogItemAddFile />
    </Container>
  );
}
