import { useRecoilState } from "recoil";
import {
  BarDayUserDataType,
  StateCatePerType,
  StatesDashType,
  StateSixMonthType,
  StateVisitorType,
} from "../../../types/type";
import {
  dcDaysUserDataAtom,
  mainDashBoardAtom,
  stateCatePerAtom,
  stateSixMonthAtom,
  stateVisitorAtom,
} from "../../../atoms/third-atoms/admin/mainAtom";
import { useEffect } from "react";
import { getMainData } from "../../../apis/admin/mainpage";

const AdminHeader = () => {
  // 대쉬 보드 API
  const [dashBoardData, setDashBoardData] =
    useRecoilState<StatesDashType>(mainDashBoardAtom);
  // 최근 일주일 접속 유저 수
  const [visitorData, setVisitorData] =
    useRecoilState<StateVisitorType[]>(stateVisitorAtom);
  const [dcVisitorData, setDcVisitorData] =
    useRecoilState<BarDayUserDataType>(dcDaysUserDataAtom);
  // 6개월 총매출 조회
  const [sixMonthData, setSixMonthData] =
    useRecoilState<StateSixMonthType[]>(stateSixMonthAtom);
  // 카테고리 비율
  const [catePer, setCatePer] =
    useRecoilState<StateCatePerType[]>(stateCatePerAtom);
  console.log("방문자 : ", visitorData);
  console.log("6개월 : ", sixMonthData);
  console.log("대쉬보드 : ", dashBoardData);

  useEffect(() => {
    getMainData(
      setDashBoardData,
      setSixMonthData,
      setVisitorData,
      setDcVisitorData,
      setCatePer,
    );
  }, []);
  return (
    <div className="bg-white shadow-md">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <span className="text-gray-800">관리자님 환영합니다</span>
          <button className="ml-4 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700">
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
