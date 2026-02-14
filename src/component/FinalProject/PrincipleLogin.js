import React, { useState } from "react";
import "./PrincipleLogin.css";

function PrincipleLogin({ show, onClose, onOpenLogin, onLogin }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    admissionNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // ✅ Password match validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "Signup failed");

      // ✅ Auto login after signup
      onLogin(data.user);

      // ✅ Clear form
      setFormData({
        name: "",
        email: "",
        admissionNumber: "",
        password: "",
        confirmPassword: "",
      });

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="signup-card">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Sign Up</h2>
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Admission No"
            value={formData.admissionNumber}
            onChange={(e) => setFormData({ ...formData, admissionNumber: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            required
          />
          <button type="submit">Sign Up</button>
        </form>

        <p className="switch-login" onClick={onOpenLogin}>
          Already have an account? Login
        </p>
      </div>
    </div>
  );
}

export default PrincipleLogin;
