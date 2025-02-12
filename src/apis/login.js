import axios from "axios";
import Cookies from "js-cookie";

// Axios 인스턴스 생성
export const loginApi = axios.create({
  withCredentials: true, // RefreshToken이 쿠키에 포함되도록 설정
});

// 모든 요청에 AccessToken 자동 포함
loginApi.interceptors.request.use(
  config => {
    // const accessToken = Cookies.get("refreshToken");
    const accessToken = Cookies.get("accessToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  error => Promise.reject(error),
);

loginApi.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // 401 오류 발생
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        //새로운 AccessToken 요청
        const res = await axios.post(
          `/api/user/access-token`,
          {},
          { withCredentials: true }, // ✅ 쿠키 포함 요청
        );

        if (res.data.accessToken) {
          const newAccessToken = res.data.accessToken;

          // 쿠키에 새 accessToken저장
          Cookies.set("accessToken", newAccessToken, {
            httpOnly: false, // `HttpOnly` 옵션을 사용할 경우 JS에서 설정 불가
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            path: "/", // 전체 도메인에서 쿠키 접근 가능하도록 설정
          });

          // 새 accessToken으로 헤더 업데이트
          loginApi.defaults.headers.common["Authorization"] =
            `Bearer ${newAccessToken}`;
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return loginApi(originalRequest);
        }
      } catch (err) {
        console.error("AccessToken 갱신 실패", err);
        alert("세션이 만료되었습니다. 다시 로그인해주세요.");

        // 쿠키에서 accessToken 삭제
        Cookies.remove("accessToken");

        window.location.href = "/login"; // 로그인 페이지로 이동
      }
    }
    return Promise.reject(error);
  },
);
