import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase/firebase'; // Adjust the path as needed

function Login() {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    
    signInWithPopup(auth, provider)
      .then(result => {
        // After successful login, navigate to the FitnessCalculator page
        navigate('/fitness-calculator');
      })
      .catch(error => {
        console.error("Error signing in with Google:", error);
      });
  };

  return (
    <div>
      <button onClick={handleGoogleLogin}>Sign in with Google</button>
    </div>
  );
}

export default Login;
