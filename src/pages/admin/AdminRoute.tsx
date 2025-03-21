import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const adminState = localStorage.getItem("admin") === "admin"; // ✅ 저장된 role 확인

  return adminState ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;
