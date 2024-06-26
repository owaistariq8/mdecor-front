import React, { memo} from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import { StyledTooltip } from '../../theme/styles/default-styles';
import Iconify from '../iconify';

function HistoryDropDownUpIcons({ showTitle, hideTitle, activeIndex, indexValue, onClick }) {

  const theme = createTheme({
                              palette: { success: green },
                            });

  return (
    <Grid sx={{display: 'flex', ml:'auto'}}>
      <StyledTooltip
        arrow
        title={activeIndex === indexValue ? hideTitle : showTitle }
        placement='top'
        tooltipcolor={theme.palette.primary.main}
      >
        <Iconify icon={activeIndex === indexValue ? "eva:arrow-ios-upward-fill" : "eva:arrow-ios-downward-fill" } 
          sx={{ml:'auto',mt:'auto',cursor: 'pointer'}}
          onClick={() => onClick(indexValue) }
        />
      </StyledTooltip>
    </Grid>
  );
}

HistoryDropDownUpIcons.propTypes = {
  showTitle: PropTypes.string,
  hideTitle: PropTypes.string,
  activeIndex: PropTypes.string,
  indexValue: PropTypes.string,
  onClick: PropTypes.func,
};
export default memo(HistoryDropDownUpIcons)