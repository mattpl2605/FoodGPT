import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { auth } from '../firebase/firebase'; // Adjust the path as needed
import { Box, Typography, Button } from '@mui/material';

const HistoryScreen = () => {
  const [historyData, setHistoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      if (!auth.currentUser) {
        setLoading(false);
        return;
      }
      try {
        const idToken = await auth.currentUser.getIdToken(true);
        const response = await axios.get('http://127.0.0.1:5000/get-history-details', {
          headers: { Authorization: `Bearer ${idToken}` }
        });
        setHistoryData(response.data);
      } catch (err) {
        setError('Error fetching history data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const handleRequestClick = (item) => {
    navigate('/history-details', { state: { item } });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!historyData) return <div>No history data found.</div>;

  return (
    <Box sx={{ p: 2 }}>
      {historyData.calculations.map((calculation, index) => (
        <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid grey', borderRadius: '4px' }}>
          <Typography variant="h6">Calculation Timestamp: {calculation.timestamp}</Typography>
          <Button variant="contained" onClick={() => handleRequestClick(calculation)}>View Calculation Details</Button>
        </Box>
      ))}
      {historyData.meal_plans.map((mealPlan, index) => (
        <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid grey', borderRadius: '4px' }}>
          <Typography variant="h6">Meal Plan Timestamp: {mealPlan.timestamp}</Typography>
          <Button variant="contained" onClick={() => handleRequestClick(mealPlan)}>View Meal Plan Details</Button>
        </Box>
      ))}
    </Box>
  );
};

export default HistoryScreen;