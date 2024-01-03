import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FitnessCalculator from './components/FitnessCalculator'; // Make sure this path is correct

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#ff0000', // Replace this with the exact red color from your design
    },
    background: {
      default: '#ffffff', // Assuming a white background for the content area
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        margin: 'normal',
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          // Use a callback function to correctly reference 'theme' from the parameters
          '&': ({ theme }) => ({
            margin: theme.spacing(1), // Correct usage of theme.spacing
          }),
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <FitnessCalculator/>
      </div>
    </ThemeProvider>
  );
}

export default App;
