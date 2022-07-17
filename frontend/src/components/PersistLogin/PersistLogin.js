import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import useRefreshToken from "../../hooks/useRefreshToken.js";
import useAuth from "../../hooks/useAuth.js";
import AuthenticatedContext from "../../context/AuthContext.js";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { setAuth, auth } = useAuth();
    const { authenticated, setAuthenticated } = useContext(AuthenticatedContext)

    useEffect(() => {
        const verifyRefreshToken = async () => {
            console.log("getting new access token")
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
        // !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
        !authenticated?.accessToken ? verifyRefreshToken() : setIsLoading(false) 
        
    }, [])


    useEffect(() => {
        console.log(`isLoading: ${isLoading}`)
        // console.log(`aT: ${JSON.stringify(auth?.accessToken)}`)
        console.log(`aT: ${JSON.stringify(authenticated?.accessToken)} `)
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