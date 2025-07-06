// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHaCeWCIsNinHEtdSitL_StvjwinFSAXQ",
  authDomain: "react-auth-private-route-73ff6.firebaseapp.com",
  projectId: "react-auth-private-route-73ff6",
  storageBucket: "react-auth-private-route-73ff6.firebasestorage.app",
  messagingSenderId: "399436423708",
  appId: "1:399436423708:web:c129c3bd21a1f9a52335d9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);