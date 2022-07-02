import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import useRefreshToken from "../../hooks/useRefreshToken.js";
import useAuth from "../../hooks/useAuth.js";
import AuthContext from "../../context/AuthProvider.js";
const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { setAuth, auth } = useAuth();
    // const myContext = useContext(AuthContext)

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();    // sends back access token
            }
            catch (err) {
                console.error(err);
            }
            finally {
                setIsLoading(false);    // prevents endless loading loop
            }
        }

        // only run this when we lack an access token
        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

        // SHOULDN'T WE JUST NEED TO CHECK THE AUTH?
        // const loggedInUser = localStorage.getItem("refresh")
        // const authedUser = auth;

        // // eventually adjust this so only the refresh token is stored in localStorage (and later in httponly cookies)
        
        
        // if (loggedInUser) {
        //     const foundUser = loggedInUser
        //     console.log("found user", foundUser)
        //     // setAuth(foundUser)
        //     console.log(auth)
        //     setIsLoading(false)
        // } else {
        //     try {
        //         refresh();
        //     } catch (err) {
        //         console.error(err);
        //     } finally {
        //         setIsLoading(false);
        //     }
        // }
    }, [])


    useEffect(() => {
        console.log(`isLoading: ${isLoading}`)
        console.log(`aT: ${JSON.stringify(auth?.accessToken)}`)
    }, [isLoading])

    return (
        // <>
        //     {isLoading
        //         ? <p>Loading...</p>
        //         : <Outlet/>
        //     }
        // </>
        <Outlet />
    )
}

export default PersistLogin;