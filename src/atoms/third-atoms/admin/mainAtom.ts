import { atom } from "recoil";
import {
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
