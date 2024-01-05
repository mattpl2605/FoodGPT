import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Login from './components/Login'; // Make sure the path to Login.js is correct
import FitnessCalculator from './components/FitnessCalculator';
import ResultsScreen from './components/ResultsScreen';
import ResponsiveAppBar from './components/ResponsiveAppBar.js';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#ff0000',
    },
    background: {
      default: '#ffffff',
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
          margin: '8px',
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
          <ResponsiveAppBar />
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/fitness-calculator" element={<FitnessCalculator />} />
            <Route path="/results" element={<ResultsScreen />} />
            {/* Add more routes as needed */}
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
