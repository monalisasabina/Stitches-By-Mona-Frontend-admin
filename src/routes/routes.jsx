import App from "../App";
import Login from "../auth/login";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";

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
                    }
                ]
            },
        ]
    
    }
]

export default routes