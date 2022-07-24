import { useLocation, Navigate, Outlet, useOutletContext } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export const RequireAuthCreate = () => {
    const { toggleReviewOff,
            setReviewModuleActive,
            setInputHasChanged,
            inputHasChanged } = useOutletContext();
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.accessToken
        ? <Outlet context={{ 
            toggleReviewOff,
            setReviewModuleActive,
            setInputHasChanged,
            inputHasChanged }}
        />
        : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export const RequireAuthEdit = () => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.accessToken
        ? <Outlet />
        : <Navigate to="/login" state={{ from: location }} replace />
    );
}