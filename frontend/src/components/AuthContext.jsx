import React,{createContext,useContext,useState} from "react";

const AuthContext=createContext();
export const AuthProvider=({children})=>{
    const [authToken,setAuthToken]=useState("");
    const value={authToken,setAuthToken}
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContext
