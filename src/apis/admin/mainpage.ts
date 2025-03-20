import {
  BarDayUserDataType,
  DayUserDataType,
  StateCatePerType,
  StatesDashType,
  StateVisitorType,
} from "../../types/type";

import { loginApi } from "../login";

// 전체 데이터 불러오기
export const getMainData = async (
  setDashBoardData: (data: StatesDashType) => void,

  setVisitorData: (data: StateVisitorType[]) => void,
  setDcVisitorData: (data: BarDayUserDataType) => void,
  setCatePer: (data: StateCatePerType[]) => void,
) => {
  await getDashBoardData(setDashBoardData);

  await getVisitorData(setVisitorData, setDcVisitorData);
  await getCatePer(setCatePer);
};

// 대쉬 보드 API

export const getDashBoardData = async (
  setDashBoardData: (data: StatesDashType) => void,
) => {
  try {
    const res = await loginApi.get("/api/admin/statesDashBoard");
    // console.log(res);
    if (res) {
      const filterData = res.data.resultData;
      setDashBoardData(filterData);
    }
  } catch (error) {
    console.log(error);
  }
};

// 최근일주일 방문자 수

export const getVisitorData = async (
  setVisitorData: (data: StateVisitorType[]) => void,
  setDcVisitorData: (data: BarDayUserDataType) => void, // ✅ 타입 수정
) => {
  try {
    const res = await loginApi.get("/api/admin/statsVisitor");
    if (res) {
      const filterData = res.data.resultData;

      // ✅ 방문자 데이터 변환
      const nivoData: DayUserDataType[] = filterData.map(
        (item: DayUserDataType) => ({
          date: item.date.slice(5), // ✅ "2025-03-04" → "03-04" 변환
          visitorCount: item.visitorCount, // ✅ 방문자 수
        }),
      );

      // ✅ Bar 차트 데이터 변환
      const barChartData: BarDayUserDataType = {
        data: nivoData, // ✅ 배열 형태 유지
        keys: ["visitorCount"], // ✅ visitorCount만 차트에 표시
        indexBy: "date", // ✅ X축을 "date" 기준으로 설정
      };

      setVisitorData(filterData);
      setDcVisitorData(barChartData); // ✅ 올바른 데이터 저장
    }
  } catch (error) {
    console.log(error);
  }
};

// 카테고리 비율
export const getCatePer = async (
  setCatePer: (data: StateCatePerType[]) => void,
) => {
  try {
    const res = await loginApi.get("/api/admin/statsCategory");
    if (res) {
      const filterData = res.data.resultData;
      setCatePer(filterData);
    }
  } catch (error) {
    console.log(error);
  }
};
