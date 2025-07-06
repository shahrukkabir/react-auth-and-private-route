import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBHaCeWCIsNinHEtdSitL_StvjwinFSAXQ",
  authDomain: "react-auth-private-route-73ff6.firebaseapp.com",
  projectId: "react-auth-private-route-73ff6",
  storageBucket: "react-auth-private-route-73ff6.firebasestorage.app",
  messagingSenderId: "399436423708",
  appId: "1:399436423708:web:c129c3bd21a1f9a52335d9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);