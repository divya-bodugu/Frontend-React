import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login({ onLogin }) {
  // Pre-filled with friendly demo values
  const [email, setEmail] = useState("divya@example.com");
  const [role, setRole] = useState("Manager");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email) return;

    // Extract a display name from email (e.g. "divya" -> "Divya")
    const rawName = email.split("@")[0] || "User";
    const formattedName = rawName.charAt(0).toUpperCase() + rawName.slice(1);

    // 1. Pass user details up to App.jsx
    onLogin({ name: formattedName, email, role });

    // 2. Redirect to dashboard
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="login-container">
      <div className="card login-card">
        {/* Header */}
        <div className="login-header">
          <h2 className="login-title">⚡ ProjectCRM</h2>
          <p className="login-subtitle">
            Sign in to access your dashboard & projects
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="login-form">
          <div className="login-form-group">
            <label className="login-label">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="search-input login-input"
              required
            />
          </div>

          <div className="login-form-group">
            <label className="login-label">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="search-input login-input"
            >
              <option value="Manager">Manager</option>
              <option value="Developer">Developer</option>
              <option value="Client">Client</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn-primary login-submit-btn"
          >
            🔐 Sign In & Open Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
