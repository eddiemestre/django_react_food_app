import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../../hooks/useRefreshToken.js";
import useAuth from "../../hooks/useAuth.js";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingSetAuth, setIsLoadingSetAuth] = useState(true);
    const refresh = useRefreshToken();
    const { auth, setAuth } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            console.log("in refresh")
            try {
                const accessToken = await refresh();
                return accessToken;
            }
            catch (err) {
                console.error(err);
            }
            finally {
                isMounted && setIsLoading(false);
            }

        }

        const GetAuthedUser = async (access) => {
            try {
              const response = await axiosPrivate.get('/auth/get_user/', {
                headers: {
                  'Authorization': `Bearer ${access}`
                }
              })
             
            //   const username = response?.data[0]?.username
      
              // set in AuthContext
              setAuth(prevState => ({
                ...prevState,
                "username": response?.data[0]?.username,
                "user_id": response?.data[0]?.id,
                "name": response?.data[0]?.name,
                "email": response?.data[0]?.email
              }))
    
              
            //   return username
      
            } catch (err) {
              console.log(err);
            } finally {
                isMounted && setIsLoadingSetAuth(false)
            }
          }

        const FetchUser = async () => {
            const access = await verifyRefreshToken();
            await GetAuthedUser(access);
        }

        const SetLoading = () => {
            setIsLoading(false)
            setIsLoadingSetAuth(false)
        }

        // persist added here AFTER tutorial video
        // Avoids unwanted call to verifyRefreshToken
        !auth?.accessToken ? FetchUser() : SetLoading();

        return () => isMounted = false;
    }, [])

    useEffect(() => {
        // console.log(`isLoading: ${isLoading}`)
        // console.log(`isLoadingAuth: ${isLoadingSetAuth}`)
        // console.log(`aT: ${JSON.stringify(auth?.accessToken)}`)
    }, [isLoading, isLoadingSetAuth])

    return (
        <>
        {isLoading || isLoadingSetAuth
        ? <p>Loading...</p>
        : <Outlet /> }
        </>

    )
}

export default PersistLogin;