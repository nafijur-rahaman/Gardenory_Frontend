import React, { useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from '../firebase/firebase.config';
const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);

        const RegisterUser = (email,pass)=>{

            return createUserWithEmailAndPassword(auth,email,pass);
        }
        
        const LoginUser = (email,pass)=>{
            return signInWithEmailAndPassword(auth,email,pass);
        }

        const LogoutUser = ()=>{
            return signOut(auth);
        }

        useEffect(()=>{
            const unSubscribe = onAuthStateChanged(auth, currentUser=>{
                setUser(currentUser)
            })
            return ()=> unSubscribe();
        },[])

    const authInfo = {
        user,
        RegisterUser,
        LoginUser,
        LogoutUser
    }

    return (

           <AuthContext value={authInfo} >
             {children}
           </AuthContext>
    );
};

export default AuthProvider;