"use client"
import { createContext,useState,useContext,useEffect } from "react";
import { onAuthStateChanged,signOut as authSignOut } from "firebase/auth";
import { auth } from "./firebase";

const AuthUserContext=createContext({
    authUser:null,
    isLoading:true,
})

export default function useFirebaseAuth(){
    const [authUser,setAuthUser] = useState(null);
    const [isLoading,setLoading]=useState(true)
    
    const clear=()=>{
        setAuthUser(null);
        setLoading(false)
    }

    const authStateChange=async(user)=>{
        setLoading(true)
        if(!user){
            clear();
            return 
        }
        setAuthUser({
            uid:user.uid,
            email:user.email,
            username:user.displayName,
        });
        setLoading(false)
    }
    const signOut = () => {
        authSignOut(auth).then(() => clear());
    };
    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,authStateChange);
        return ()=>unsubscribe();
    },[]);
    return {
        authUser,
        isLoading,
        signOut,
        setAuthUser
    }

}
export const AuthUserProvider =({children})=>{
    const auth=useFirebaseAuth();
    return(
        <AuthUserContext.Provider value={auth}>
            {children}
        </AuthUserContext.Provider>
    )
}
export const useAuth=()=>useContext(AuthUserContext)