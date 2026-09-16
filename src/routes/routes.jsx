import App from "../App";
import Login from "../auth/login";
import Dashboard from "../pages/Dashboard";

const routes = [

    {
        path: "/",
        element: <App />,
        children: [

            {
                path: "/", 
                element: <Dashboard />,
            },
            {
                path: "/admin_login",
                element: <Login />
            }
        ]
     
    
    }
]

export default routes