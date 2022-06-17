import axios from "../api/axios";
import useAuth from "./useAuth.js";

const useRefreshToken = () => {
    const { setAuth } = useAuth();
    const { auth } = useAuth();
    console.log("use refresh", auth?.refreshToken)

    const refresh = async () => {
        const response = await axios.post('/auth/login/refresh/', 
        JSON.stringify({refresh:auth?.refreshToken}),
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
        return response.data.access;
    }

    return refresh;
} 

export default useRefreshToken;