import { atom } from "recoil";
import { CategoryBusiType } from "../../../types/type";

// 업체 등록 요청
export const requestBusiAtom = atom<CategoryBusiType>({
  key: "requestBusiAtom",
  default: {
    applicationCreatedAt: "",
    reviewScore: 0,
    reviewNumbers: 0,
    detailTypeName: "",
    userName: "",
    businessName: "",
    tel: "",
  },
});
