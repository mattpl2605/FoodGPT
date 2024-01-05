// RecipeDetailsComponent.js
import React from 'react';
import { Card, CardContent, Typography, List, ListItem } from '@mui/material';

const RecipeDetailsComponent = ({ title, details }) => {
  const parseSection = (sectionTitle) => {
    const startIndex = details.indexOf(sectionTitle);
    if (startIndex === -1) {
      return [];
    }
    const endIndex = details.indexOf('\n\n', startIndex);
    const sectionContent = endIndex === -1 ? details.slice(startIndex) : details.slice(startIndex, endIndex);
    return sectionContent
      .split('\n')
      .slice(1) // Remove the section title
      .map(line => line.trim().replace(/^\d+\.\s*/, '')); // Remove numbering
  };

  const ingredients = parseSection('Ingredients:');
  const steps = parseSection('Steps:');

  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', marginBottom: 2, textAlign: 'center' }}>
          {title}
        </Typography>
        {ingredients.length > 0 && (
          <>
            <Typography variant="subtitle1">Ingredients:</Typography>
            <List dense>
              {ingredients.map((ingredient, index) => (
                <ListItem key={index}>
                  <Typography variant="body2">{ingredient}</Typography>
                </ListItem>
              ))}
            </List>
          </>
        )}
        {steps.length > 0 && (
          <>
            <Typography variant="subtitle1" sx={{ marginTop: 2 }}>Steps:</Typography>
            <List dense>
              {steps.map((step, index) => (
                <ListItem key={index}>
                  <Typography variant="body2">{`${index + 1}. ${step}`}</Typography>
                </ListItem>
              ))}
            </List>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default RecipeDetailsComponent;
