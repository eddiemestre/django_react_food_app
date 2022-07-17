import { createContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const AuthenticatedContext = createContext({});

export const AuthenticatedProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState({});
    const axiosPrivate = useAxiosPrivate();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        setIsLoading(true)
        console.log("Auth Context use effect")

        const GetUserDetails = async () => {
            try {
                const response = await axiosPrivate.get('/auth/get_user/')
                console.log("in auth context response", response)
                // set auth
                console.log("response data", response.data[0])

                setAuthenticated(prevState => ({
                    ...prevState,
                    "email": response?.data[0]?.email,
                    "username": response?.data[0]?.username,
                    "user_id": response?.data[0]?.id,
                    "name": response?.data[0]?.name
                }))
                // set localstorage
                localStorage.setItem('email', JSON.stringify(response?.data[0]?.email))
                localStorage.setItem('user_id', JSON.stringify(response?.data[0]?.id))
                localStorage.setItem('username', JSON.stringify(response?.data[0]?.username))
                localStorage.setItem('name', JSON.stringify(response?.data[0]?.name))
            }
            catch (err) {
                console.log(err)
                console.log("anonymous user")
                setAuthenticated({})

            } finally {
                setIsLoading(false)
            }
        }

        // if (location.pathname !== "/login" || location.pathname !== "/register") {
        //     GetUserDetails()
        // }
        GetUserDetails()

    }, [])

    return (
        <AuthenticatedContext.Provider value={{ 
            authenticated, setAuthenticated 
        }}>
            {!isLoading && children }
        </AuthenticatedContext.Provider>
    )
}



export default AuthenticatedContext;