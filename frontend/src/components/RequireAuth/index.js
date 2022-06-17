import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = () => {
    const { auth } = useAuth();
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