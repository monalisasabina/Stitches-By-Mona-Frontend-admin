import { useEffect, useState } from "react"

function AdminList(){

    // states
    const [admins, setAdmins] = useState([]);
    const [errors, setErrors] = useState("");

    // Fetching Data
    useEffect(() =>{

        const getAdmins = async () => {

            try{

                const token = localStorage.getItem("access-token")
                // console.log(token)

                const response = await fetch (
                    `${import.meta.env.VITE_STITCHES_API_URL}/auth/admin/profiles`,
                    {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${token}`
                        },
                    }
                );

                const data = await response.json();
                console.log(data)
                setAdmins(data)
               
               

                if (!response.ok){
                    setErrors("Failed to fetch admins", data.error)
                } else {
                    setErrors("")
                }

                
            }catch(error){
                setErrors(error.message)
            }
        }

        getAdmins();
    }, []);


    return(
        <div>
            <h1>ADMIN LIST</h1>

            {/* ERROR MESSAGE */}
            {errors && <p>{errors}</p>}

            <table>

                {/* TABLE HEADINGS */}
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>User Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                
                {/* TABLE BODY */}
                <tbody>
                    {admins.map((admin) =>(
                        <tr key={admin.id}>
                            <td>{admin.id}</td>
                            <td>{admin.firstname}</td>
                            <td>{admin.lastname}</td>
                            <td>{admin.username}</td>
                            <td>{admin.email}</td>
                        </tr>
                     )
                    )}
                    
                </tbody> 
            </table>
  
        </div>
    )
}

export default AdminList