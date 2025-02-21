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
    "/business",
    "/business/number",
  ];
  const isLayourVisible = !nolayoutPaths.includes(pathname);

  useEffect(() => {
    // 페이지가 로드되자마자 실행되는 API 호출
    axios.get("/api/visit").catch(error => {
      console.error("Error fetching data:", error);
    });
  }, []);
  return (
    <div>
      {isLayourVisible && <Header />}
      <main className="pt-[80px] pb-[100px]">
        <Outlet />
      </main>
      {isLayourVisible && <Footer />}
    </div>
  );
}
export default Layout;
