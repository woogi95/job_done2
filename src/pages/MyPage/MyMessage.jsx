import { Stomp } from "@stomp/stompjs";
import axios from "axios";
import { useEffect, useState } from "react";
import { FiSend } from "react-icons/fi";
import SockJS from "sockjs-client";
import { loginApi } from "../../apis/login";
import MyPageLayout from "../../components/MyPageLayout";

const socket = new SockJS("http://192.168.0.195:5173/chat");
const stompClient = Stomp.over(() => socket);

export const runSocket = () => {
  stompClient.reconnectDelay = 5000;
  stompClient.onConnect = frame => {
    console.log("Connected: " + frame);
  };
  stompClient.onError = frame => {
    console.log("Connected: " + frame);
  };
  stompClient.activate();
};

function MyMessage() {
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chatRooms, setChatRooms] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);

  const IMAGE_BASE_URL = "http://112.222.157.156:5224";

  // 방 리스트
  const chatRoomList = async () => {
    try {
      setLoading(true);
      const res = await loginApi.get("/api/room");
      console.log("API 리스폰스:", res.data);
      if (res.data && Array.isArray(res.data.resultData)) {
        setChatRooms(res.data.resultData);
      } else {
        console.error("리스폰스 실패 : ", res.data);
        setChatRooms([]);
      }
    } catch (error) {
      console.error("채팅방 목록 조회 실패:", error.response || error);
      setChatRooms([]);
    } finally {
      setLoading(false);
    }
  };

  // 채팅 조회
  const fetchChatMessages = async roomId => {
    try {
      const res = await loginApi.get("/api/chat", {
        params: { roomId },
      });
      console.log("채팅 메시지:", res.data);
      if (res.data && Array.isArray(res.data.resultData)) {
        setChatMessages(res.data.resultData);
      } else {
        setChatMessages([]);
      }
    } catch (error) {
      console.error("채팅 메시지 조회 실패:", error);
      setChatMessages([]);
    }
  };

  const handleRoomSelect = roomId => {
    setSelectedRoomId(roomId);
    fetchChatMessages(roomId);
    console.log("선택된 방 번호:", roomId);
  };

  const sendMessage = async () => {
    if (!selectedRoomId || !message.trim()) return;

    const messageData = {
      p: {
        roomId: selectedRoomId,
        contents: message,
        flag: 1,
      },
    };

    if (selectedImages.length > 0) {
      messageData.pics = selectedImages.map(image => image.name);
    }

    const data = JSON.stringify(messageData);
    console.log("전송하려는 데이터:", data);

    try {
      const res = await axios.post("/api/chat", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("메시지 전송 응답:", res.data);
      await fetchChatMessages(selectedRoomId);
      setMessage("");
      setSelectedImages([]);
    } catch (error) {
      console.error("메시지 전송 에러:", error.response?.data || error);
      console.log("전체 에러 객체:", error);
    }
  };

  const handleImageUpload = event => {
    const files = Array.from(event.target.files);
    setSelectedImages(files);
    console.log("선택된 이미지:", files);
  };

  const handleSendMessage = sendMessage;

  useEffect(() => {
    chatRoomList();
  }, []);

  const renderRoomItem = item => (
    <div key={item.roomId}>
      <div className="flex justify-center items-center p-[20px]">
        <button
          className="flex gap-[10px]"
          onClick={() => handleRoomSelect(item.roomId)}
        >
          <img
            src={
              item.pic ? `${IMAGE_BASE_URL}${item.pic}` : "/default-profile.png"
            }
            alt="업체 이미지"
            className="w-[50px] h-[50px] rounded-full object-cover"
          />
          <div className="flex flex-col gap-[5px] text-left w-full">
            <span className="text-[12px] font-semibold text-left">
              {item.businessName}
            </span>
            <div className="truncate font-[14px] text-left">
              {item.title.length > 15
                ? `${item.title.slice(0, 15)}...`
                : item.title}
            </div>
            <div className="text-[12px] text-[#B8B8B8] text-left">
              {item.roomCreatedAt}
            </div>
          </div>
        </button>
      </div>
      <div className="flex justify-center w-full">
        <div className="flex justify-center items-center h-[1px] bg-[#DBDBDB] w-[85%]"></div>
      </div>
    </div>
  );

  return (
    <MyPageLayout>
      <div className="flex justify-center items-center pb-[50px]">
        <span className="text-[24px] font-normal">메시지함</span>
      </div>
      <div className="flex justify-center w-full">
        <div className="flex justify-between items-start w-[780px]">
          <div className="flex justify-center w-[280px] h-[800px] bg-[#ffffff] overflow-hidden">
            {/* 메시지 리스트 */}
            <div className="flex flex-col gap-[10px] w-full overflow-y-auto">
              {loading ? (
                <div className="flex justify-center items-center p-[20px]">
                  로딩중...
                </div>
              ) : !chatRooms || chatRooms.length === 0 ? (
                <div className="flex justify-center items-center h-full text-gray-500">
                  활성화된 채팅이 없습니다
                </div>
              ) : (
                chatRooms.map(renderRoomItem)
              )}
            </div>
          </div>
          {/* 상세 메시지 */}
          <div className="flex flex-col h-[800px] w-[500px] bg-[#F5F5F5] ml-0">
            {selectedRoomId ? (
              <div className="flex flex-col h-full w-full">
                {/* 업체 정보 */}
                <div className="flex p-[10px] items-center h-[80px] w-full bg-[#EEEEEE] shadow-[0_4px_5px_-6px_rgba(0,0,0,0.2)]">
                  <img
                    src={
                      chatRooms.find(item => item.roomId === selectedRoomId)
                        ?.pic
                        ? `${IMAGE_BASE_URL}${chatRooms.find(item => item.roomId === selectedRoomId)?.pic}`
                        : "/default-profile.png"
                    }
                    alt="업체 이미지"
                    className="w-[40px] h-[40px] rounded-full object-cover"
                  />
                  <span className="text-[24px] font-semibold pl-[10px]">
                    {
                      chatRooms.find(item => item.roomId === selectedRoomId)
                        ?.companyName
                    }
                  </span>
                </div>
                {/* 채팅내용 */}
                <div className="flex flex-col items-center w-full p-[20px] flex-grow overflow-y-auto">
                  <div className="w-full">
                    <div className="flex justify-center items-center border rounded-full w-full h-[24px] bg-[#ECEDF0] text-[12px] text-[#A2A2A2]">
                      <span className="text-center m-3">
                        {
                          chatRooms.find(item => item.roomId === selectedRoomId)
                            ?.roomCreatedAt
                        }
                      </span>
                    </div>
                  </div>
                  {chatMessages.map(chat => (
                    <div
                      key={chat.chatId}
                      className={`flex ${
                        chat.flag === 1 ? "self-end" : "self-start"
                      } gap-[10px] py-[15px]`}
                    >
                      {chat.flag === 0 && (
                        <img
                          src={
                            chat.logo
                              ? `${IMAGE_BASE_URL}${chat.logo}`
                              : "/default-profile.png"
                          }
                          alt="프로필 이미지"
                          className="w-[40px] h-[40px] rounded-full object-cover"
                        />
                      )}
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
                                src={`${IMAGE_BASE_URL}${pic}`}
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
                {/* 메시지 입력 */}
                <div className="flex justify-center items-center w-full h-[70px] bg-[#EDF0F8] mt-auto gap-[5px]">
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
                      placeholder="메시지를 입력해주세요."
                      className="flex justify-center items-center w-full h-[40px] border rounded-full shadow-[0_3px_3px_-3px_rgba(0,0,0,0.2)] pl-[50px]"
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === "Enter" && message.trim()) {
                          e.preventDefault();
                          handleSendMessage();
                          setMessage("");
                        }
                      }}
                    />
                  </div>
                  <button
                    className="flex justify-center items-center w-[40px] h-[40px] bg-[#34C5F0] rounded-full"
                    onClick={() => {
                      if (message.trim()) {
                        handleSendMessage();
                        setMessage("");
                      }
                    }}
                  >
                    <FiSend className="text-[24px] text-white ml-[-2px] mb-[-2px]" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center h-full text-gray-500">
                채팅방을 선택해주세요
              </div>
            )}
          </div>
        </div>
      </div>
    </MyPageLayout>
  );
}

export default MyMessage;
