import axios from "../api/axios.js";
import useAuth from "./useAuth.js";

const useRefreshToken = () => {
    const { setAuth } = useAuth();
    const { auth } = useAuth();

    const refresh = async () => {

        try {
            const response = await axios.post('/auth/login/refresh/', 
            JSON.stringify({refresh: auth?.refreshToken}),
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
            localStorage.setItem("user", JSON.stringify(auth))
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