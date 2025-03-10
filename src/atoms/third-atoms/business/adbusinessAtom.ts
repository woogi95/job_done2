import { atom } from "recoil";
import { BusinessInfoType } from "../../../components/admin/admin-business-info/AdminBusinessInfo";

export const businessDetailAtom = atom<BusinessInfoType>({
  key: "businessDetailAtom",
  default: {
    logo: "",
    detailTypeId: 0,
    detailTypeName: "",
    businessId: 0,
    businessName: "",
    title: "",
    scoreAvg: 0,
    price: 0,
    like: 0,
    address: "",
    serviceCount: 0,
    openingTime: "",
    closingTime: "",
    years: 0,
    contents: "",
    reviewCount: 0,
    tel: "",
    safeTel: "",
    businessNum: "",
  },
});
