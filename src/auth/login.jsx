import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

    const [identifier, setIdentifier] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [error, setError] = useState(""); 
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => { 
        
        e.preventDefault(); 

        console.log("login submitted")

        setError(""); 

        setLoading(true); 
        
        // Fetching data from backend
        try { const response = await fetch( 
            `${import.meta.env.VITE_STITCHES_API_URL}/auth/admin/login`, 
            { 
                method: "POST", 
                headers: { "Content-Type": "application/json", }, 
                body: JSON.stringify({ identifier, password, }), 
            } 
        );

        const data = await response.json(); 
        console.log(data)
        
        if (!response.ok) {
             setError(data.message || "Invalid username/email or password.");
              return;
         } 
         
         // Save JWT 
         localStorage.setItem("access_token", data.access_token); 
         
         // Go to dashboard 
         navigate("/"); 
        } catch (error) {setError("Unable to connect to the server.");

        } finally { setLoading(false); } 
    };

    return(

        <div className="login-cont">

            <h1 className="login-title">Admin Login</h1>

            <div className="login-form-cont">

                <div className="login-form-beside-message">
                    <h3>Welcome</h3>

                </div>

                <form onSubmit={handleSubmit}>

                    {/* EMAIL-USERNAME */}
                    <div className="login-form-email-username">
                        <label htmlFor="email-username"></label>

                        <input type="text"
                               id="email-username"
                               placeholder="Email or Username"
                               value={identifier}
                               onChange={((event) => setIdentifier(event.target.value))}
                               required
                        />

                    </div>

                    {/* PASSWORD */}
                    <div> 
                        
                        <input type="password" 
                               id="password" 
                               value={password} 
                               onChange={(e) => setPassword(e.target.value)} 
                               placeholder="Enter password" required /> 
                    </div> 

                    {/* ERROR MESSAGE */}
                    {error && <p className="error">{error}</p>} 
                    
                    {/* SUBMIT BUTTON */}
                    <button type="submit" 
                            disabled={loading}
                            > {loading ? "Logging in..." : "Login"} 
                    </button>

                </form>

            </div>

        </div>
        
    )

}

export default Login;