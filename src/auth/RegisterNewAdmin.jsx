// Where the admins can change their credentials
// react icons
import { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";

function RegisterNewAdmin(){

    // State: admin details form
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");

    // State: Password availability
     const [showPassword, setShowPassword] = useState(false);
     const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // State: password form
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    // State: New Admin
    const [newAdmin, setNewAdmin] = useState(null);


    // Submitting new admin
    const handleSubmitNewAdmin =  async (e) => {

        e.preventDefault();

        const token = localStorage.getItem("access-token")

        if (password !== confirmPassword) {
            setErrorMsg("New password and confirm new password do not match.");
            return;
        }

            try { const response = await fetch( 
                `${import.meta.env.VITE_STITCHES_API_URL}/auth/admin/register`, 
                    { 
                        method: "POST", 
                        headers: { 
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        }, 
                        body: JSON.stringify(
                            { 
                                firstname: firstName, 
                                lastname: lastName,
                                username: userName,
                                email: email,
                                password: password, 

                            }), 
                    } 
                );
                const data = await response.json();

                if(!response.ok){
                        setErrorMsg(console.log(data.error))
                        setErrorMsg(data.error)
                        setNewAdmin(data.admin)
                        return
                } else{
                    setNewAdmin(data.admin)
                }

               
                setSuccessMsg("New Administrator added successfully.");
                setErrorMsg("")
                setFirstName("");
                setLastName("");
                setUserName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");


            } catch(error){setErrorMsg("Unable to connect to the server",error)}

    };


    return(
        <div>
            <h1>Register New Admin</h1>

            
            <div>
            

                {/* ADMIN CREDENTIALS */}
                <form className="new-admin-details-form" onSubmit={handleSubmitNewAdmin}>

                   
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
                    <label htmlFor="username">Username</label>
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
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
 
                    {/* PASSWORD */}
                    <div className="password-cont">
                        <label htmlFor="Password">Password:</label>
                        <input 
                            type={showPassword ? "text" : "password"}
                            id="Password" 
                            name="Password" 
                            value={password}
                            onChange={(e) =>
                                {
                                   setPassword(e.target.value)
                                   //console.log(e.target.value)
                                }}
                        />

                        <button
                            type="button"
                            onClick={ () => setShowPassword(!showPassword)}
                            >
                             {showPassword ? <FaRegEyeSlash /> : <FaRegEye /> }

                        </button>
                    </div>
                    

                    {/* CONFIRM NEW PASSWORD */}
                    <div>
                        <label htmlFor="confirmNewPassword">Confirm New Password:</label>
                        <input 
                            type= {showConfirmPassword ? "text" : "password"} 
                            id="confirmNewPassword" 
                            name="confirmNewPassword" 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />

                        <button
                            type="button"
                            onClick={ () => setShowConfirmPassword(!showConfirmPassword)}
                            >
                             {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye /> }

                        </button>

                    </div>

                    {/* ERROR MESSAGE */}
                    {errorMsg && <p>{errorMsg}</p>}

                     {/* SUCCESSFUL MESSAGE */}
                    {successMsg && <p>{successMsg}</p>}
                   

                    {/* SUBMIT PASSWORD BUTTON */}
                    <button type="submit"> Sign Up </button>


                    
                    {/* DISPLAYING THE NEW ADMIN DETAILS */}
                    {newAdmin && (

                        <div className="new_admin_details">

                            <h3>New Administrator</h3>

                            <p>ID No: {newAdmin.id} </p>
                            <p>First Name: {newAdmin.firstname}</p>
                            <p>Last Name: {newAdmin.lastname}</p>
                            <p>User Name: {newAdmin.username}</p>
                            <p>Email: {newAdmin.email}</p>


                        </div>

                    )}

                </form>

               
                   
            </div>

        </div>

    )
};

export default RegisterNewAdmin