import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { useEffect } from "react";
import axios from "axios";

function Layout() {
  const { pathname } = useLocation();
  const nolayoutPaths = [
    "/login",
    "/login/signup",
    "/login/email",
    "/login/signupdone",
    "/login/epwcheck",
    "/login/epwedit",
    "/login/epw",
    "/login/admin",
    "/business",
    "/business/number",
    // "/service/contactus",
  ];
  const isLayourVisible = !nolayoutPaths.includes(pathname);

  useEffect(() => {
    // 페이지가 로드되자마자 API 호출
    axios.get("https://job-done.r-e.kr:52340/api/visit").catch(error => {
      console.error("Error fetching data:", error);
    });
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      {isLayourVisible && <Header />}
      <main className="flex-grow py-[80px]">
        <Outlet />
      </main>
      {isLayourVisible && <Footer />}
    </div>
  );
}
export default Layout;
