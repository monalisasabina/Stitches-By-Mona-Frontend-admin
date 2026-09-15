import App from "../App";
import Dashboard from "../pages/Dashboard";

const routes = [

    {
        path: "/",
        element: <App />,
        children: [

            {
                path: "/", 
                element: <Dashboard />,
            }
        ]
     
    
    }
]

export default routes