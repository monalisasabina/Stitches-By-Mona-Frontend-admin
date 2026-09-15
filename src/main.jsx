import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ReactDOM from "react-dom/client"
import routes from  './routes/routes.jsx'

const router = createBrowserRouter(routes, {
    future: {
         v7_startTransition: true,
         v7_relativeSplatPath: true,
    }
})

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
