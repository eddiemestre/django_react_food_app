import axios from "../api/axios.js";
import useAuth from "./useAuth.js";
import AuthContext from "../context/AuthProvider.js";
import { useContext, useEffect } from "react";
import AuthenticatedContext from "../context/AuthContext.js";
import useAuthentication from "./useAuthentication.js";

const useRefreshToken = () => {
    const { setAuth, auth } = useAuth();
    const { setAuthenticated } = useAuthentication();
    // const { auth } = useAuth();
    // const myContext = useContext(AuthContext);

    // useEffect(() => {
    //     console.log("refresh", authenticated)
    // }, [])

    const refresh = async () => {

        try {
            const response = await axios.post('/auth/login/refresh/', 
            JSON.stringify({refresh: localStorage.getItem('refresh')}),
            {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true,   // sends cookie to backend
            });

            // console.log("response", response)

            // setAuth(prev => {
            //     console.log("prev", JSON.stringify(prev));
            //     console.log("new", response.data.access);
            //     return { ...prev, accessToken: response.data.access }
            // });

            setAuthenticated(prevState => {
                console.log("prev", JSON.stringify(prevState));
                console.log("new", response.data.access);
                return { ...prevState, accessToken: response.data.access }
            })

            // setAuthenticated(prevState => {
            //     console.log("prev", JSON.stringify(prevState));
            //     console.log("new", response.data.access);
            //     return { ...prevState, accessToken: response.data.access }
            //   })
        
            // console.log("new access", response.data.access)
            // localStorage.setItem("user", JSON.stringify(auth))
            return response.data.access;
        } 
        catch (err) {
            console.log(err)
            console.log("refresh token expired")
            // setAuth({})
            setAuthenticated({})
            // setAuth(() => {})
            // for (const prop of Object.getOwnPropertyNames(authenticated)) {
            //     delete authenticated[prop]
            // }
            localStorage.removeItem('user_id')
            localStorage.removeItem('username')
            localStorage.removeItem('name')
            localStorage.removeItem("refresh")
        }
    }

    return refresh;
} 

export default useRefreshToken;