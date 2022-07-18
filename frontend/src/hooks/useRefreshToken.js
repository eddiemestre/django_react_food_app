import { axiosPrivate } from "../api/axios.js";
import useAuth from "./useAuth.js";

const useRefreshToken = () => {
    const { setAuth } = useAuth();


    const refresh = async () => {

            const response = await axiosPrivate.post('/auth/refresh/',
            {
                withCredentials: true,   // sends cookie to backend
            });

            setAuth(prevState => {
                console.log("prev", JSON.stringify(prevState));
                console.log("new", response.data.access);
                return { ...prevState, accessToken: response.data.access }
            })
            return response.data.access;

    }

    return refresh;
} 

export default useRefreshToken;