import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { Container, Typography, Box } from '@mui/material';

const MacrosPieChart = ({ macros }) => {
  if (!macros || !macros.protein_grams || !macros.carbs_grams || !macros.fat_grams) {
    return (
      <Container maxWidth="sm">
        <Typography>No macros data available</Typography>
      </Container>
    );
  }

  const pieChartData = [
    { title: 'Protein', value: macros.protein_grams, color: '#E38627' },
    { title: 'Carbs', value: macros.carbs_grams, color: '#C13C37' },
    { title: 'Fat', value: macros.fat_grams, color: '#6A2135' },
  ];

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
        <Typography variant="h6" component="div" sx={{ textAlign: 'center', fontWeight: 'bold', mb: 2 }}>
          Your Macro Split
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
          <PieChart
            data={pieChartData}
            label={({ dataEntry }) => `${dataEntry.title}: ${dataEntry.value.toFixed(1)}g`}
            labelStyle={(index) => ({
              fill: pieChartData[index].color,
              fontSize: '8px',
              fontFamily: 'sans-serif',
            })}
            radius={42}
            labelPosition={112}
            style={{ height: '200px' }}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default MacrosPieChart;
