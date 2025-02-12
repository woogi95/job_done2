import { Cookies } from "react-cookie";

const cookies = new Cookies();

// 쿠키에 저장하기
export const setCookie = (name, value, options = {}) => {
  // 기존 쿠키가 있다면 먼저 삭제
  const existingCookie = cookies.get(name);
  if (existingCookie) {
    cookies.remove(name, { path: "/" });
  }
  // 새로운 쿠키 설정
  return cookies.set(name, value, { ...options });
};

// 쿠키에 데이터 읽기
export const getCookie = name => {
  return cookies.get(name);
};

// 쿠키 삭제하기
export const remove_cookie = name => {
  return cookies.remove(name, { path: "/" });
};
