import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const TDEEContainer = ({ data }) => {
  if (!data) return (
    <Container maxWidth="sm">
      <Typography>No data available</Typography>
    </Container>
  );

  // Format BMR and TDEE to two decimal places
  const formattedBMR = data.BMR.toFixed(2);
  const formattedTDEE = data.TDEE.toFixed(2);

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{
        bgcolor: 'background.default',
        p: 4,
        borderRadius: '8px',
        boxShadow: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}>
        <Typography variant="h6" component="div" sx={{ textAlign: 'center', mb: 2, fontWeight: 'bold' }}>
          Your Caloric Information
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body1">BMR:</Typography>
          <Typography variant="body1">{formattedBMR} cal/day</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Typography variant="body1">TDEE:</Typography>
          <Typography variant="body1">{formattedTDEE} cal/day</Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default TDEEContainer;
