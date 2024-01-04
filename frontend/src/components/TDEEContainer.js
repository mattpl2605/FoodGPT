import React from 'react';
import { Box, Typography } from '@mui/material';

const TDEEContainer = ({ data }) => {
  if (!data) return <Typography>No data available</Typography>;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2, border: '1px solid grey', borderRadius: '8px', padding: 2 }}>
      <Typography variant="h6">Your TDEE Information:</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body1">BMR:</Typography>
        <Typography variant="body1">{data.BMR} kcal/day</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body1">TDEE:</Typography>
        <Typography variant="body1">{data.TDEE} kcal/day</Typography>
      </Box>
    </Box>
  );
};

export default TDEEContainer;
