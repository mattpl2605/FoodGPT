import React, { useState } from 'react';
import axios from 'axios';
import { auth } from '../firebase/firebase'; // Importing auth from your firebase configuration
import { Container, TextField, Radio, RadioGroup, FormControlLabel, FormLabel, Button, Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const FitnessCalculator = () => {
  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    age: '',
    gender: '',
    activity_level: '',
    goal: '',
    preferences: '',
    allergies: ''
  });

  const navigate = useNavigate();

  const [tdeeData, setTdeeData] = useState(null);
  const [mealPlanData, setMealPlanData] = useState(null);

  const getIdToken = async () => {
    if (auth.currentUser) {
      return await auth.currentUser.getIdToken();
    } else {
      throw new Error('User not authenticated');
    }
  };

  const calculateTDEEAndMacros = async () => {
    try {
      const idToken = await getIdToken();
      const response = await axios.post('http://127.0.0.1:5000/calculate', formData, {
        headers: {
          'Authorization': idToken,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error in calculateTDEEAndMacros:', error);
      return null;
    }
  };

  const generateMealPlanAndRecipes = async () => {
    try {
      const idToken = await getIdToken();
      const response = await axios.post('http://127.0.0.1:5000/generate-meal-plan-and-recipes', formData, {
        headers: {
          'Authorization': idToken,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error in generateMealPlanAndRecipes:', error);
      return null;
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Submitting Form');
    
    const tdeeResponse = await calculateTDEEAndMacros();
    const mealPlanResponse = await generateMealPlanAndRecipes();
  
    if (tdeeResponse && mealPlanResponse) {
      setTdeeData(tdeeResponse);
      setMealPlanData(mealPlanResponse);
      console.log('Navigating to /results');
      navigate('/results', { state: { tdeeData: tdeeResponse, mealPlanData: mealPlanResponse } });
    } else {
      console.error("Failed to fetch data");
    }
  };


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
        <TextField fullWidth label="Age" type="number" name="age" value={formData.age} onChange={handleInputChange} />
        <RadioGroup row name="gender" value={formData.gender} onChange={handleInputChange}>
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
        </RadioGroup>
        <TextField fullWidth label="Height (cm)" type="number" name="height" value={formData.height} onChange={handleInputChange} />
        <TextField fullWidth label="Weight (kg)" type="number" name="weight" value={formData.weight} onChange={handleInputChange} />
        
        <FormControl fullWidth>
          <InputLabel id="activity-level-label">Activity Level</InputLabel>
          <Select
            labelId="activity-level-label"
            id="activity-level"
            name="activity_level"
            value={formData.activity_level}
            label="Activity Level"
            onChange={handleInputChange}
          >
            <MenuItem value="sedentary">Sedentary</MenuItem>
            <MenuItem value="lightly active">Lightly Active</MenuItem>
            <MenuItem value="moderately active">Moderately Active</MenuItem>
            <MenuItem value="very active">Very Active</MenuItem>
            <MenuItem value="extra active">Extra Active</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="goal-label">Goal</InputLabel>
          <Select
            labelId="goal-label"
            id="goal"
            name="goal"
            value={formData.goal}
            label="Goal"
            onChange={handleInputChange}
          >
            <MenuItem value="lose weight">Lose Weight</MenuItem>
            <MenuItem value="maintain weight">Maintain Weight</MenuItem>
            <MenuItem value="gain muscle">Gain Muscle</MenuItem>
          </Select>
        </FormControl>

        <TextField fullWidth label="Food Preferences" name="preferences" value={formData.preferences} onChange={handleInputChange} />
        <TextField fullWidth label="Allergies" name="allergies" value={formData.allergies} onChange={handleInputChange} />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>Next</Button>
        </Box>
      </Box>
    </Container>
  );
};

export default FitnessCalculator;
