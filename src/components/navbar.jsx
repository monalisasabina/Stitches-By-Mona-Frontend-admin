import { NavLink , useNavigate } from "react-router-dom"

function NavBar(){

    const navigate = useNavigate();


    // LOGGING OUT
    async function handleLogout(){

          const token = localStorage.getItem('access-token');

          try{
            const response = await fetch( `${import.meta.env.VITE_STITCHES_API_URL}/auth/admin/logout`,{
                 method: 'POST',
                 headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                 }
              })
            

            if (response.ok){
              console.log("Successfully logged out from server");
            }else {
              console.warn("Server logout failed");
            }
        
          } catch(error){
             console.error("Error during logout:", error)
          }

          localStorage.removeItem('access-token');
          localStorage.removeItem('user');
          navigate("/admin_login")
     };

    return(

        <div className="navbar_cont">

            <div className="navbar_links">

                <NavLink to="/">Dashboard</NavLink>
                <NavLink to="/admin_settings">Admin Settings</NavLink>
                <button onClick={handleLogout}>Logout</button>
                
            </div>

        </div>
    )
}

export default NavBar