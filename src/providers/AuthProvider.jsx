import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";

export const AuthContext=createContext(null)
const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)
    const googleProvider=new GoogleAuthProvider();
    const axiosPublic=useAxiosPublic()
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }
    const createUser=(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password);
    }
    const  signIn=(email,password)=>{
        setLoading(true)
        return  signInWithEmailAndPassword(auth,email,password);
    }
    const logOut=()=>{
        return signOut(auth);
    }
    const userProfile=(name,photo)=>{
        return updateProfile(auth.currentUser,{
            displayName:name,photoURL:photo
        });
    }
    useEffect(()=>{
const unSubscribe=onAuthStateChanged(auth,currentUser=>{
    setUser(currentUser)
    if (currentUser) {
        //get token and store client
        const userInfo={email:currentUser.email}
        axiosPublic.post('/jwt',userInfo)
        .then((res)=>{
            if (res.data.token) {
                console.log('resData',res.data?.token)
                localStorage.setItem('access-token',res.data.token)
                setLoading(false)
            }
        })
    } else {
        localStorage.removeItem('access-token')
    }
    
    console.log('current user',currentUser)
    setLoading(false)
})
return ()=>{
    return unSubscribe();
};
    },[axiosPublic])
    const authInfo={
        user,loading,createUser,signIn,logOut,userProfile,googleSignIn
    }
    return (
        <AuthContext.Provider  value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;