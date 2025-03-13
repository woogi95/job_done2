import {
  BarDayUserDataType,
  DayUserDataType,
  SixMonthDataType,
  StateCatePerType,
  StatesDashType,
  StateSixMonthType,
  StateVisitorType,
} from "../../types/type";

import axios from "axios";

// 전체 데이터 불러오기
export const getMainData = async (
  setDashBoardData: (data: StatesDashType) => void,
  setSixMonthData: (data: StateSixMonthType[]) => void,
  setDcSixMonthData: (
    data: {
      [key: string]: string | number;
    }[],
  ) => void,
  setVisitorData: (data: StateVisitorType[]) => void,
  setDcVisitorData: (data: BarDayUserDataType) => void,
  setCatePer: (data: StateCatePerType[]) => void,
) => {
  await getDashBoardData(setDashBoardData);
  await getSixMonthData(setSixMonthData, setDcSixMonthData);
  await getVisitorData(setVisitorData, setDcVisitorData);
  await getCatePer(setCatePer);
};

// 대쉬 보드 API

export const getDashBoardData = async (
  setDashBoardData: (data: StatesDashType) => void,
) => {
  try {
    const res = await axios.get("/api/admin/statesDashBoard");
    console.log(res);
    if (res) {
      const filterData = res.data.resultData;
      setDashBoardData(filterData);
    }
  } catch (error) {
    console.log(error);
  }
};

// 6개월 총매출 조회

export const getSixMonthData = async (
  setSixMonthData: (data: SixMonthDataType[]) => void,
  setDcSixMonthData: (data: { [key: string]: string | number }[]) => void,
) => {
  try {
    const res = await axios.get("/api/admin/statsSales");
    if (res) {
      const filterData = res.data.resultData;
      setSixMonthData(filterData);

      // 데이터 가공 (Nivo 차트에 맞게 변환)
      const nivoData = filterData.map(
        (item: { [key: string]: string | number }) => ({
          month: String(item.month)
            .split("-")
            .map((val, idx) => (idx === 0 ? val.slice(2) : val))
            .join("-"),
          totalPrice: Number(item.totalPrice),
        }),
      );

      // Recoil 상태 업데이트
      setDcSixMonthData(nivoData);
    }
  } catch (error) {
    console.error("Error fetching six-month data:", error);
  }
};

// 최근일주일 방문자 수

export const getVisitorData = async (
  setVisitorData: (data: StateVisitorType[]) => void,
  setDcVisitorData: (data: BarDayUserDataType) => void, // ✅ 타입 수정
) => {
  try {
    const res = await axios.get("/api/admin/statsVisitor");
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
    const res = await axios.get("/api/admin/statsCategory");
    if (res) {
      const filterData = res.data.resultData;
      setCatePer(filterData);
    }
  } catch (error) {
    console.log(error);
  }
};
