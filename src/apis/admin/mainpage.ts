import {
  StatesDashType,
  StateSixMonthType,
  StateVisitorType,
} from "../../types/type";

import axios from "axios";

// 전체 데이터 불러오기
export const getMainData = async (
  setDashBoardData: (data: StatesDashType) => void,
  setSixMonthData: (data: StateSixMonthType[]) => void,
  setVisitorData: (data: StateVisitorType[]) => void,
) => {
  await getDashBoardData(setDashBoardData);
  await getSixMonthData(setSixMonthData);
  await getVisitorData(setVisitorData);
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
  setSixMonthData: (data: StateSixMonthType[]) => void,
) => {
  try {
    const res = await axios.get("/api/admin/statsSales");
    console.log(res);
    if (res) {
      const filterData = res.data.resultData;
      setSixMonthData(filterData);
    }
  } catch (error) {
    console.log(error);
  }
};

// 최근일주일 방문자 수

export const getVisitorData = async (
  setVisitorData: (data: StateVisitorType[]) => void,
) => {
  try {
    const res = await axios.get("/api/admin/statsVisitor");
    console.log(res);
    if (res) {
      const filterData = res.data.resultData;
      setVisitorData(filterData);
    }
  } catch (error) {
    console.log(error);
  }
};
