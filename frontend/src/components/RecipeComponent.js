import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

const RecipeComponent = ({ recipes }) => {
  if (!recipes) {
    return <Typography variant="h6">No recipes available</Typography>;
  }

  return (
    <List>
      {Object.entries(recipes).map(([recipeName, recipeDetails], index) => (
        <ListItem key={index} alignItems="flex-start">
          <ListItemText
            primary={recipeName}
            secondary={<Typography component="span" variant="body2" color="textPrimary">{recipeDetails}</Typography>}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default RecipeComponent;
