import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute(){
    
    // Login will store the token after successful authentication
    const token =localStorage.getItem("access-token");

    // console.log("ProtectedRoute token:", token);

    if (!token) {
        return <Navigate to="/admin_login" replace/>;
    }
    
    return <Outlet/>
}

export default ProtectedRoute