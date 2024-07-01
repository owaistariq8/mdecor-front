import PropTypes from 'prop-types';
import { Card, Box } from '@mui/material';
import Chart, { useChart } from '../chart';
import { StyledBg } from '../../theme/styles/default-styles';
import { StyledCardHeader } from '../settings/styles';

// ----------------------------------------------------------------------

ProductionLog.propTypes = {
  chart: PropTypes.object,
  title: PropTypes.string,
  subheader: PropTypes.func,
};

export default function ProductionLog({ title, subheader, chart, ...other }) {
  const { colors, categories, series, options } = chart;

  const chartOptions = useChart({
    colors,
    xaxis: {
      categories,
    },
    ...options,
  });

  return (
    <Card {...other}>
      <StyledCardHeader title={title} subheader={subheader} />
      {series.map((item) => (
        <Box key={item.day} sx={{ mx:1, maxHeight:'410px'}} dir="ltr">          
          <Chart type="line" series={item.data} options={chartOptions} height={400} />
        </Box>
      ))}
      <StyledBg />
    </Card>
  );
}
