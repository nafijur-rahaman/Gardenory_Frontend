import React, { useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from '../firebase/firebase.config';
const AuthProvider = ({children}) => {

    const provider = new GoogleAuthProvider();
    const [user, setUser] = useState(null);

        const RegisterUser = (email,pass)=>{

            return createUserWithEmailAndPassword(auth,email,pass);
            
        }

        const updateUserProfile = (name, photo) => {
            return updateProfile(auth.currentUser, {
              displayName: name,
              photoURL: photo,
            });
          };

        const loginWithGoogle = ()=>{
            return signInWithPopup(auth, provider);
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
        updateUserProfile,
        loginWithGoogle,
        LogoutUser
    }

    return (

           <AuthContext value={authInfo} >
             {children}
           </AuthContext>
    );
};

export default AuthProvider;