import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [loggedIn,setLoggedIn] = useState(!!localStorage.getItem('token'));
    const [userData,setUserData] = useState(null);

    // useEffect(()=>{
    //     const getUserData = async(token) =>{
    //         try{
    //             if(token){
    //                 // console.log(token)
    //                 const response = await axios.get(`http://localhost:3000/api/user`, {
    //                     headers: {
    //                       Authorization: `Bearer ${token}`,
    //                     }
    //                 });
    //                 // console.log(response.data)
    //                  setUserData(response.data.user);
    //             }
    //             return null
    //         }catch(err){
    //             console.log(err)
    //         }
    //     }
    //     getUserData();
    // },[userData])
    const getUserData = async(token) =>{
        try{
            if(token){
                // console.log(token)
                const response = await axios.get(`http://localhost:3000/api/user`, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    }
                });
                // console.log(response.data)
                return response.data.user;
            }
            return null
        }catch(err){
            console.log(err)
        }
    }
   

    const login = (token) =>{
        localStorage.setItem('token',token);
        setLoggedIn(true)
        // Fetch user data after login
        getUserData(token).then((user) => {
            setUserData(user); // Set user data once fetched
        });
    }
    const logout = () =>{
        localStorage.removeItem('token');
        setLoggedIn(false);
        setUserData(null)
    }

    // Automatically fetch user data if logged in on initial load
    useEffect(() => {
        if (loggedIn) {
        const token = localStorage.getItem("token");
        getUserData(token).then((user) => {
            setUserData(user); // Set user data when the app loads if logged in
        });
        }
    }, [loggedIn]);

    return (
        <AuthContext.Provider value={{loggedIn,setLoggedIn,userData,setUserData,logout,login,getUserData}} >
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth =()=> useContext(AuthContext);