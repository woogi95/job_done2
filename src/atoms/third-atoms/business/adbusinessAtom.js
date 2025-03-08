import { atom } from "recoil";

export const businessDetailAtom = atom({
  key: "businessDetailAtom",
  default: {
    logo: null,
    detailTypeId: 0,
    detailTypeName: null,
    businessId: 0,
    businessName: null,
    title: null,
    scoreAvg: 0,
    price: 0,
    like: 0,
    address: null,
    serviceCount: 0,
    openingTime: null,
    closingTime: null,
    years: 0,
    contents: null,
    reviewCount: 0,
    tel: null,
    safeTel: null,
    businessNum: "",
  },
});
