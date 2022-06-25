import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../../hooks/useRefreshToken.js";
import useAuth from "../../hooks/useAuth.js";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { setAuth, auth } = useAuth();

    useEffect(() => {
        // const verifyRefreshToken = async () => {
        //     try {
        //         await refresh();    // sends back access token
        //     }
        //     catch (err) {
        //         console.error(err);
        //     }
        //     finally {
        //         setIsLoading(false);    // prevents endless loading loop
        //     }
        // }

        // // only run this when we lack an access token
        // !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

        const loggedInUser = localStorage.getItem("user")

        // eventually adjust this so only the refresh token is stored in localStorage (and later in httponly cookies)
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser)
            console.log("found user", foundUser)
            setAuth(foundUser)
            console.log(auth)
            setIsLoading(false)
        } else {
            try {
                refresh();
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        }
    }, [])


    useEffect(() => {
        console.log(`isLoading: ${isLoading}`)
        console.log(`aT: ${JSON.stringify(auth?.accessToken)}`)
    }, [isLoading])

    return (
        <>
            {isLoading
                ? <p>Loading...</p>
                : <Outlet/>
            }
        </>
    )
}

export default PersistLogin;