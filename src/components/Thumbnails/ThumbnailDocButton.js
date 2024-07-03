import { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Typography } from '@mui/material';
// styles
import { useTheme } from '@mui/material/styles';
// components
import Iconify from '../iconify/Iconify';
import { StyledTooltip } from '../../theme/styles/default-styles';

ThumbnailDocButton.propTypes = {
  onClick: PropTypes.func,
};

export default function ThumbnailDocButton({ onClick }) {
  const [hovered, setHovered] = useState(false);
  const theme = useTheme();
  return (
    <StyledTooltip title="Upload Image" placement="top">
      <Card 
          sx={{
              cursor: 'pointer',
              position: 'relative',
              display: 'flex',  // Make the card a flex container
              flexDirection: 'column',  // Stack children vertically
              alignItems: 'center',  // Center items horizontally
              justifyContent: 'center',  // Center items vertically
              '&:hover .button-group': {
                  opacity: 1,
              },
              background:theme.palette.grey[300],
              minHeight:170
              
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={onClick}
        >

          <Iconify icon="mage:image-upload" color={theme.palette.grey[hovered?600:500]} width={100} />
      </Card>
    </StyledTooltip>
  );
}
