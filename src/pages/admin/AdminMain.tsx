import { useRecoilState } from "recoil";
import {
  StatesDashType,
  StateSixMonthType,
  StateVisitorType,
} from "../../types/type";
import {
  mainDashBoardAtom,
  stateSixMonthAtom,
  stateVisitorAtom,
} from "../../atoms/third-atoms/admin/mainAtom";
import { useEffect } from "react";
import {
  getDashBoardData,
  getMainData,
  getSixMonthData,
  getVisitorData,
} from "../../apis/admin/mainpage";

const AdminMain = () => {
  // 최근일주일 방문자 수
  const [visitorData, setVisitorData] =
    useRecoilState<StateVisitorType[]>(stateVisitorAtom);
  // 6개월 총매출 조회

  const [sixMonthData, setSixMonthData] =
    useRecoilState<StateSixMonthType[]>(stateSixMonthAtom);
  // 대쉬 보드 API
  const [dashBoardData, setDashBoardData] =
    useRecoilState<StatesDashType>(mainDashBoardAtom);
  console.log("방문자 : ", visitorData);
  console.log("6개월 : ", sixMonthData);
  console.log("대쉬보드 : ", dashBoardData);
  // useEffect(() => {
  //   getMainData(setDashBoardData, setSixMonthData, setVisitorData);
  // }, []);
  useEffect(() => {
    getDashBoardData(setDashBoardData);
    getSixMonthData(setSixMonthData);
    getVisitorData(setVisitorData);
  }, []);
  return <div>AdminMain</div>;
};

export default AdminMain;
