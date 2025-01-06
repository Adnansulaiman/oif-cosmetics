import axios from "axios";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [loggedIn,setLoggedIn] = useState(!!localStorage.getItem('token'));
    const [userData,setUserData] = useState(null);

    const getUserData = async(token) =>{
        try{
            
            const response = await axios.get(`http://localhost:3000/api/user`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                }
            });
            return response.data
        }catch(err){
            console.log(err)
        }
    }
   

    const login = (token) =>{
        localStorage.setItem('token',token);
        setLoggedIn(true)
    }
    const logout = () =>{
        localStorage.removeItem('token');
        setLoggedIn(false);
    }

    return (
        <AuthContext.Provider value={{loggedIn,setLoggedIn,userData,setUserData,logout,login,getUserData}} >
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth =()=> useContext(AuthContext);