export async function sendTokenToServer(token) {
  try {
    const response = await fetch("/api/savePushToken", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    console.log("서버 응답:", await response.json());
  } catch (error) {
    console.error("푸시 토큰 서버 전송 오류:", error);
  }
}
