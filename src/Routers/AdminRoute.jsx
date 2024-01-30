import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAdmin from "../Hooks/useAdmin";
import { Navigate, useLocation } from "react-router-dom";

const AdminRoute = ({children}) => {
    const {user,loading}=useContext(AuthContext)
    const [isAdmin,isAdminLoading]=useAdmin()
    console.log('adminROute',isAdmin)
    const location=useLocation()
    if (loading || isAdminLoading) {
        return <div className="text-center">loading now......</div>;
    }
    if (user && isAdmin) {
        return children;
    }
    return <Navigate to="/logIn" state={{ from: location }} replace></Navigate>
};

export default AdminRoute;