import App from "../App";
import Login from "../auth/login";
import AdminSettings from "../auth/AdminSettings";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import RegisterNewAdmin from "../auth/RegisterNewAdmin";
import AdminList from "../pages/adminList";

const routes = [

    
    {
        path: "/admin_login",
        element: <Login />
    },

    {
        element: <ProtectedRoute/>,
        children: [

            {
                path: "/", 
                element: <App />,
                children: [
                    {
                        index: true,
                        element: <Dashboard />
                    },
                    {
                        path: "admin_settings",
                        element: <AdminSettings/>
                    },
                    {
                        path: "register_new_admin",
                        element: <RegisterNewAdmin/>
                    },
                    {
                        path: "admin_list",
                        element: <AdminList/>
                    }

                ]
            },
        ]
    
    }
]

export default routes