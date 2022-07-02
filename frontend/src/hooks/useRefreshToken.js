import axios from "../api/axios.js";
import useAuth from "./useAuth.js";
import AuthContext from "../context/AuthProvider.js";
import { useContext } from "react";

const useRefreshToken = () => {
    const { setAuth, auth } = useAuth();
    // const { auth } = useAuth();
    // const myContext = useContext(AuthContext);

    const refresh = async () => {

        try {
            const response = await axios.post('/auth/login/refresh/', 
            JSON.stringify({refresh: localStorage.getItem('refresh')}),
            {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true,   // sends cookie to backend
            });

            console.log("response", response)

            setAuth(prev => {
                console.log("prev", JSON.stringify(prev));
                console.log("new", response.data.access);
                return { ...prev, accessToken: response.data.access }
            });
            console.log("new access", response.data.access)
            // localStorage.setItem("user", JSON.stringify(auth))
            return response.data.access;
        } catch (err) {
            console.log(err)
            console.log("refresh token expired")
            setAuth({})
            localStorage.removeItem('user');
        }
    }

    return refresh;
} 

export default useRefreshToken;