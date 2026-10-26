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


     
    const changeAdminStatus = async (admin) => {

        // Clear any previous error message
        setErrors("");

        try {
            // Get the logged-in admin's JWT
            const token = localStorage.getItem("access-token");

            // Send a request to the Flask backend
            const response = await fetch(
                `${import.meta.env.VITE_STITCHES_API_URL}/auth/admin/profiles/${admin.id}/status`,
                {
                    method: "PATCH",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },

                    // Reverse the current status
                    body: JSON.stringify({
                        is_active: !admin.is_active
                    })
                }
            );

            // Read the backend response
            const data = await response.json();

            // Display an error if the request failed
            if (!response.ok) {
                setErrors(data.error || "Failed to update admin status");
                return;
            }

            // Update the affected admin in React state
            setAdmins((previousAdmins) =>
                previousAdmins.map((item) =>
                    item.id === admin.id
                        ? { ...item, is_active: data.admin.is_active }
                        : item
                )
            );

        } catch (error) {
            // Handle network errors
            setErrors(error.message);
        }
    };


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
                        <th>Phone</th>
                        <th>Active</th>
                        <th>Action</th>
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
                            <td>{admin.phone}</td>
                            <td>{admin.is_active ? "Active" : "Inactive"}</td>

                            {/* Changing activation status button */}
                            <td>
                                <button
                                    type="button"
                                    onClick={() => changeAdminStatus(admin)}
                                >
                                    {admin.is_active ? "Deactivate" : "Activate"}
                                </button>
                            </td>
                        </tr>
                     )
                    )}
                    
                </tbody> 
            </table>
  
        </div>
    )
}

export default AdminList