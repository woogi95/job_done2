import { atom } from "recoil";
import { UserInfoType } from "../../../types/type";

export const adminUserInfoAtom = atom<UserInfoType>({
  key: "adminUserInfoAtom",
  default: {
    userName: "",
    phone: "",
    detailTypeName: "",
    serviceNumber: 0,
    userId: 0,
    type: "",
  },
});
