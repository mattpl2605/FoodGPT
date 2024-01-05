import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FitnessCalculator from './components/FitnessCalculator';
import ResultsScreen from './components/ResultsScreen'; // Adjust the path as needed
import ResponsiveAppBar from './components/ResponsiveAppBar.js';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#ff0000', // Replace this with your preferred color
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
          margin: '8px', // Example to add margin
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <ResponsiveAppBar /> {/* Include the AppBar */}
          <Routes>
            <Route exact path="/" element={<FitnessCalculator />} />
            <Route path="/results" element={<ResultsScreen />} />
            {/* Additional routes here if needed */}
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
