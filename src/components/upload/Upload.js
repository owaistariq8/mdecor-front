import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
// @mui
import { Box, Stack, Button, IconButton, Typography, Grid } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
// assets
import { UploadIllustration } from '../../assets/illustrations';
//
import Iconify from '../iconify';
//
import RejectionFiles from './errors/RejectionFiles';
import MultiFilePreview from './preview/MultiFilePreview';
import SingleFilePreview from './preview/SingleFilePreview';
import AllowedExtensionsMenuePopover from './AllowedExtensionsMenuePopover';
// import FormatsChip from '../../pages/components/Defaults/FormatsChip';
import {
  allowedImageExtensions,
  allowedDocumentExtensions,
} from '../../constants/file-constants';
// ----------------------------------------------------------------------

const StyledDropZone = styled('div')(({ theme }) => ({
  outline: 'none',
  cursor: 'pointer',
  overflow: 'hidden',
  position: 'relative',
  padding: theme.spacing(5),
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create('padding'),
  backgroundColor: theme.palette.background.neutral,
  height: 'auto',
  border: `1px solid ${alpha(theme.palette.grey[500], 0.32)}`,
  '&:hover': {
    opacity: 0.72,
  },
}));

// ----------------------------------------------------------------------

Upload.propTypes = {
  sx: PropTypes.object,
  error: PropTypes.bool,
  files: PropTypes.array,
  file: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  disabled: PropTypes.bool,
  multiple: PropTypes.bool,
  onDelete: PropTypes.func,
  onPreview: PropTypes.func,
  onRemove: PropTypes.func,
  onUpload: PropTypes.func,
  thumbnail: PropTypes.bool,
  rows: PropTypes.bool,
  helperText: PropTypes.node,
  onRemoveAll: PropTypes.func,
  imagesOnly:PropTypes.bool
};

export default function Upload({
  disabled,
  multiple = false,
  error,
  helperText,
  //
  file,
  onDelete,
  onPreview,
  //
  files,
  thumbnail,
  rows,
  onUpload,
  onRemove,
  onRemoveAll,
  imagesOnly,
  sx,
  ...other
}) {
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    multiple,
    disabled,
    ...other,
  });
  const [verifiedAnchorEl, setVerifiedAnchorEl] = useState(null);
  const handleExtensionsPopoverOpen = (event) => {
    setVerifiedAnchorEl(event.currentTarget);
  };

  const handleExtensionsPopoverClose = () => {
    setVerifiedAnchorEl(null);
  };
  const hasFile = !!file && !multiple;

  const hasFiles = files && multiple && files.length > 0;

  const isError = isDragReject || !!error;

  const fileExtension = file?.name?.split('.').pop().toLowerCase();
  
  return (
    <Box sx={{ width: 1, position: 'relative', ...sx }}>
      <StyledDropZone
        {...getRootProps()}
        sx={{
          ...(isDragActive && {
            opacity: 0.42,
            height: '232px',
          }),
          ...(isError && {
            color: 'error.main',
            bgcolor: 'error.lighter',
            borderColor: 'error.light',
          }),
          ...(disabled && {
            opacity: 0.48,
            height: '165px',
            pointerEvents: 'none',
          }),
          ...(hasFile && {
            padding: '8% 0',
            width: '250px',
            height: '165px',
            objectFit: 'cover',
          }),
        }}
      >
        <input {...getInputProps()} />

        <Placeholder
          sx={{
            ...(hasFile && {
              opacity: 0,
            }),
          }}
        />

        {hasFile && <SingleFilePreview file={file} />}
      </StyledDropZone>
        <Typography variant="overline" color='text.disabled' sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', mt:1 }}>
          Allowed Formats:
          <Iconify
            onClick={handleExtensionsPopoverOpen}
            icon="iconamoon:question-mark-circle-bold"
            sx={{ cursor: 'pointer' }}
          />
        </Typography>
      <AllowedExtensionsMenuePopover
        open={verifiedAnchorEl}
        onClose={handleExtensionsPopoverClose}
        imagesOnly={imagesOnly}
      />
      {helperText && helperText}

      <RejectionFiles fileRejections={fileRejections} />

      {hasFile && onDelete && (
        <IconButton
          size="small"
          onClick={onDelete}
          sx={{
            top: 16,
            // right: 16,
            left: 210,
            zIndex: 9,
            height: '160',
            position: 'absolute',
            color: (theme) => alpha(theme.palette.common.white, 0.8),
            bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
            '&:hover': {
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.48),
            },
          }}
        >
          <Iconify icon="eva:close-fill" width={18} />
        </IconButton>
      )}

      {hasFile && onPreview && allowedImageExtensions.includes(fileExtension) && (
        <IconButton
          size="small"
          onClick={onPreview}
          sx={{
            top: 16,
            // right: 56,
            left: 176,
            zIndex: 9,
            height: '150',
            position: 'absolute',
            color: (theme) => alpha(theme.palette.common.white, 0.8),
            bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
            '&:hover': {
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.48),
            },
          }}
        >
          <Iconify icon="icon-park-outline:preview-open" width={18} />
        </IconButton>
      )}

      {hasFile && onPreview && allowedDocumentExtensions.includes(fileExtension) && (
        <IconButton
          size="small"
          sx={{
            top: 80,
            left: 2,
            zIndex: 9,
            position: 'absolute',
            '&:hover': {
              bgcolor: 'transparent',
            },
          }}
        >
          <Iconify
            icon={document.icon[fileExtension]}
            color={document.color[fileExtension]}
            width={60}
            sx={{ p: 1, color: document.color[fileExtension] }}
          />
          <Typography variant="body2" width="170px" sx={{ overflowWrap: 'break-word' }}>
            {file?.name}
          </Typography>
        </IconButton>
      )}

      {hasFiles && (
        <>
          <Box
            sx={{mt:1, width:'100%'}}
            gap={2}
            display={rows ? "" : "grid"}
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(3, 1fr)',
              md: 'repeat(5, 1fr)',
              lg: 'repeat(6, 1fr)',
              xl: 'repeat(8, 1fr)',
            }}
          >
            <MultiFilePreview 
              rows={rows} 
              imagesOnly 
              files={files} 
              thumbnail={thumbnail} 
              onRemove={onRemove} 
            />
          </Box>

          <Stack direction="row" justifyContent="flex-end" spacing={1} sx={{mt:1}}>
            {onRemoveAll && (
              <Button color="error" variant="outlined" onClick={onRemoveAll}>Remove all</Button>
            )}
            
          </Stack>
        </>
      )}
    </Box>
  );
}

// ----------------------------------------------------------------------

Placeholder.propTypes = {
  sx: PropTypes.object,
};

function Placeholder({ sx, ...other }) {
  return (
      <Stack spacing={10} alignItems="center"
        justifyContent="center"
        direction={{ xs: 'column', md: 'row'}}
        sx={{height: '150px', textAlign: { xs: 'center', md: 'left'},...sx}}
        {...other}
      >
        <UploadIllustration sx={{ width: 200 }} />
        <Typography variant='subtitle1' color='text.secondary'>Drop or select files</Typography>
      </Stack>
  );
}
