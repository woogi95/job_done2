import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { FiSend } from "react-icons/fi";

function ContactUs() {
  const [cookies] = useCookies(["roomId"]);
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [username, setUsername] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const IMAGE_BASE_URL = "https://job-done.r-e.kr:52340";

  const messageContainerRef = useRef(null);
  const roomId = cookies.roomId;

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // username을 임시값으로 설정
  useEffect(() => {
    setUsername("User" + Math.floor(Math.random() * 1000));
  }, []);

  useEffect(() => {
    let ws;
    let reconnectAttempts = 0;
    const maxReconnectAttempts = 2;

    const connectWebSocket = () => {
      if (!roomId) {
        return;
      }
      ws = new WebSocket(`/chat/${roomId}`);

      ws.onopen = () => {
        setConnected(true);
        setSocket(ws);
        reconnectAttempts = 0;

        // 연결 성공 시 기존 메시지 요청
        fetchChatMessages(roomId);
      };

      ws.onmessage = async event => {
        try {
          const messageText =
            event.data instanceof Blob ? await event.data.text() : event.data;

          const messageData = JSON.parse(messageText);
          setMessages(prevMessages => [...prevMessages, messageData]);
        } catch (error) {
          console.error("메시지 처리 에러:", error);
        }
      };

      ws.onerror = error => {
        console.error("웹소켓 연결 에러:", error);
      };

      ws.onclose = () => {
        setConnected(false);
        setSocket(null);

        if (reconnectAttempts < maxReconnectAttempts) {
          reconnectAttempts++;
          setTimeout(connectWebSocket, 3000);
        }
      };
    };

    connectWebSocket();

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [roomId]);

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
    } else {
      alert(
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>오류!</AlertTitle>
          <AlertDescription>이미지 파일만 선택해주세요.</AlertDescription>
        </Alert>,
      );
    }
  };

  const handleSendMessage = async e => {
    e.preventDefault();

    if (socket && socket.readyState === WebSocket.OPEN) {
      try {
        let messageData;
        if (selectedImage) {
          const reader = new FileReader();
          reader.onload = async () => {
            const fileData = {
              name: selectedImage.name,
              type: selectedImage.type,
              data: reader.result.split(",")[1],
            };
            messageData = {
              flag: 1,
              roomId: roomId,
              message: inputMessage,
              file: fileData,
            };

            const jsonString = JSON.stringify(messageData);
            const blob = new Blob([jsonString], { type: "application/json" });
            const arrayBuffer = await blob.arrayBuffer();
            socket.send(arrayBuffer);
            setMessages(prevMessages => [...prevMessages, messageData]);
          };
          reader.readAsDataURL(selectedImage);
        } else {
          messageData = {
            flag: 1,
            roomId: roomId,
            message: inputMessage,
          };

          const jsonString = JSON.stringify(messageData);
          const blob = new Blob([jsonString], { type: "application/json" });
          const arrayBuffer = await blob.arrayBuffer();
          socket.send(arrayBuffer);
        }

        setInputMessage("");
        setSelectedImage(null);
        const fileInput = document.getElementById("image-upload");
        if (fileInput) fileInput.value = "";
      } catch (error) {
        console.error("메시지 전송 실패:", error);
      }
    } else {
      setErrorMessage("채팅 서버에 연결되어 있지 않습니다.");
    }
  };

  return (
    <div className="flex flex-col h-[800px] w-[500px] bg-[#F5F5F5]">
      {errorMessage && (
        <Alert
          status="error"
          className="flex justify-center items-center animate-shake mb-[20px]"
        >
          <AlertIcon />
          <AlertTitle>오류!</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
      {/* 상태 표시 헤더 */}
      <div className="flex p-[10px] justify-center items-center h-[80px] w-full bg-[#EEEEEE] shadow-[0_4px_5px_-6px_rgba(0,0,0,0.2)]">
        <span className="flex text-[24px] font-semibold pl-[10px]">
          고객문의
        </span>
      </div>

      {/* 메시지 컨테이너 */}
      <div
        ref={messageContainerRef}
        className="flex flex-col items-center w-full p-[20px] flex-grow overflow-y-auto"
      >
        {messages.map((msg, index) => {
          return (
            <div
              key={index}
              className={`flex ${
                msg.flag === 1 ? "self-end" : "self-start"
              } gap-[10px] py-[15px]`}
            >
              {msg.flag === 0 && (
                <img
                  src={`${IMAGE_BASE_URL}${msg.logo}`}
                  alt="Profile"
                  className="w-[45px] h-[45px] rounded-full"
                />
              )}
              <span
                className={`flex flex-col justify-center items-start max-w-[240px] ${
                  msg.flag === 1
                    ? "bg-[#34C5F0] text-white rounded-tl-[8px]"
                    : "bg-[#f3f3f3] rounded-tr-[8px]"
                } rounded-bl-[8px] rounded-br-[8px] shadow-[0_4px_5px_-6px_rgba(0,0,0,0.2)]`}
              >
                <div className="m-4 break-all whitespace-pre-wrap">
                  {msg.message}
                </div>
                {msg.pic && (
                  <div className="mt-2">
                    <img
                      src={`${IMAGE_BASE_URL}${msg.pic}`}
                      alt="Uploaded content"
                      className="max-w-[200px] rounded-lg p-[5px]"
                    />
                  </div>
                )}
              </span>
            </div>
          );
        })}
      </div>

      {/* 메시지 입력 영역 */}
      <div className="flex flex-col w-full bg-[#EDF0F8] mt-auto">
        {selectedImage && (
          <div className="flex gap-2 p-2">
            <div className="relative">
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Preview"
                className="w-16 h-16 object-cover rounded"
              />
              <button
                type="button"
                onClick={() => {
                  setSelectedImage(null);
                  const fileInput = document.getElementById("image-upload");
                  if (fileInput) fileInput.value = "";
                }}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
              >
                ×
              </button>
            </div>
          </div>
        )}

        <form
          onSubmit={handleSendMessage}
          className="flex justify-center items-center w-full min-h-[60px] gap-[5px] p-2"
        >
          <div className="relative w-[70%]">
            <input
              type="text"
              value={inputMessage}
              onChange={e => setInputMessage(e.target.value)}
              placeholder="메시지를 입력하세요"
              className="flex justify-center items-center w-full h-[35px] border rounded-full shadow-[0_3px_3px_-3px_rgba(0,0,0,0.2)] pl-[50px]"
            />
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <label
              htmlFor="image-upload"
              className="absolute left-[15px] top-1/2 transform -translate-y-1/2 cursor-pointer"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19ZM8.5 13.5L11 16.51L14.5 12L19 18H5L8.5 13.5Z"
                  fill="#A2A2A2"
                />
              </svg>
            </label>
          </div>
          <button
            type="submit"
            className="flex justify-center items-center w-[35px] h-[35px] bg-[#34C5F0] rounded-full"
          >
            <FiSend className="text-[20px] text-white ml-[-2px] mb-[-2px]" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;
