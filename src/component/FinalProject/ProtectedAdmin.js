import { Navigate } from "react-router-dom";

function ProtectedAdmin({ children }) {
  const isAdmin = localStorage.getItem("adminLoggedIn");
  return isAdmin ? children : <Navigate to="/admin-login" />;
}

export default ProtectedAdmin;
