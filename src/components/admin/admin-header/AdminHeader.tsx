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
  dcSixMonthDataAtom,
  mainDashBoardAtom,
  stateCatePerAtom,
  stateSixMonthAtom,
  stateVisitorAtom,
} from "../../../atoms/third-atoms/admin/mainAtom";
import { useEffect } from "react";
import { getMainData } from "../../../apis/admin/mainpage";

const AdminHeader = () => {
  // 대쉬 보드 API
  const [_dashBoardData, setDashBoardData] =
    useRecoilState<StatesDashType>(mainDashBoardAtom);
  // 최근 일주일 접속 유저 수
  const [_visitorData, setVisitorData] =
    useRecoilState<StateVisitorType[]>(stateVisitorAtom);
  const [_dcVisitorData, setDcVisitorData] =
    useRecoilState<BarDayUserDataType>(dcDaysUserDataAtom);
  // 6개월 총매출 조회
  const [_sixMonthData, setSixMonthData] =
    useRecoilState<StateSixMonthType[]>(stateSixMonthAtom);
  const [_dcSixMonthData, setDcSixMonthData] =
    useRecoilState<{ [key: string]: string | number }[]>(dcSixMonthDataAtom);
  // 카테고리 비율
  const [_catePer, setCatePer] =
    useRecoilState<StateCatePerType[]>(stateCatePerAtom);
  console.log(_dcVisitorData);
  useEffect(() => {
    getMainData(
      setDashBoardData,
      setSixMonthData,
      setDcSixMonthData,
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
