import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import "./Profile.css";

function Profile({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Function to get first two letters of email
  const getEmailInitials = (email) => {
    if (!email) return "";
    return email.slice(0, 2).toUpperCase();
  };

  return (
    <div className="profile-wrapper" ref={ref}>
      {/* Navbar avatar */}
      <div className="profile-trigger" onClick={() => setOpen(!open)}>
        <div className="avatar-initials">{getEmailInitials(user.email)}</div>
        <FaChevronDown className={`arrow ${open ? "rotate" : ""}`} />
      </div>

      {open && (
        <div className="profile-popup">
          <div className="profile-header">
            <div className="popup-avatar-initials">{getEmailInitials(user.email)}</div>
            <h4>{user.name}</h4>
            <p>{user.role || "Student"}</p>
          </div>
          <ul className="profile-menu">
           
            <li className="logout" onClick={onLogout}>
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Profile;
