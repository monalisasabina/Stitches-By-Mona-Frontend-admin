// Where the admins can change their credentials

function RegisterNewAdmin(){


    return(
        <div>
            <h1>Register New Admin</h1>

            
            <div>
            

                    {/* ADMIN CREDENTIALS */}
                    <form className="new-admin-details-form">

                        <h3>Update Admin Details</h3>

                        <p>You can change either your first name, last name, username or email address here.</p>

                        {/* FIRST NAME */}
                        <label htmlFor="firstName">First Name:</label>
                        <input 
                            type="text" 
                            id="firstName" 
                            name="firstName" 
                        />

                        {/* LAST NAME */}
                        <label htmlFor="lastName">Last Name:</label>
                        <input 
                            type="text" 
                            id="lastName" 
                            name="lastName" 
                        />

                        {/* EMAIL */}
                        <label htmlFor="email">Email:</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                        />

                        {/* SUBMIT BUTTON */}
                        <button type="submit">Update Details</button>

                    </form>
                  

                    {/* PASSWORD */}
                    <form className="new-admin-password-form">

                        <h3>Password</h3>

                    
                        {/* PASSWORD */}
                        <label htmlFor="Password">Password:</label>
                        <input 
                            type="password" 
                            id="Password" 
                            name="Password" 
                        />

                        {/* CONFIRM NEW PASSWORD */}
                        <label htmlFor="confirmNewPassword">Confirm New Password:</label>
                        <input 
                            type="password" 
                            id="confirmNewPassword" 
                            name="confirmNewPassword" 
                        />

                         {/* SUBMIT PASSWORD BUTTON */}
                        <button type="submit">Change Password</button>

                    </form>
            </div>

        </div>

    )
};

export default RegisterNewAdmin