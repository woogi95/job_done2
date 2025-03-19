import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { useEffect } from "react";

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
    "/payLoading",
  ];
  const isLayoutVisible = !nolayoutPaths.includes(pathname);

  useEffect(() => {
    const fetchData = async (retryCount = 0) => {
      try {
        const response = await axios.get(
          "https://job-done.r-e.kr:52340/api/visit",
          {
            timeout: 5000,
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          },
        );
        console.log("방문 기록?:", response.data);
      } catch (error) {
        if (
          retryCount < 2 &&
          (error.code === "네트워크 오류" || error.response?.status === 200)
        ) {
          const delay = Math.pow(2, retryCount) * 1000;
          console.warn(`네트워크 이슈 발생 ${delay / 1000}초 후 재시도`);
          setTimeout(() => fetchData(retryCount + 1), delay);
        }
      }
    };

    fetchData();
    //
    //     // 페이지가 로드되자마자 API 호출

    //     axios.get("https://job-done.r-e.kr:52340/api/visit").catch(error => {

    //       console.error("Error fetching data:", error);
    //     });
    //
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {isLayoutVisible && <Header />}
      <main className="flex-grow py-[80px]">
        <Outlet />
      </main>
      {isLayoutVisible && <Footer />}
    </div>
  );
}
export default Layout;
