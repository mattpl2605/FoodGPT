// RecipeComponent.js
import React from 'react';
import { Typography, Container } from '@mui/material';
import RecipeDetailsComponent from './RecipeDetailsComponent'; // Make sure to import the component

const RecipeComponent = ({ recipes }) => {
  if (!recipes) {
    return (
      <Container maxWidth="sm">
        <Typography variant="h6">No recipes available</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      {Object.entries(recipes).map(([recipeName, recipeDetails], index) => (
        <RecipeDetailsComponent
          key={index}
          title={recipeName}
          details={recipeDetails}
        />
      ))}
    </Container>
  );
};

export default RecipeComponent;
