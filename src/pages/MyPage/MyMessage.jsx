import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import { loginApi } from "../../apis/login";
import { setCookie } from "../../utils/Cookie";
import MyPageLayout from "../../components/MyPageLayout";

function ContactUs() {
  const [cookies] = useCookies(["roomId"]);
  const roomId = cookies.roomId;
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [username, setUsername] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [roomList, setRoomList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  // const roomId = useRecoilValue(checkRoom);

  const IMAGE_BASE_URL = "http://112.222.157.157:5234";

  // 메시지 컨테이너에 대한 ref 추가
  const messageContainerRef = useRef(null);

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
    let ws;
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

        // 연결 성공 시 기존 메시지 요청
        fetchChatMessages(roomId);
      };

      ws.onmessage = async event => {
        console.log("웹소켓에서 수신한 데이터:", event.data);

        try {
          // Blob 데이터인 경우 바로 텍스트로 변환
          const messageText =
            event.data instanceof Blob ? await event.data.text() : event.data;

          // JSON 파싱
          const messageData = JSON.parse(messageText);

          // 메시지 즉시 추가 (중복 체크 없이 바로 추가)
          setMessages(prevMessages => [...prevMessages, messageData]);
        } catch (error) {
          console.error("메시지 처리 에러:", error);
        }
      };

      ws.onerror = error => {
        console.error("웹소켓 연결 에러:", error);
      };

      ws.onclose = () => {
        console.log("웹소켓 연결 종료");
        setConnected(false);
        setSocket(null);

        if (reconnectAttempts < maxReconnectAttempts) {
          console.log(`${reconnectAttempts + 1}번째 재연결 시도...`);
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
      alert("이미지 파일만 선택해주세요.");
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
      console.log("Socket status:", socket?.readyState);
      alert("채팅 서버에 연결되어 있지 않습니다.");
    }
  };

  const getRoomList = async () => {
    try {
      setLoading(true);
      const res = await loginApi.get("/api/room");
      console.log("뭐 들어옴", res.data);
      if (Array.isArray(res.data.resultData)) {
        setRoomList(res.data.resultData);
      } else {
        setRoomList([]);
      }
    } catch (error) {
      console.error("채팅방 목록 조회 실패:", error.response || error);
      setRoomList([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchChatMessages = async roomId => {
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

  const handleRoomSelect = roomId => {
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

  const renderRoomItem = item => (
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
    <MyPageLayout>
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
            className="flex flex-col items-center w-full p-[20px] flex-grow overflow-y-auto"
          >
            {messages.map((msg, index) => {
              // console.log(`Message ${index}:`, msg.pic); // 메시지 데이터 로깅 추가
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
                        : "bg-white rounded-tr-[8px]"
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
      </div>
    </MyPageLayout>
  );
}

export default ContactUs;
