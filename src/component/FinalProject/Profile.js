import React, { useState, useRef, useEffect } from "react";
import { FaUserCircle, FaChevronDown } from "react-icons/fa";
import "./profile.css"; // make sure to style your profile dropdown

function ProfileIcon({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div className="nav__right" ref={ref}>
      <div className="profile-trigger" onClick={() => setOpen(!open)}>
        <FaUserCircle className="profile-icon" />
        <FaChevronDown className={`arrow ${open ? "rotate" : ""}`} />
      </div>

      {open && (
        <div className="profile-popup">
          <div className="profile-header">
            <img
              src={user.avatar || "https://via.placeholder.com/50"}
              alt="Avatar"
              className="popup-avatar"
            />
            <h4>{user.name}</h4>
            <p>{user.role}</p>
          </div>

          <ul className="profile-menu">
            <li>My Profile</li>
            <li>My Bookings</li>
            <li>Settings</li>
            <li className="logout" onClick={onLogout}>
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default ProfileIcon;


