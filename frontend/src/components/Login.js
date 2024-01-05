import React from 'react';
import { auth, GoogleAuthProvider } from '../firebase/firebase'; // Adjust the path as needed
import { signInWithPopup } from 'firebase/auth';

function Login() {
  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then(result => {
        // Get the user's ID token as it is needed to authenticate with the backend
        result.user.getIdToken().then(idToken => {
          // Send token to your backend via HTTPS
          fetch('http://localhost:5000/secure-action', {
            method: 'POST',
            headers: {
              'Authorization': idToken,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ /* data you want to send */ })
          })
          .then(response => response.json())
          .then(data => {
            console.log("Backend response:", data);
          })
          .catch(error => {
            console.error("Error sending token to backend:", error);
          });
        });
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
