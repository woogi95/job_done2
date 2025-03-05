import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import { loginApi } from "../../../apis/login";
import { setCookie } from "../../../utils/Cookie";
import {
  ApiError,
  MessageType,
  RoomType,
} from "../../../types/MessageCenterType";

function MessageCenter() {
  //   const [cookies] = useCookies<string>([""]);
  const [cookies] = useCookies(["roomId"]);
  const roomId = cookies.roomId;
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [connected, setConnected] = useState<boolean>(false);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [roomList, setRoomList] = useState<RoomType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
  // const roomId = useRecoilValue(checkRoom);

  const IMAGE_BASE_URL = "http://112.222.157.157:5234";

  // 메시지 컨테이너에 대한 ref 추가
  const messageContainerRef = useRef<HTMLDivElement | null>(null);

  // roomId 변화 감지를 위한 useEffect 추가
  useEffect(() => {
    console.log("Current roomId:", roomId);
  }, [roomId]);

  // 메시지가 업데이트될 때마다 스크롤을 아래로 이동시키는 useEffect 추가
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
    let ws: WebSocket | null = null;
    let reconnectAttempts = 0;
    const maxReconnectAttempts = 5;

    const connectWebSocket = () => {
      if (!roomId) {
        console.log("roomId가 없습니다.");
        return;
      }
      ws = new WebSocket(`ws://112.222.157.157:5234/chat/${roomId}`);

      ws.onopen = () => {
        console.log("웹소켓 연결 성공!");
        setConnected(true);
        setSocket(ws);
        reconnectAttempts = 0;
      };

      ws.onmessage = event => {
        console.log("웹소켓에서 수신한 데이터:", event.data);
        console.log("웹소켓에서 수신한 데이터:", event);

        try {
          let messageData: MessageType = {} as MessageType;
          console.log("Raw message received:", event.data);

          if (event.data instanceof Blob) {
            const reader = new FileReader();
            reader.onload = () => {
              try {
                if (typeof reader.result === "string") {
                  messageData = JSON.parse(reader.result);
                  // if (!messageData.username) {
                  //   messageData.username = username;
                  // }
                  console.log("Parsed Blob message:", messageData);
                  setMessages(prevMessages => {
                    const isDuplicate = prevMessages.some(
                      msg =>
                        msg.message === messageData.message &&
                        msg.username === messageData.username &&
                        JSON.stringify(msg.file) ===
                          JSON.stringify(messageData.file),
                    );
                    return isDuplicate
                      ? prevMessages
                      : [...prevMessages, messageData];
                  });
                }
              } catch (error) {
                console.error("Blob 데이터 파싱 에러:", error);
              }
            };
            reader.readAsText(event.data);
          } else if (event.data instanceof ArrayBuffer) {
            const decoder = new TextDecoder();
            const jsonStr = decoder.decode(event.data);
            messageData = JSON.parse(jsonStr);
            if (!messageData.username) {
              messageData.username = username;
            }
            console.log("Parsed ArrayBuffer message:", messageData);
            setMessages(prevMessages => {
              const isDuplicate = prevMessages.some(
                msg =>
                  msg.message === messageData.message &&
                  msg.username === messageData.username &&
                  JSON.stringify(msg.file) === JSON.stringify(messageData.file),
              );
              return isDuplicate
                ? prevMessages
                : [...prevMessages, messageData];
            });
          } else {
            const rawData = event.data;
            if (
              typeof rawData === "string" &&
              rawData.startsWith("새 메세지: ")
            ) {
              messageData = JSON.parse(rawData.substring(6));
            } else {
              messageData = JSON.parse(rawData);
            }
            if (!messageData.username) {
              messageData.username = username;
            }
            console.log("Parsed string message:", messageData);
            setMessages(prevMessages => {
              const isDuplicate = prevMessages.some(
                msg =>
                  msg.message === messageData.message &&
                  msg.username === messageData.username &&
                  JSON.stringify(msg.file) === JSON.stringify(messageData.file),
              );
              return isDuplicate
                ? prevMessages
                : [...prevMessages, messageData];
            });
          }

          // 디버깅용 로그
          if (messageData) {
            console.log("수신된 메시지:", {
              ...messageData,
              file: messageData.file
                ? {
                    ...messageData.file,
                    data: messageData.file.data
                      ? messageData.file.data.substring(0, 50) + "..."
                      : null,
                  }
                : null,
            });
          }
        } catch (error) {
          console.error("메시지 파싱 에러:", error);
          console.log("파싱 실패한 원본 데이터:", event.data);
        }
      };

      ws.onerror = error => {
        console.error("웹소켓 연결 에러:", error);
      };

      ws.onclose = () => {
        console.log("웹소켓 연결 종료");
        setConnected(false);
        setSocket(null);

        // 재연결 시도
        if (reconnectAttempts < maxReconnectAttempts) {
          console.log(`${reconnectAttempts + 1}번째 재연결 시도...`);
          reconnectAttempts++;
          setTimeout(connectWebSocket, 3000); // 3초 후 재연결 시도
        }
      };
    };

    connectWebSocket();

    // 컴포넌트 언마운트 시 연결 종료
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [roomId]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
    } else {
      alert("이미지 파일만 선택해주세요.");
    }
  };

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (socket && socket.readyState === WebSocket.OPEN) {
      try {
        let messageData: MessageType;
        if (selectedImage) {
          const reader = new FileReader();
          reader.onload = async () => {
            if (!reader.result) return;
            if (typeof reader.result !== "string") return;
            const fileData = {
              name: selectedImage.name,
              type: selectedImage.type,
              data: reader.result.split(",")[1],
            };
            messageData = {
              flag: 0,
              roomId: roomId,
              message: inputMessage,
              file: fileData,
              // contents: inputMessage,
            };

            // JSON을 문자열로 변환
            const jsonString = JSON.stringify(messageData);
            const blob = new Blob([jsonString], { type: "application/json" });
            const arrayBuffer = await blob.arrayBuffer();
            socket.send(arrayBuffer);

            // 이미지 메시지도 로컬 메시지 목록에 즉시 추가
            setMessages(prevMessages => [...prevMessages, messageData]);

            // 디버깅용 로그
            console.log("전송할 메시지 데이터:", {
              ...messageData,
              file: messageData.file
                ? {
                    ...messageData.file,
                    data: messageData.file.data.substring(0, 50) + "...",
                  }
                : null,
            });
          };
          reader.readAsDataURL(selectedImage);
        } else {
          messageData = {
            flag: 0,
            roomId: roomId,
            message: inputMessage,
            // contents: inputMessage,
          };

          // 직접 문자열로 전송하지 않고 Blob과 ArrayBuffer를 사용
          const jsonString = JSON.stringify(messageData);
          const blob = new Blob([jsonString], { type: "application/json" });
          const arrayBuffer = await blob.arrayBuffer();
          socket.send(arrayBuffer);

          // 로컬 메시지 목록에 추가 (즉시 화면에 표시)
          setMessages(prevMessages => [...prevMessages, messageData]);
        }

        setInputMessage("");
        setSelectedImage(null);
        const fileInput = document.getElementById(
          "image-upload",
        ) as HTMLInputElement;
        if (fileInput) fileInput.value = "";
      } catch (error) {
        console.error("메시지 전송 실패:", error);
      }
    } else {
      console.log("Socket status:", socket?.readyState);
      alert("채팅 서버에 연결되어 있지 않습니다.");
    }
  };

  const getRoomList = async () => {
    try {
      setLoading(true);
      const businessId = localStorage.getItem("businessId");
      const res = await loginApi.get("/api/room", {
        params: {
          business_id: businessId,
        },
      });
      console.log("뭐 들어옴", res.data);
      if (Array.isArray(res.data.resultData)) {
        setRoomList(res.data.resultData);
      } else {
        setRoomList([]);
      }
    } catch (error: unknown) {
      const apiError = error as ApiError;
      console.error("채팅방 목록 조회 실패:", apiError.response || apiError);
      setRoomList([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchChatMessages = async (roomId: number) => {
    try {
      const res = await loginApi.get("/api/chat", {
        params: {
          room_id: roomId,
        },
      });
      console.log("채팅 메시지:", res.data);
      if (res.data && Array.isArray(res.data.resultData)) {
        setMessages(res.data.resultData);
        console.log("채팅 메시지:", res.data.resultData);
      } else {
        setMessages([]);
      }
    } catch (error) {
      console.error("채팅 메시지 조회 실패:", error);
      setMessages([]);
    }
  };

  const handleRoomSelect = (roomId: number) => {
    setSelectedRoomId(roomId);
    setCookie("roomId", roomId, {
      path: "/",
      expires: new Date(Date.now() + 6 * 60 * 60 * 1000),
    });
    fetchChatMessages(roomId);
    console.log("선택된 방번호", roomId);
  };

  const handleChatDelete = async () => {
    try {
      const res = await loginApi.delete("/api/room", {
        data: {
          roomId: roomId,
        },
      });
      console.log("삭제 결과", res.data);
      window.location.reload(); // 삭제 완료 후 페이지 새로고침
    } catch (error) {
      console.error("채팅 삭제 실패:", error);
    }
  };

  useEffect(() => {
    getRoomList();
  }, []);

  const renderRoomItem = (item: RoomType) => (
    <div key={item.roomId}>
      <div className="flex p-[15px]">
        <button
          className="flex gap-[10px]"
          onClick={() => handleRoomSelect(item.roomId)}
        >
          <img
            src={
              item.logo
                ? `${IMAGE_BASE_URL}${item.logo}`
                : "/default-profile.png"
            }
            alt="업체 이미지"
            className="w-[50px] h-[50px] rounded-full object-cover"
          />
          <div className="flex flex-col gap-[5px] text-left w-full">
            <span className="text-[12px] font-semibold text-left">
              {item.businessName}
            </span>
            <div className="truncate font-[14px] text-left">
              {item.title.length > 14
                ? `${item.title.slice(0, 14)}...`
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

  const LoadingSpinner = () => (
    <div className="flex justify-center items-center p-[20px]">
      <AiOutlineLoading3Quarters className="animate-spin text-[#34C5F0] text-2xl" />
    </div>
  );

  return (
    <div className="flex justify-center items-center">
      <div className="flex">
        {/* Room items container */}
        <div className="flex justify-center w-[280px] h-[800px] bg-[#FFFFFF] overflow-hidden">
          {/* 메시지 리스트 */}
          <div className="flex flex-col w-full overflow-y-auto">
            {loading ? (
              <LoadingSpinner />
            ) : !roomList || roomList.length === 0 ? (
              <div className="flex justify-center items-center h-full text-gray-500">
                활성화된 채팅이 없습니다
              </div>
            ) : (
              roomList.map(renderRoomItem)
            )}
          </div>
        </div>

        {/* Message container */}
        <div className="flex flex-col h-[800px] w-[500px] bg-[#F5F5F5]">
          {/* 상태 표시 헤더 */}
          <div className="flex p-[10px] justify-between items-center h-[80px] w-full bg-[#EEEEEE] shadow-[0_4px_5px_-6px_rgba(0,0,0,0.2)]">
            <div className="flex gap-[5px]">
              <img
                src={`${IMAGE_BASE_URL}${roomList.find(room => room.roomId === roomId)?.logo}`}
                alt="Profile"
                className="w-[45px] h-[45px] rounded-full"
              />
              <span className="flex justify-center items-center text-[24px] font-semibold pl-[10px]">
                {roomList.find(room => room.roomId === roomId)?.businessName}
              </span>
            </div>
            <button
              onClick={handleChatDelete}
              className="text-[16px] text-[#FF3044] font-semibold"
            >
              삭제하기
            </button>
          </div>

          {/* 메시지 컨테이너 */}
          <div
            ref={messageContainerRef}
            className="flex flex-col w-full p-[20px] flex-grow overflow-y-auto bg-white"
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-[10px] ${
                  msg.flag === 1 ? "justify-end" : "justify-start"
                } mb-4`}
              >
                {msg.flag === 1 && (
                  <img
                    src={`${IMAGE_BASE_URL}${msg.logo}`}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover order-2"
                  />
                )}
                <div
                  className={`flex ${
                    msg.flag === 1 ? "flex-row-reverse" : "flex-row"
                  } gap-3 max-w-[80%]`}
                >
                  <div
                    className={`flex flex-col ${
                      msg.flag === 0 ? "items-start" : "items-end"
                    }`}
                  >
                    <div
                      className={`p-3 rounded-lg ${
                        msg.flag === 0
                          ? "bg-[#F0F4FF] text-gray-800 rounded-bl-none"
                          : "bg-[#34C5F0] text-white rounded-br-none"
                      } shadow-sm`}
                    >
                      <div className="text-sm break-words whitespace-pre-wrap">
                        {msg.message !== "" ? msg.message : null}
                      </div>
                      {msg.file && msg.file.data && (
                        <div className="mt-2">
                          <img
                            src={`data:${msg.file.type};base64,${msg.file.data}`}
                            alt={msg.file.name}
                            className="max-w-[200px] rounded-lg p-[5px]"
                          />
                        </div>
                      )}
                      {msg.pics && msg.pics.length > 0 && (
                        <div className="mx-4 mb-4">
                          <img
                            src={`${IMAGE_BASE_URL}${msg.pics[0].pic}`}
                            alt={msg.pics[0].name}
                            className="max-w-[200px] rounded p-[px]"
                          />
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {msg.createdAt &&
                        new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 메시지 입력 영역 */}
          <div className="flex flex-col w-full bg-white border-t border-gray-200">
            {selectedImage && (
              <div className="flex gap-2 p-4 bg-gray-50">
                <div className="relative">
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Preview"
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedImage(null);
                      const fileInput = document.getElementById(
                        "image-upload",
                      ) as HTMLInputElement;
                      if (fileInput) fileInput.value = "";
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    ×
                  </button>
                </div>
              </div>
            )}

            <form
              onSubmit={handleSendMessage}
              className="flex items-center w-full p-4 gap-3"
            >
              <div className="relative flex-1">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={e => setInputMessage(e.target.value)}
                  placeholder="메시지를 입력하세요"
                  className="w-full px-4 py-2 pl-12 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#34C5F0] focus:border-transparent"
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
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 cursor-pointer hover:opacity-80 transition-opacity"
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
                className="flex items-center justify-center w-10 h-10 bg-[#34C5F0] rounded-full hover:bg-[#2BAED8] transition-colors"
              >
                <FiSend className="text-lg text-white" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageCenter;
