// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeuCHi8HMej8NVeTdruwh2JTx3G3ZupBk",
  authDomain: "react-auth-85824.firebaseapp.com",
  projectId: "react-auth-85824",
  storageBucket: "react-auth-85824.firebasestorage.app",
  messagingSenderId: "124849930042",
  appId: "1:124849930042:web:d07caa2792da3729e45a03"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);