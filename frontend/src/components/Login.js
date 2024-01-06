import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase/firebase'; // Adjust the path as needed

function Login() {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    
    signInWithPopup(auth, provider)
      .then(async result => {
        // Retrieve the ID token
        const idToken = await result.user.getIdToken();
        console.log(idToken)

        // You can now use this ID token to authenticate requests to your backend
        // Example: Send ID token to your backend via HTTPS

        // After successful login and handling token, navigate to the FitnessCalculator page
        navigate('/fitness-calculator');
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
