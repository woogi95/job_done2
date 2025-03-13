import { atom } from "recoil";
import {
  BarDayUserDataType,
  cateDataType,
  detailDataType,
  StateCatePerType,
  StatesDashType,
  StateSixMonthType,
  StateVisitorType,
} from "../../../types/type";

export const mainDashBoardAtom = atom<StatesDashType>({
  key: "mainDashBoardAtom",
  default: {
    newServiceCount: 0,
    newServicePercent: 0,
    newUserCount: 0,
    newUserPercent: 0,
    unprocessedInquiries: 0,
    increaseUnprocessedInquiries: 0,
    newBusinessCount: 0,
    newBusinessCountThenYesterday: 0,
  },
});

export const stateSixMonthAtom = atom<StateSixMonthType[]>({
  key: "stateSixMonthAtom",
  default: [
    {
      month: "",
      totalPrice: 0,
      salesInfoDtos: [
        {
          categoryName: "",
          totalPrice: 0,
        },
      ],
    },
  ],
});

export const stateVisitorAtom = atom<StateVisitorType[]>({
  key: "stateVisitorAtom",
  default: [{ date: "", dateOfWeek: "", visitorCount: 0 }],
});

export const stateCatePerAtom = atom<StateCatePerType[]>({
  key: "stateCatePerAtom",
  default: [
    {
      categoryId: 0,
      categoryName: "",
      categoryCount: 0,
      categoryPercent: 0,
      detailTypeCounts: [
        {
          detailTypeId: 0,
          detailTypeName: "",
          count: 0,
          detailTypePercent: 0,
        },
      ],
    },
  ],
});

// 그래프 데이터 가공 atom
// 카테데이터
export const dcCateDataAtom = atom<cateDataType[]>({
  key: "dcCateDataAtom",
  default: [{ id: "", value: 0, count: 0 }],
});
// 카테>디테일 데이터
export const dcDetailDataAtom = atom<detailDataType[]>({
  key: "dcDetailDataAtom",
  default: [
    {
      id: "",
      value: 0,
      count: 0,
    },
  ],
});

// 6개월 데이터
export const dcSixMonthDataAtom = atom<{ [key: string]: string | number }[]>({
  key: "dcSixMonthDataAtom",
  default: [
    {
      month: "",
      totalPrice: 0,
    },
  ],
});

// 최근 일주일 유저
export const dcDaysUserDataAtom = atom<BarDayUserDataType>({
  key: "dcDaysUserDataAtom",
  default: {
    data: [
      {
        date: "",
        visitorCount: 0,
      },
    ],

    keys: ["visitorCount"],
    indexBy: "date",
  },
});
