import PropTypes from 'prop-types';
import { useState, memo, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { m, AnimatePresence } from 'framer-motion';
// @mui
import { useTheme } from '@mui/material/styles';
import { Button, ButtonGroup, Card, CardMedia, IconButton, Stack, Typography, TextField, Box, Autocomplete, Grid } from '@mui/material';
// utils
import { fData } from '../../../utils/formatNumber';
import { bgBlur } from '../../../utils/cssStyles';
//
import Iconify from '../../iconify';
import { varFade } from '../../animate';
import FileThumbnail, { fileData } from '../../file-thumbnail';
import Lightbox from '../../lightbox/Lightbox';

// ----------------------------------------------------------------------

MultiFilePreview.propTypes = {
  files: PropTypes.array,
  onRemove: PropTypes.func,
  onPreview: PropTypes.func,
  thumbnail: PropTypes.bool,
  rows: PropTypes.bool,
  sx: PropTypes.object,
};

function MultiFilePreview({ 
  files, 
  onRemove, 
  onPreview,
  thumbnail, 
  rows,
  sx, 
}) {
  
  const theme = useTheme();
  const [slides, setSlides] = useState([]);
  const [selectedFile, setSelectedFile] = useState(-1);

  useLayoutEffect(()=>{
  
    setSlides(files.map((file) => ({src: file?.preview, isLoaded: true })));
  
  },[files])

  

  if (!files?.length) {
    return null;
  }

  const previewHandle = (index) => {
    setSelectedFile(index);
  };
  
  const handleOpenLightbox = async (index) => {
    setSelectedFile(index);
  }
  const FORMAT_IMG_VISIBBLE = ['jpg', 'jpeg', 'gif', 'bmp', 'png', 'svg', 'webp', 'ico', 'jpe',];
        
  return (
    <AnimatePresence initial={false}>
      {files.map(( file , index ) => {
        if(file){
        const { key, name = '', size = 0, displayName, docType } = fileData(file);
        const fileType = file?.type?.split('/').pop()?.toLowerCase();
        const isNotFormatFile = typeof file === 'string';

        if (thumbnail) {
          return (
              <Card key={key || index} sx={{
                      cursor: 'pointer',
                      position: 'relative',
                      display: 'flex',  // Make the card a flex container
                      flexDirection: 'column',  // Stack children vertically
                      alignItems: 'center',  // Center items horizontally
                      justifyContent: 'center',  // Center items vertically
                      '&:hover .button-group': {
                          opacity: 1,
                      },
                      width:'100%',
                      height:180,
                    }}
                >
                  <CardMedia onClick={()=> FORMAT_IMG_VISIBBLE.some(format => fileType.match(format?.toLowerCase())) && previewHandle(index)}>
                    <FileThumbnail imageView file={file} sx={{ position: 'absolute' }} imgSx={{ position: 'absolute' }}/>
                  </CardMedia>
                  <ButtonGroup
                          className="button-group"
                          variant="contained"
                          aria-label="outlined primary button group"
                          sx={{
                              position: 'absolute',
                              top:0,
                              opacity: 0,
                              transition: 'opacity 0.3s ease-in-out',
                              width:'100%'
                          }}
                      >       
                          {FORMAT_IMG_VISIBBLE.some(format => fileType.match(format))  && <Button sx={{width:'50%', borderRadius:0}} onClick={()=>previewHandle(index)}><Iconify icon="carbon:view" /></Button>}
                          <Button sx={{width:FORMAT_IMG_VISIBBLE.some(format => fileType.match(format))?'50%':'100%', borderRadius:0}} color='error' onClick={() => onRemove(file)}><Iconify icon="radix-icons:cross-circled" /></Button>
                      </ButtonGroup>
                      
                      <Stack
                        padding={1}
                        sx={{
                        ...bgBlur({
                            color: theme.palette.grey[900],
                            // opacity:1
                        }),
                        // background:theme.palette.error,
                        width: 1,
                        left: 0,
                        bottom: 0,
                        position: 'absolute',
                        color: 'common.white',
                        textAlign:'center'
                        }}
                    >
                        <Typography variant="body2">
                            {name.length > 14 ? name?.substring(0, 14) : name}
                            {name?.length > 14 ? '...' : null}
                      </Typography>
                    </Stack>
              </Card>
          );
        }
        if(rows)
        {
          return (
          <Stack
            key={key || index}
            component={m.div}
            {...varFade().inUp}
            spacing={2}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              my: 1.5,
              px: 1.5,
              py: 1.25,
              borderRadius: 0.75,
              border:`solid 1px ${ ( docType && displayName?.trim() ) ? theme.palette.divider : theme.palette.error.main}`,
              ...sx,
            }}
          >

          <Stack direction="row" sx={{ width:"100%" }} >
            <FileThumbnail file={file} rows />
          </Stack>
            {onRemove && (
              <IconButton edge="end" size="small" onClick={() => onRemove(file)} sx={{ ml: 5 }}> 
                <Iconify icon="eva:close-fill" />
              </IconButton>
            )}
          </Stack>
        );
        }
        return (
          <Stack
            key={key || index}
            component={m.div}
            {...varFade().inUp}
            spacing={2}
            direction="row"
            alignItems="center"
            sx={{
              my: 1,
              px: 1,
              py: 0.75,
              borderRadius: 0.75,
              border:`solid 1px ${theme.palette.divider}`,
              ...sx,
            }}
          >
            <FileThumbnail file={file} />

            <Stack flexGrow={1} sx={{ minWidth: 0 }}>
              <Typography variant="subtitle2" noWrap>
                {isNotFormatFile ? file : name}
              </Typography>

              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {isNotFormatFile ? '' : fData(size)}
              </Typography>
            </Stack>

            {onRemove && (
              <IconButton edge="end" size="small" onClick={() => onRemove(file)}>
                <Iconify icon="eva:close-fill" />
              </IconButton>
            )}
          </Stack>
        );
      }
      return null;
      })}

      <Lightbox
          index={selectedFile}
          slides={slides}
          open={selectedFile>=0}
          close={() => setSelectedFile(-1)}
          onGetCurrentIndex={(index) => handleOpenLightbox(index)}
          disabledTotal
          disabledDownload
          disabledSlideshow
        />
    </AnimatePresence>
  );
}
export default memo(MultiFilePreview)