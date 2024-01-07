import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Login from './components/Login'; 
import FitnessCalculator from './components/FitnessCalculator';
import ResultsScreen from './components/ResultsScreen';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import HistoryScreen from './components/HistoryScreen';
import RequestDetails from './components/HistoryDetails';

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
      <AuthProvider>
        <div className="App">
          <Router>
            <ResponsiveAppBar />
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/fitness-calculator" element={
                <ProtectedRoute>
                  <FitnessCalculator />
                </ProtectedRoute>
              } />
              <Route path="/results" element={
                <ProtectedRoute>
                  <ResultsScreen />
                </ProtectedRoute>
              } />
              <Route path="/history" element={
                <ProtectedRoute>
                  <HistoryScreen />
                </ProtectedRoute>
              } />
              <Route path="/history-details" element={
                <ProtectedRoute>
                  <RequestDetails />
                </ProtectedRoute>
              } />
              {/* Add more routes as needed */}
            </Routes>
          </Router>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
