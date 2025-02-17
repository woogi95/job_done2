import { Outlet } from "react-router-dom";
import AdminHeader from "./admin-header/AdminHeader";
import AdminSidebar from "./admin-sidebar/AdminSidebar";
import "./adminlayout.css";
const AdminLayout = () => {
  return (
    <div className="layout-div">
      <div>
        <AdminHeader />
      </div>
      <div className="second-div">
        <AdminSidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
