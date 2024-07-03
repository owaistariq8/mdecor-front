import PropTypes from 'prop-types';
import React from 'react';
import { Grid, Chip } from '@mui/material';
import { allowedDocumentExtensions, allowedImageExtensions } from '../../constants/file-constants';

FormatsChip.propTypes = {
  imagesOnly: PropTypes.bool
};

export default function FormatsChip({imagesOnly}) {
  return (
    <>
      {imagesOnly?(
        allowedImageExtensions.map((ext, index) => (
          <Grid display="inline-flex" p={0.1}>
            <Chip
              key={index}
              label={ext}
              size="small"
              sx={{color: 'primary.main', cursor:'default'}}
            />
          </Grid>
        ))
      ):(
        allowedDocumentExtensions.map((ext, index) => (
          <Grid display="inline-flex" p={0.1}>
            <Chip
              key={index}
              label={ext}
              size="small"
              sx={{color: 'primary.main', cursor:'default'}}
            />
          </Grid>
        ))
      ) }
    </>
  );
}
