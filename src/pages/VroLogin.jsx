import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function VroLogin({ onLogin }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

    const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedUser = userName.trim();
    const trimmedPass = password.trim();

    if (!trimmedUser || !trimmedPass) {
        setError("Please Enter Both Username & Password");
        return;
    }

    if (trimmedUser === "admin" && trimmedPass === "admin123") {
        setError("");
        onLogin?.();
        navigate("/admin-dashboard");
    } else {
        setError("Invalid username or password");
    }
    };


  return (
    <div className="login-page">
      <div className="login-container">
        <h2>VRO Login</h2>
        <p className="login-subtitle">Admin Access – VRO Only</p>

        <form onSubmit={handleSubmit}>
        <input
        type="text"
        placeholder="Username or Email"
        value={userName}
        onChange={(e) => setUserName(e.target.value.trimStart())}
        />

        <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value.trimStart())}
        />


          {error && <p className="error">{error}</p>}

          <button type="submit" className="btn-login">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default VroLogin;
