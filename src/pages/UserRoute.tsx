import { Navigate, Outlet } from "react-router-dom";

const UserRoute = () => {
  const isUser = localStorage.getItem("admin") === "admin";
  return !isUser ? <Outlet /> : <Navigate to="/admin" />;
};
export default UserRoute;
