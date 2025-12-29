import React, { useState } from "react";
import "./Login.css";

function Login({ show, onClose, onLogin }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!show) return null;

  const handleLogin = () => {
    if (!email || !password || (isSignUp && !name)) {
      alert("Please fill all fields");
      return;
    }

    // Send user info to parent
    onLogin({
      name: isSignUp ? name : "John Doe", // default name if login
      email,
      role: "Student",
      avatar: "https://via.placeholder.com/100", // optional avatar
    });

    onClose();
    // Clear fields
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-icon" onClick={onClose}>
          &times;
        </button>

        <div className="modal-header">
          <h2>{isSignUp ? "Student Register" : "Student Login"}</h2>
          <p>Please enter your student details.</p>
        </div>

        <form className="modal-form">
          {isSignUp && (
            <div className="input-group">
              <input
                type="text"
                placeholder="Student Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="input-group">
            <input
              type="email"
              placeholder="Student Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="button" className="btn-primary" onClick={handleLogin}>
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>

        <div className="modal-footer">
          {isSignUp ? (
            <p>
              Already have an account?{" "}
              <span onClick={() => setIsSignUp(false)}>Login</span>
            </p>
          ) : (
            <p>
              Don't have an account?{" "}
              <span onClick={() => setIsSignUp(true)}>Sign Up</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
