import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import useRefreshToken from "../../hooks/useRefreshToken.js";
import useAuth from "../../hooks/useAuth.js";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refresh();    // sends back access token
            }
            catch (err) {
                console.error(err);
            }
            finally {
                isMounted && setIsLoading(false);    // prevents endless loading loop
            }
        }

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false) 
    
        return () => isMounted = false;
        
    }, [])


    useEffect(() => {
        console.log(`isLoading: ${isLoading}`)
        console.log(`aT: ${JSON.stringify(auth?.accessToken)} `)
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