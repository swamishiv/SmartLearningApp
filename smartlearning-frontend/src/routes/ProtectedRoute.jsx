import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("token");
  const roleCode = localStorage.getItem("roleCode");

  // 🔐 Not logged in
  if (!token || !roleCode) {
    return <Navigate to="/" replace />;
  }

  // 🚫 Wrong role
  if (!allowedRoles.includes(roleCode)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;