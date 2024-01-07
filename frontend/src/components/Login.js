import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { Container, Typography, Button, Box } from '@mui/material';

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigate('/fitness-calculator');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    
    signInWithPopup(auth, provider)
      .then(async result => {
        // Redirect is handled by the onAuthStateChanged listener
      })
      .catch(error => {
        console.error("Error signing in with Google:", error);
      });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Box sx={{
        bgcolor: 'background.default',
        p: 4,
        borderRadius: '8px',
        boxShadow: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}>
        <Typography variant="h6" component="div" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold' }}>
          Welcome to FoodGPT!
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, textAlign: 'center' }}>
          FoodGPT harnesses the power of ChatGPT 3.5 to give you the best meal plan according to your total daily energy expenditure and your goals in the gym, but most importantly, FoodGPT will take into account your personal preferences so you can enjoy the food you're craving to eat while being healthy!
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" color="primary" onClick={handleGoogleLogin}>
            Sign in with Google
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
