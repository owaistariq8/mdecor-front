import { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Typography } from '@mui/material';
// styles
import { useTheme } from '@mui/material/styles';
// components
import Iconify from '../iconify/Iconify';

ThumbnailDocButton.propTypes = {
  onClick: PropTypes.func,
};

export default function ThumbnailDocButton({ onClick }) {
  const [hovered, setHovered] = useState(false);
  const theme = useTheme();
  return (
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
            background:theme.palette.grey[hovered?100:400],
            minHeight:150
            
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={onClick}
    >

        <Iconify icon="mdi:plus" color={theme.palette.grey[hovered?900:600]} width={50} />
        <Typography variant="subtitle2" color={theme.palette.grey[hovered?900:600]}>Add / Upload File</Typography>
    </Card>
  );
}
