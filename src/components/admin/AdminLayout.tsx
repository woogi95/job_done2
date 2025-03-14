import { Outlet } from "react-router-dom";
import AdminHeader from "./admin-header/AdminHeader";
import AdminSidebar from "../admin/admin-sidebar/AdminSidebar";
import "./adminlayout.css";
import styled from "@emotion/styled";
const AdminLayout = () => {
  const ExpertDiv = styled.div`
    backgroundcolor: #eaeef1;
    display: flex;
    justify-content: center;
    height: 100vh;
    overflow-y: hidden;
  `;
  const ExpertLayoutDiv = styled.div`
    max-width: 1280px;
    width: 100%;
    backgroundcolor: #b6b6b6;
    height: 100%;
    box-shadow:
      rgba(0, 0, 0, 0.25) 0px 14px 28px,
      rgba(0, 0, 0, 0.22) 0px 10px 10px;

    .main {
      display: flex;
      height: calc(100% - 56px);
      /* side menu */
      > div:nth-child(1) {
        width: 20%;
        height: 100%;
        background-color: #2d3748;
      }
      /* outlet */
      > div:nth-child(2) {
        width: 80%;
        height: 90%
        /* background-color: #eaeef1; */
        background-color: #f5f5f5;
      }
    }
  `;
  return (
    <ExpertDiv>
      <ExpertLayoutDiv>
        <AdminHeader />
        <main className="main">
          <AdminSidebar />
          <Outlet />
        </main>
      </ExpertLayoutDiv>
    </ExpertDiv>
  );
};

export default AdminLayout;
