import { useEffect, useState } from "react";

function Dashboard() {

  const [firstName, setFirstName] = useState([]);
  const [lastName, setLastName] = useState([]);
  const [error, setError] = useState("");

  // Fetching Data
     useEffect(() =>{

   
         const getAdmins = async () => {
 
             try{
 
                 const token = localStorage.getItem("access-token")
                 // console.log(token)
                 
                 setError("");

 
                 const response = await fetch (
                     `${import.meta.env.VITE_STITCHES_API_URL}/auth/admin/profile`,
                     {
                         method: "GET",
                         headers: {
                             "Authorization": `Bearer ${token}`
                         },
                     }
                 );
 
                 const data = await response.json();
                //  console.log(data)
                 setFirstName(data)
                 setLastName(data)
                
                 if (!response.ok){
                     setError("Failed to fetch admins", data.error)
                 } else {
                     setError("")
                 }
 
                 
             }catch(error){
                 setError(error.message)
             }
         }
 
         getAdmins();
     }, []);


  return (
    <div className="dashboard_cont">

      {error && <p className="error">{error}</p>}

      <h1 id="dashboard_heading">Welcome to the Dashboard, {firstName.firstname} {lastName.lastname}</h1>
          
      <p className="dashboard_para">This is where you can manage your application.</p>

    </div>
  );
}

export default Dashboard;