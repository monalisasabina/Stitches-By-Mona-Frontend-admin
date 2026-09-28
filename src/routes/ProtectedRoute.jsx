import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute(){

    // state: check session
    const [checkingSession, setCheckingSession ] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);


    useEffect(() => {

        const CheckSession =async () => {

                // Login will store the token after successful authentication
                const token =localStorage.getItem("access-token");

                // console.log("ProtectedRoute token:", token);

                if (!token) {

                    setCheckingSession(false);
                    return;
                }

                try {

                    const response = await fetch(
                        `${import.meta.env.VITE_STITCHES_API_URL}/auth/admin/check-session`,
                        {
                            method: "GET",
                            headers: {
                                "Authorization" : `Bearer ${token}`
                            }
                        }
                    );

                    if (response.ok){
                        setAuthenticated(true);
                    } else if (response.status === 401){

                        localStorage.removeItem("access-token");
                        localStorage.removeItem("admin-id");
                    }
                } catch (error){
                    console.error("Unable to check session", error)
                } finally {
                    setCheckingSession(false);
                }

        };
         CheckSession();

    }, []);

    // wait while flask checks session
    if (checkingSession) {
        return <p>Checking session...</p>
    }

    if (!authenticated){
        return <Navigate to="/admin_login" replace /> 
    }
    
    // valid session
    return <Outlet/>
}

export default ProtectedRoute