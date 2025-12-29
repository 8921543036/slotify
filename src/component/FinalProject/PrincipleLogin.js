import React, { useState } from "react";
import "./PrincipleLogin.css"; // Can reuse the same modal CSS

function PrincipleLogin({ show, onClose }) {
  const [isSignUp, setIsSignUp] = useState(false);

  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-icon" onClick={onClose}>
          &times;
        </button>

        <div className="modal-header">
          <h2>{isSignUp ? "Principle Register" : "Principle Login"}</h2>
          <p>Please enter your administrative credentials.</p>
        </div>

        <form className="modal-form">
          {isSignUp && (
            <div className="input-group">
              <input type="text" placeholder="Principle Name" />
            </div>
          )}

          <div className="input-group">
            <input type="email" placeholder="Official Email" />
          </div>

          {isSignUp && (
            <div className="input-group">
              <input type="text" placeholder="Employee ID / Admin Code" />
            </div>
          )}

          <div className="input-group">
            <input type="password" placeholder="Password" />
          </div>

          {isSignUp && (
            <div className="input-group">
              <input type="password" placeholder="Confirm Password" />
            </div>
          )}

          <div className="form-options">
            {isSignUp ? (
              <label className="checkbox-label">
                <input type="checkbox" /> I agree with Privacy Policy
              </label>
            ) : (
              <>
                <label className="checkbox-label">
                  <input type="checkbox" /> Remember Me
                </label>
                <a href="#" className="forgot-password">
                  Forget Password?
                </a>
              </>
            )}
          </div>

          <button type="button" className="btn-primary">
            {isSignUp ? "Sign Up" : "Login"}
          </button>

          <button type="button" className="btn-google">
            <span className="google-icon">G</span> Sign In With Google
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

export default PrincipleLogin;
