import React from 'react';
import { Card, CardContent, Typography, List, ListItem } from '@mui/material';

const RecipeDetailsComponent = ({ title, details }) => {
  const parseSection = (sectionTitles, removeNumbering = false) => {
    for (let sectionTitle of sectionTitles) {
      const sectionStart = details.indexOf(sectionTitle);
      if (sectionStart !== -1) {
        const sectionEnd = details.indexOf('\n\n', sectionStart);
        let sectionContent = sectionEnd === -1 ? details.substring(sectionStart) : details.substring(sectionStart, sectionEnd);

        sectionContent = sectionContent.replace(sectionTitle, '').trim().split('\n');
        return sectionContent.map(line => {
          return removeNumbering ? line.trim().replace(/^\d+\.\s*/, '') : line.trim();
        }).filter(line => line.length > 0);
      }
    }
    return [];
  };

  const ingredients = parseSection(['Ingredients:\n'], true); // Remove numbering from ingredients
  const steps = parseSection(['Steps:\n', 'Recipe:\n', 'Instructions:\n']); // Keep numbering for steps

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
                  <Typography variant="body2">{step}</Typography>
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
