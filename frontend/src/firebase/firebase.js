// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDK61UMTU_rP2aq9l60I3B5Da9O55so6YE",
  authDomain: "foodgpt-20eff.firebaseapp.com",
  projectId: "foodgpt-20eff",
  storageBucket: "foodgpt-20eff.appspot.com",
  messagingSenderId: "382237667031",
  appId: "1:382237667031:web:77e740b16b6cb9e87fca92",
  measurementId: "G-17S60DLQE9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, analytics, auth, GoogleAuthProvider };
