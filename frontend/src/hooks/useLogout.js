import axios from "../api/axios";
import useAuth from "./useAuth";
import DataContext from "../context/DataContext";
import { useContext } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
    const { setAuth } = useAuth();
    const { setReviews } = useContext(DataContext)
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    const logout = async () => {
        setAuth({})
        setReviews([])
        localStorage.removeItem('name')
        localStorage.removeItem('user_id')
        localStorage.removeItem('username')
        
        try {
            const response = await axiosPrivate.post('/auth/blacklist/', 
            {
                withCredentials: true,   // sends cookie to backend
            });

            console.log(response)
            
        } catch (err) {
            console.log(err);
            navigate('/logout')
        
        }

        
        
    }

    return logout;
}

export default useLogout;