import { useState } from "react"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

function ResetPassword(){

    // States
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); 
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    

    // Token
    const token = useSearchParams.get("token");

    // useNavigate
    const navigate = useNavigate();

    // Handle Submit
    const handleSubmit = async (e) => {

        e.preventDefault();

        // Blanking the error and success messages
        setError("");
        setSuccess("");

        if(!token) {
            setError("Invalid password reset link.");
            return;
        }

        // password length
        if(newPassword.lenth <8 ){
            setError("Password must contain at least 8 characters")
            return;
        }

        // confirming new password
        if(newPassword !== confirmNewPassword){
            setError("Password do not match")
            return;
        }

        // Backend response
        try{

            setLoading(true);

            const response = await fetch(
                 `${import.meta.env.VITE_STITCHES_API_URL}/auth/admin/reset-password`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify({
                        token: token,
                        new_password: newPassword,
                        confirm_Password: confirmNewPassword
                    })
                }
            );

            const data =  await response.json();

            // Bad response
            if(!response.ok){
                throw new Error(data.message || "Password reset failed")
            }

            setSuccess(data.message)

            // clearing passwords input after successful reset
            setNewPassword("");
            setConfirmNewPassword("")

            // Giving the admin a moment to read the success message
            setTimeout(() => {
                navigate("/admin_login");
            },2000);

        } catch(err){
            setError(err.message);
        } finally{
            setLoading(false);
        }
    };


    return(
        <div>
            <h1>Reset Password</h1>

            <p>Enter your new administrator password below</p>

            <form onSubmit={handleSubmit}>

                {/* Password */}
                <label>New Password</label>

                <input
                    type={showPassword ? "text": "password"}
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />

                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <FaRegEyeSlash/> : <FaRegEye/>}
                    
                </button>

                {/* Confirm New Password */}
                <label> Confirm New Password</label>

                <input
                    type={showConfirmPassword ? "text": "password"}
                    placeholder="Confirm new password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    required
                />

                <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                    {showConfirmPassword ? <FaRegEyeSlash/> : <FaRegEye/>}
                    
                </button>

                {/* Error and Success messages */}
                {error && <p className="error">{error}</p>}

                {success && <p className="success">{success}</p>}


                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                
                    >{loading ? "Resetting..." : "Reset Password"}

                </button>

                {/* Login Link */}
                <Link to="/admin_login">
                    Back to Login
                </Link>


            </form>


        </div>
    )
}

export default ResetPassword