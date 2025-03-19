import React from "react";
import { handleAllowNotification } from "../firebase/handleNotification";

const NotificationButton = () => {
  return <button onClick={handleAllowNotification}>🔔 알림 허용하기</button>;
};

export default NotificationButton;
