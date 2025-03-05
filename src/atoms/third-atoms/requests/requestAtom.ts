import { atom } from "recoil";
import { BusinessApplyType } from "../../../types/type";

// 업체 등록 요청
export const requestBusiAtom = atom<BusinessApplyType[][]>({
  key: "requestBusiAtom",
  default: [
    [
      {
        applicationCreatedAt: "",
        paper: "",
        detailTypeName: "",
        userName: "",
        businessName: "",
        state: 0,
        businessId: 0,
      },
    ],
  ],
});

// 업체 등록 요청 취소 모달
export const cancelStateAtom = atom<boolean>({
  key: "cancelStateAtom",
  default: false,
});
// 업체 등록 요청 수락 모달
export const approveStateAtom = atom<boolean>({
  key: "approveStateAtom",
  default: false,
});

// 업체 등록 취소 코멘트 상태
export const cancelCommentAtom = atom<string>({
  key: "cancelCommentAtom",
  default: "",
});
// businessId 저장
export const reqBusinessIdAtom = atom<number>({
  key: "reqBusinessIdAtom",
  default: 0,
});
