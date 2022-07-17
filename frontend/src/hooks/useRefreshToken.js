import axios from "../api/axios.js";
import useAuth from "./useAuth.js";
import AuthContext from "../context/AuthProvider.js";
import { useContext, useEffect } from "react";
import AuthenticatedContext from "../context/AuthContext.js";
import useAuthentication from "./useAuthentication.js";

const useRefreshToken = () => {
    const { setAuth, auth } = useAuth();
    const { setAuthenticated } = useAuthentication();


    const refresh = async () => {

            const response = await axios.post('/auth/login/refresh/', 
            JSON.stringify({refresh: localStorage.getItem('refresh')}),
            {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true,   // sends cookie to backend
            });

            setAuthenticated(prevState => {
                console.log("prev", JSON.stringify(prevState));
                console.log("new", response.data.access);
                return { ...prevState, accessToken: response.data.access }
            })
            return response.data.access;

    }

    return refresh;
} 

export default useRefreshToken;