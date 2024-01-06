import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { auth } from '../firebase/firebase'; // Adjust the path as needed
import { Box, Typography, Button } from '@mui/material';

const HistoryScreen = () => {
  const [historyData, setHistoryData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const idToken = await auth.currentUser.getIdToken();
        const calculationsResponse = await axios.get('http://127.0.0.1:5000/get-past-calculations', {
          headers: { Authorization: `Bearer ${idToken}` }
        });
        const mealPlansResponse = await axios.get('http://127.0.0.1:5000/get-past-meal-plans-and-recipes', {
          headers: { Authorization: `Bearer ${idToken}` }
        });

        // Combine and set data
        setHistoryData([...calculationsResponse.data, ...mealPlansResponse.data]);
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    };

    if (auth.currentUser) {
      fetchHistory();
    }
  }, []);

  const handleRequestClick = (id) => {
    navigate(`/history/${id}`);
  };

  return (
    <Box sx={{ p: 2 }}>
      {historyData.length === 0 && <Typography>No history data found.</Typography>}
      {historyData.map((item, index) => (
        <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid grey', borderRadius: '4px' }}>
          <Typography variant="h6">Request Timestamp: {item.timestamp}</Typography>
          <Button variant="contained" onClick={() => handleRequestClick(item.id)}>View Details</Button>
        </Box>
      ))}
    </Box>
  );
};

export default HistoryScreen;
