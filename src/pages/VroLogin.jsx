import React,{useState} from "react";
import "../styles/Login.css"
function VroLogin({onLogin}){
    const[userName,setUserName] = useState("");
    const[password,setPassword] = useState("");
    const[error,setError] = useState("");
    function handleSubmit(e){
        e.preventDefault(); // prevents  the reload
        if(userName ==="" || password === ""){
        setError("All Fields Are Required");
        return;
        }
    setError("");
    onLogin();
}
    return(
     <div className="login-page">
        <div className="login-container">
            <h2>VRO  login</h2>
            <p className="login-subtitle">Admin Access – VRO Only</p>
            <form onSubmit={handleSubmit}>
                <input type="text" 
                     placeholder ="Username or Email"
                     value={userName} 
                     onChange={(e)=>
                     setUserName(e.target.value)
                }
                />
                <input type="password"
                    placeholder="Password" 
                    value={password}
                    onChange={(e)=>
                    setPassword(e.target.value)}
                />
                    {error && <p className="error">{error}</p>}

                    <button type="submit">Login</button>    
                </form>

        </div>
    </div>
    );
}



export default VroLogin