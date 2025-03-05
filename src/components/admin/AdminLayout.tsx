import { Outlet } from "react-router-dom";
import AdminHeader from "./admin-header/AdminHeader";
import AdminSidebar from "./admin-sidebar/AdminSidebar";
import "./adminlayout.css";
const AdminLayout = () => {
  return (
    <div style={{ backgroundColor: "#eaeef1" }}>
      <div
        className="layout-div"
        style={{ margin: "0 auto", backgroundColor: "#b6b6b6" }}
      >
        <div>
          <AdminHeader />
        </div>
        <div className="second-div">
          <AdminSidebar />

          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
