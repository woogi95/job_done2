import { atom } from "recoil";

// 비밀번호 확인 상태
export const upwCheck = atom({
  key: "upwCheck",
  default: false,
});
// 비밀번호 틀림 모달창
export const isOpenModalUpw = atom({
  key: "isOpenModalUpw",
  default: false,
});
// 로그인 유저
export const loginUser = atom({
  key: "loginUser",
  default: {
    name: "",
    email: "",
    phone: "",
    pic: "",
    accessToken: "",
    isLogind: false,
  },
});

export const emailForm = atom({
  key: "emailForm",
  default: {
    email: "",
  },
});
// 유저 폼 저장 상태
export const joinUserState = atom({
  key: "joinUserState",
  default: { name: "", email: "", upw: "", upwConfirm: "", phone: "", pic: "" },
});
// 이메일 중복확인 모달
export const emailDouble = atom({
  key: "emailDouble",
  default: true,
});
export const emailDub = atom({
  key: "emailDub",
  default: true,
});
// 이메일 확인 눌러주세요 모달
export const emailTry = atom({
  key: "emailTry",
  default: false,
});
// 이메일 인증완료 모달
export const openModalEmail = atom({
  key: "openModalEmail",
  default: false,
});

// 이메일 인증 인풋 시간
export const countDownCheck = atom({
  key: "countDownCheck",
  default: 180,
});

// 프로필사진 관리
export const profilFile = atom({
  key: "profilFile",
  default: null,
});

// 로그인 상태 저장 테스트용
export const isLoginState = atom({
  key: "isLoginState",
  default: {
    isLogind: false,
    userId: "",
  },
});

// export const myUserInfo = atom({
//   key: "myUserInfo",
//   default: {
//     userId: 0,
//     name: "",
//     email: "",
//     number: "",
//     pic: "",
//   },
// });
