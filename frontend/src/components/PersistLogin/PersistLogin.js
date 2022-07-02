import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import useRefreshToken from "../../hooks/useRefreshToken.js";
import useAuth from "../../hooks/useAuth.js";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { setAuth, auth } = useAuth();

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