import { useState } from "react"

function ForgetPassword(){
    
    // States
    const [email , setEmail] = useState("");
    const [error,setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);


    // Handle Email Submit
    const handleEmailSubmit = async (e) =>{

        e.preventDefault();

        setMessage("");
        setError("");

        if (!email){

            setError("Please enter your email address")
            return;
        }

        try{

            setLoading(true);

            const response = await fetch(
                `${import.meta.env.VITE_STITCHES_API_URL}/auth/admin/forgot-password`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email.trim()
                    })
                }
            );
            // trim() : string method that removes whitespace from both ends of a string. It does not change the original string, but returns a new string with the whitespace removed.
            
            const data = await response.json();
            console.log(data)

            // TROUBLESHOOTING
            // const responseText = await response.text();

            // console.log("status:", response.status)
            // console.log("Response:", responseText);


            // let data = {};

            // try {
            //         data = responseText ? JSON.parse(responseText) : {};
            // } catch {
            //         console.log("Response is not valid JSON");
            // }

            // if (responseText) {
            //     try {
            //         data = JSON.parse(responseText);
            //     } catch {
            //         throw new Error("The server returned an invalid response.");
            //     }
            // }


            if (!response.ok) {
                throw new Error(data.message || "Something went wrong.");
            }

            setMessage(data.message);
            setEmail("");

        }catch(err){

            setError(err.message);

        }finally{
            setLoading(false);
        }

    };

    return(
        <div>

        <h1>Forgot Password</h1>

        <p>
                Enter your administrator email address
                and we'll send you a password reset link.
        </p>

        <form id="forgot_password_form" onSubmit={handleEmailSubmit}>

            {/* Email Input */}
            <label htmlFor="email">Email Address</label>

            <input
                type="email"
                value={email} 
                placeholder="Enter your email address"
                onChange={(e) =>setEmail(e.target.value)}
                required
            />

            {/* Error / Message messages */}
            {error && <p className="error">{error}</p>}

            {message && <p className="success">{message}</p>} 

            {/* Submit Button */}
            <button
                type="submit"
                disabled={loading}

                > {loading? "Sending..." : "Send Reset Link"}
            </button>

            

        </form>



        </div>
    )
}
 export default ForgetPassword
