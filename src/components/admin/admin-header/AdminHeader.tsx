import { useRecoilState } from "recoil";
import {
  BarDayUserDataType,
  StateCatePerType,
  StatesDashType,
  StateVisitorType,
} from "../../../types/type";
import {
  dcDaysUserDataAtom,
  mainDashBoardAtom,
  stateCatePerAtom,
  stateVisitorAtom,
} from "../../../atoms/third-atoms/admin/mainAtom";
import { useEffect } from "react";
import { getMainData } from "../../../apis/admin/mainpage";
import { removeCookie } from "../../../apis/cookie";
import { useNavigate } from "react-router-dom";

const AdminHeader = () => {
  // 대쉬 보드 API
  const [_dashBoardData, setDashBoardData] =
    useRecoilState<StatesDashType>(mainDashBoardAtom);
  // 최근 일주일 접속 유저 수
  const [_visitorData, setVisitorData] =
    useRecoilState<StateVisitorType[]>(stateVisitorAtom);
  const [_dcVisitorData, setDcVisitorData] =
    useRecoilState<BarDayUserDataType>(dcDaysUserDataAtom);

  // 카테고리 비율
  const [_catePer, setCatePer] =
    useRecoilState<StateCatePerType[]>(stateCatePerAtom);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    removeCookie("accessToken");
    document.cookie.split(";").forEach(cookie => {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie =
        name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/login";
    });
    navigate("/login");
  };
  console.log(_dcVisitorData);
  useEffect(() => {
    getMainData(setDashBoardData, setVisitorData, setDcVisitorData, setCatePer);
  }, []);
  return (
    <div className="bg-white shadow-md">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center justify-between w-full">
          <img
            src="/images/logo.svg"
            alt="logo"
            onClick={() => navigate("/admin")}
            style={{ cursor: "pointer" }}
          />
          <div>
            <span className="text-gray-800">관리자님 환영합니다</span>
            <button
              className="ml-4 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700"
              onClick={() => handleLogout()}
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
