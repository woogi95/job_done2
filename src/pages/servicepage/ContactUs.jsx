import React, { useState, useRef, useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import { loginApi } from "../../apis/login";
import { useSearchParams } from "react-router-dom";

function ContactUs() {
  const [loading, setLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [roomId, setRoomId] = useState(null);
  const messageContainerRef = useRef(null);
  const IMAGE_BASE_URL = "http://112.222.157.157:5234";
  const [searchParams] = useSearchParams();
  const businessId = searchParams.get("businessId");

  // 새로운 채팅방 생성
  const createChatRoom = async () => {
    if (!businessId) return;

    try {
      setLoading(true);
      const res = await loginApi.post("/api/room", {
        businessId: businessId,
      });

      if (res.data && res.data.resultData) {
        setRoomId(res.data.resultData.roomId);
        return res.data.resultData.roomId;
      }
    } catch (error) {
      console.error("채팅방 생성 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 채팅방 생성
  useEffect(() => {
    createChatRoom();
  }, []);

  // 웹소켓 연결 설정
  useEffect(() => {
    if (!roomId) return;

    const ws = new WebSocket(`ws://112.222.157.157:5234/chat/${roomId}`);

    ws.onopen = () => {
      console.log("웹소켓 연결 성공!");
      setConnected(true);
      setSocket(ws);
    };

    ws.onmessage = async event => {
      try {
        const messageData = JSON.parse(event.data);
        setChatMessages(prev => [...prev, messageData]);
      } catch (error) {
        console.error("메시지 파싱 에러:", error);
      }
    };

    ws.onclose = () => {
      console.log("웹소켓 연결 종료");
      setConnected(false);
      setSocket(null);
    };

    return () => {
      if (ws) ws.close();
    };
  }, [roomId]);

  // 메시지 자동 스크롤
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // 메시지 전송 함수 수정
  const sendMessage = async () => {
    if (!roomId || (!message.trim() && selectedImages.length === 0)) return;

    try {
      const messageData = {
        flag: 1,
        roomId: roomId,
        message: message,
      };

      if (selectedImages.length > 0) {
        const imagePromises = selectedImages.map(async image => {
          return new Promise(resolve => {
            const reader = new FileReader();
            reader.onload = () => {
              resolve({
                name: image.name,
                type: image.type,
                data: reader.result.split(",")[1],
              });
            };
            reader.readAsDataURL(image);
          });
        });

        const processedImages = await Promise.all(imagePromises);
        messageData.file = processedImages[0];
      }

      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(messageData));

        // 로컬 메시지 추가
        const localMessage = {
          flag: 1,
          contents: message,
          pics:
            selectedImages.length > 0
              ? [URL.createObjectURL(selectedImages[0])]
              : [],
        };
        setChatMessages(prev => [...prev, localMessage]);

        setMessage("");
        setSelectedImages([]);

        // 파일 입력 초기화
        const fileInput = document.getElementById("imageUpload");
        if (fileInput) fileInput.value = "";
      }
    } catch (error) {
      console.error("메시지 전송 에러:", error);
    }
  };

  const handleImageUpload = event => {
    const files = Array.from(event.target.files);
    setSelectedImages(files);
    console.log("선택된 이미지:", files);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F5F5F5] p-4">
      <div className="w-full max-w-[500px] bg-white">
        <div className="flex p-[10px] items-center h-[80px] w-full bg-[#EEEEEE] shadow-[0_4px_5px_-6px_rgba(0,0,0,0.2)]">
          <h1 className="text-[18px] font-semibold pl-[10px]">문의하기</h1>
        </div>

        {loading ? (
          <div className="flex justify-center items-center p-[20px]">
            <AiOutlineLoading3Quarters className="animate-spin text-[#34C5F0] text-2xl" />
          </div>
        ) : (
          <div className="flex flex-col h-[600px]">
            <div
              className="flex flex-col items-center w-full p-[20px] flex-grow overflow-y-auto"
              ref={messageContainerRef}
            >
              {chatMessages.map((chat, index) => (
                <div
                  key={index}
                  className={`flex ${
                    chat.flag === 1 ? "self-end" : "self-start"
                  } gap-[10px] py-[15px]`}
                >
                  <span
                    className={`flex flex-col justify-center items-start max-w-[240px] ${
                      chat.flag === 1
                        ? "bg-[#34C5F0] text-white rounded-tl-[8px]"
                        : "bg-white rounded-tr-[8px]"
                    } rounded-bl-[8px] rounded-br-[8px] shadow-[0_4px_5px_-6px_rgba(0,0,0,0.2)]`}
                  >
                    <div className="m-4 break-all whitespace-pre-wrap">
                      {chat.contents}
                    </div>
                    {chat.pics && chat.pics.length > 0 && (
                      <div className="flex flex-col gap-2 mx-4 mb-4">
                        {chat.pics.map((pic, index) => (
                          <img
                            key={index}
                            src={
                              pic.startsWith("blob:")
                                ? pic
                                : `${IMAGE_BASE_URL}${pic}`
                            }
                            alt="첨부 이미지"
                            className="max-w-[200px] rounded"
                          />
                        ))}
                      </div>
                    )}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-center items-center w-full min-h-[60px] bg-[#EDF0F8] mt-auto gap-[5px] p-4">
              <div className="relative w-[70%]">
                <input
                  type="file"
                  id="imageUpload"
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                />
                <label
                  htmlFor="imageUpload"
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
                <input
                  type="text"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="메시지를 입력해주세요."
                  className="flex justify-center items-center w-full h-[35px] border rounded-full shadow-[0_3px_3px_-3px_rgba(0,0,0,0.2)] pl-[50px]"
                  onKeyDown={e => {
                    if (
                      e.key === "Enter" &&
                      (message.trim() || selectedImages.length > 0)
                    ) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                />
              </div>
              <button
                onClick={sendMessage}
                className="flex justify-center items-center w-[35px] h-[35px] bg-[#34C5F0] rounded-full"
              >
                <FiSend className="text-[20px] text-white ml-[-2px] mb-[-2px]" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContactUs;
