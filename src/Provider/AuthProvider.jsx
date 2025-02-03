import React, { createContext } from 'react';
import { auth } from '../firebase.init';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

    const name = 'Litton Kumar Das';

    const createUser = (email, password) =>{
       return  createUserWithEmailAndPassword(auth, email, password)
    }
    const signInUser = (email,password) =>{
        return signInWithEmailAndPassword(auth,email,password);
    }
    const authInfo = {
        name,
        createUser,
        signInUser
    }
    console.log(authInfo);

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider >
    );
};

export default AuthProvider;