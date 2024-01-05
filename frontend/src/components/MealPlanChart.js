import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Container
} from '@mui/material';
import { parse } from 'papaparse';

const MealPlanChart = ({ mealPlanCSV }) => {
  if (!mealPlanCSV) {
    return (
      <Container maxWidth="sm">
        <Typography>No meal plan data available</Typography>
      </Container>
    );
  }

  // Parse the CSV data
  const parsedData = parse(mealPlanCSV, { header: true });
  const meals = parsedData.data;

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <TableContainer component={Paper}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', textAlign: 'center', p: 2 }}>
          Your 7-Day Meal Plan
        </Typography>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Day</TableCell>
              <TableCell>Meal</TableCell>
              <TableCell>Calories</TableCell>
              <TableCell>Food</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Carbs</TableCell>
              <TableCell>Fats</TableCell>
              <TableCell>Protein</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {meals.map((meal, index) => (
              <TableRow key={index}>
                <TableCell>{meal.Day}</TableCell>
                <TableCell>{meal.Meal}</TableCell>
                <TableCell>{meal.Calories}</TableCell>
                <TableCell>{meal.Food}</TableCell>
                <TableCell>{meal.Quantity}</TableCell>
                <TableCell>{meal.Carbs}</TableCell>
                <TableCell>{meal.Fats}</TableCell>
                <TableCell>{meal.Protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default MealPlanChart;
