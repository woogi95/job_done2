import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

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
