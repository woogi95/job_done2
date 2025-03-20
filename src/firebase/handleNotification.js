import { getToken } from "firebase/messaging";
import { sendTokenToServer } from "../apis/notificationApi";
import { registerServiceWorker } from "./registerServiceWorker";
import { messaging } from "./notificationPermission";

export async function handleAllowNotification() {
  registerServiceWorker(); // 나중에 설명
  try {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey:
          "BK-vwbucawPh7KRPU9KpdLUTpV5Mi7s0ufRE1T4R6n7pSMSGoDpCG2Of4eGjX-jZxwktl-FaEO9NmXKgOJOIPDo",
      });
      if (token) {
        sendTokenToServer(token); // (토큰을 서버로 전송하는 로직)
      } else {
        alert("토큰 등록이 불가능 합니다. 생성하려면 권한을 허용해주세요");
      }
    } else if (permission === "denied") {
      alert(
        "web push 권한이 차단되었습니다. 알림을 사용하시려면 권한을 허용해주세요",
      );
    }
  } catch (error) {
    console.error("푸시 토큰 가져오는 중에 에러 발생", error);
  }
}
