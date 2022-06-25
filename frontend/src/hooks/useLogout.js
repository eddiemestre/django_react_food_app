import axios from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
    const { auth, setAuth } = useAuth();

    const logout = async () => {
        try {
            const response = await axios.post('/auth/logout/', 
            {
                headers: {'Authorization': `Bearer ${auth?.accessToken}`},
                withCredentials: true,   // sends cookie to backend
            });
    
            console.log(response.data)
        } catch (err) {
            console.log(err);
        }

        console.log("in logout");
        setAuth({});
        localStorage.removeItem('user');
    }

    return logout;
}

export default useLogout;