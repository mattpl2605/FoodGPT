import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase/firebase'; // Adjust the path as needed

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        // If the user is already signed in, redirect to the Fitness Calculator page
        navigate('/fitness-calculator');
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [navigate]);

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    
    signInWithPopup(auth, provider)
      .then(async result => {
        // After successful login, the onAuthStateChanged listener will handle the redirect
      })
      .catch(error => {
        console.error("Error signing in with Google:", error);
        // Optionally, update the UI to reflect the error
      });
  };

  return (
    <div>
      <button onClick={handleGoogleLogin}>Sign in with Google</button>
    </div>
  );
}

export default Login;
