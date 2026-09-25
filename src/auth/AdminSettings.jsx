// Where the admins can change their credentials

import { useState } from "react";

// react icons
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";

function AdminSettings(){

    // State variables for password visibility
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

    // State admin details form
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    
    // State password form
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    // State error
    const [detailsError, setDetailsError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    // state success
    const [detailsSuccess, setDetailsSuccess] = useState("");
    const [passwordSuccess, setPasswordSuccess] = useState("");

    // Handle Details Form Submission
    const handleDetailsSubmit = async (e) =>{

        e.preventDefault();

        // console.log(firstName);
        // console.log(lastName);
        // console.log(userName);
        // console.log(email);
        
        // Accessing token
        const token = localStorage.getItem("access-token");
        // console.log(token)

        const id = localStorage.getItem("admin-id");
        // console.log(id)

        // Build the request body
        const body = {};
        if (firstName) body.firstname = firstName;
        if (lastName) body.lastname = lastName;
        if (userName) body.username = userName;
        if (email) body.email = email;

        // console.log(body)


        // Patching data
        try { const response = await fetch( 
                `${import.meta.env.VITE_STITCHES_API_URL}/auth/admin/update/${id}`, {

                     method: "PATCH", 
                     headers: { 
                            "Content-Type": "application/json", 
                            "Authorization": `Bearer ${token}`
                         }, 
                     body: JSON.stringify(body), 
                 }
        
            );

            const data = await response.json(); 
            console.log(data)
            
            if (!response.ok) {
                setDetailsError(data.error || "Invalid firstname, lastname, username or email.");
                return;
            } 

            console.log("Admin details updated successfully")
            setDetailsSuccess("Admin details updated successfully.");

        }catch(error){setDetailsError("Unable to connect to the server.")}

    };

    // Handle Password Form Submission
    const handlePasswordSubmit = async (e) =>{
          
        e.preventDefault();

        // Clear previous error message
        setPasswordError(""); 

        console.log(oldPassword)
        console.log(newPassword)
        console.log(confirmNewPassword)

        const token = localStorage.getItem("access-token");
        // console.log(token)

        // Check if new password and confirm new password match
        if (newPassword !== confirmNewPassword) {
            setPasswordError("New password and confirm new password do not match.");
            return;
        }

        try{
            const response = await fetch(
                `${import.meta.env.VITE_STITCHES_API_URL}/auth/admin/change-password`,{
                    method: "PATCH",
                    headers: {
                         "Content-Type": "application/json",
                         "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                          old_password: oldPassword,
                          new_password: newPassword,
        
                    })
                }    
            );

             const data = await response.json();
             console.log(data)
             console.log(data.error)


             if (!response.ok) {
                setPasswordError(data.error || "Password update failed");
                return;
             };

             console.log("Password updated successfully")
             setPasswordSuccess("Password updated successfully.");
             setOldPassword("");
             setNewPassword("");
             setConfirmNewPassword("");

        } catch(error){
                setPasswordError("Unable to connect to the server")
        };
    };


    return(
        <div>
            <h1>Admin Settings</h1>

            
            <div>
            
                    {/* ADMIN CREDENTIALS */}
                    <form className="admin-details-form" onSubmit={handleDetailsSubmit}>

                        <h3>Update Admin Details</h3>

                        <p>You can change either your first name, last name, username or email address here.</p>

                        {/* FIRST NAME */}
                        <label htmlFor="firstName">First Name:</label>
                        <input 
                            type="text" 
                            id="firstName" 
                            name="firstName" 
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />

                        {/* LAST NAME */}
                        <label htmlFor="lastName">Last Name:</label>
                        <input 
                            type="text" 
                            id="lastName" 
                            name="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />

                        {/* USERNAME */}
                        <label htmlFor="userName">Username:</label>
                        <input 
                            type="text" 
                            id="userName" 
                            name="userName"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />

                        {/* EMAIL */}
                        <label htmlFor="email">Email:</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        {/* ERROR MESSAGE */}
                        {detailsError && <p className="detail-error-msg">{detailsError}</p>}

                        {/* SUCCESS MESSAGE */}
                        {detailsSuccess && <p className="detail-success-msg">{detailsSuccess}</p>}

                        {/* SUBMIT BUTTON */}
                        <button type="submit">Update Details</button>

                    </form>
                  

                    {/* PASSWORD CHANGE */}
                    <form className="admin-password-container" onSubmit={handlePasswordSubmit}>

                        <h3>Change Password</h3>

                        <p>Update your password here.</p>

                        {/* OLD PASSWORD */}
                        <div className="old-password-container">
                            <label htmlFor="oldPassword">Old Password:</label>
                            <input 
                                type={showOldPassword ? "text" : "password"} 
                                id="oldPassword" 
                                name="oldPassword" 
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                
                            />

                            <button
                                type="button"
                                onClick={() => setShowOldPassword(!showOldPassword)}
                            >
                                {showOldPassword ? <FaRegEyeSlash /> : <FaRegEye /> }
                            
                            </button>   
                        </div>
                        

                        {/* NEW PASSWORD */}
                        <div className="new-password-container">

                            <label htmlFor="newPassword">New Password:</label>
                            <input 
                                type={showNewPassword ? "text" : "password"} 
                                id="newPassword" 
                                name="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)} 

                            />

                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                            >
                                {showNewPassword ? <FaRegEyeSlash /> : <FaRegEye /> }
                            
                            </button>
                        </div>
                        

                        {/* CONFIRM NEW PASSWORD */}
                        <div className="confirm-new-password-container">

                            <label htmlFor="confirmNewPassword">Confirm New Password:</label>
                            <input 
                                type={showConfirmNewPassword ? "text" : "password"} 
                                id="confirmNewPassword" 
                                name="confirmNewPassword" 
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                            />

                            <button
                                type="button"
                                onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                            >
                                {showConfirmNewPassword ? <FaRegEyeSlash /> : <FaRegEye /> }
                            
                            </button>
                        </div>

                        {/* ERROR MESSAGE */}
                        {passwordError && <p className="confirm-error-msg">{passwordError}</p>}

                        {/* SUCCESS MESSAGE */}
                        {passwordSuccess && <p className="confirm-success-msg">{passwordSuccess}</p>}

                         {/* SUBMIT CHANGE PASSWORD BUTTON */}
                        <button type="submit">Change Password</button>

                    </form>

            </div>

        </div>

    )
};

export default AdminSettings