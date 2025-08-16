// src/middleware/AdminMiddleware.jsx

import { Navigate, Outlet } from "react-router-dom";

const AdminMiddleware = () => {
  const isAuthenticated = !!localStorage.getItem("admin_token");
  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" />;
};

export default AdminMiddleware;
