import { axiosPrivate } from "../api/axios";
import { useEffect, } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();


    useEffect(() => {

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) { // first attempt at accessing data
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                }
                console.log("config", config)
                return config;
            }, (error) => Promise.reject(error)
        );
        
        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                // debug
                const prevRequest = error?.config;
                console.log("error", error?.response?.status)
                if(error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }

    }, [auth, refresh])
    return axiosPrivate;
}

export default useAxiosPrivate;

