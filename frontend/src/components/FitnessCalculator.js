// BMICalculator.js

import React from 'react';
import { Container, TextField, Radio, RadioGroup, FormControlLabel, FormLabel, Button, Box } from '@mui/material';

const FitnessCalculator = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Box sx={{
        bgcolor: 'background.default',
        p: 4,
        borderRadius: '8px',
        boxShadow: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}>
        <FormLabel component="legend" sx={{ mb: 2, fontWeight: 'bold' }}>Making your Food Plan</FormLabel>
        <TextField fullWidth label="Age" type="number" />
        <RadioGroup row>
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
        </RadioGroup>
        <TextField fullWidth label="Height (cm)" type="number" />
        <TextField fullWidth label="Weight (kg)" type="number" />
        <TextField fullWidth label="Food Preferences" />
        <TextField fullWidth label="Allergies" />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button variant="contained" color="primary">Next</Button>
        </Box>
      </Box>
    </Container>
  );
};

export default FitnessCalculator;
