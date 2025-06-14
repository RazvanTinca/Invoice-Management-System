import { useLocation, Navigate, Outlet } from "react-router";
import {useSelector} from "react-redux";
import type {RootState} from "../../state/store.ts";

interface RequireAuthProps {
    allowedRoles?: string[];
}

const RequireAuth = ({ allowedRoles } : RequireAuthProps) => {
    const auth = useSelector((state: RootState) => state.auth);
    const location = useLocation();

    if (!allowedRoles) {
        return (
            auth?.email ? <Outlet/> : <Navigate to="/login" state={{ from: location }} replace />
        )
    }
}

export default RequireAuth;