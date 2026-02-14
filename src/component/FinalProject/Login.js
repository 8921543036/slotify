import React, { useState } from "react";
import "./Login.css";

function Login({ show, onClose, onOpenSignUp, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      // ✅ IMPORTANT
      onLogin(data.user);

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="login-card">
        <button onClick={onClose}>×</button>
        <h2>Login</h2>
        {error && <p>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          <button type="submit">Login</button>
        </form>

        <p onClick={onOpenSignUp}>Sign Up</p>
      </div>
    </div>
  );
}

export default Login;
