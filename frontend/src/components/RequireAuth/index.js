import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";

const RequireAuth = () => {
    const { auth } = useAuth();
    // const myContext = useContext(AuthContext)

    const location = useLocation();

    return (
        // is the user signed in?
        // send logged in user where ever they wanted to go
        // send unathorized non-users to logic
        auth?.email
        ? <Outlet />
        : <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default RequireAuth;