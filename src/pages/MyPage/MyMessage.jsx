import { useEffect, useRef, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import { loginApi } from "../../apis/login";
import MyPageLayout from "../../components/MyPageLayout";
function MyMessage() {
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chatRooms, setChatRooms] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const IMAGE_BASE_URL = "http://112.222.157.157:5234";
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const messageContainerRef = useRef(null);

  // 방 리스트
  const chatRoomList = async () => {
    try {
      setLoading(true);
      const res = await loginApi.get("/api/room");
      console.log("API 리스폰스:", res.data);
      if (res.data && Array.isArray(res.data.resultData)) {
        setChatRooms(res.data.resultData);
        console.log("채팅방 목록:", res.data.resultData);
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
        params: {
          room_id: roomId,
        },
      });
      console.log("채팅 메시지:", res.data);
      if (res.data && Array.isArray(res.data.resultData)) {
        setChatMessages(res.data.resultData);
        console.log("채팅 메시지:", res.data.resultData);
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
  // 웹소켓 연결 설정
  useEffect(() => {
    if (!selectedRoomId) return;

    let ws;
    let reconnectAttempts = 0;
    const maxReconnectAttempts = 5;

    const connectWebSocket = () => {
      ws = new WebSocket(`ws://112.222.157.157:5234/chat/${selectedRoomId}`);

      ws.onopen = () => {
        console.log("웹소켓 연결 성공!");
        setConnected(true);
        setSocket(ws);
        reconnectAttempts = 0;
      };

      ws.onmessage = async event => {
        try {
          let messageData;
          console.log("Raw message received:", event.data);

          if (event.data instanceof Blob) {
            const reader = new FileReader();
            reader.onload = () => {
              try {
                messageData = JSON.parse(reader.result);
                console.log("Parsed Blob message:", messageData);
                setChatMessages(prevMessages => {
                  const isDuplicate = prevMessages.some(
                    msg => msg.chatId === messageData.chatId,
                  );
                  return isDuplicate
                    ? prevMessages
                    : [...prevMessages, messageData];
                });
              } catch (error) {
                console.error("Blob 데이터 파싱 에러:", error);
              }
            };
            reader.readAsText(event.data);
          } else if (event.data instanceof ArrayBuffer) {
            const decoder = new TextDecoder();
            const jsonStr = decoder.decode(event.data);
            messageData = JSON.parse(jsonStr);
            console.log("Parsed ArrayBuffer message:", messageData);
            setChatMessages(prevMessages => {
              const isDuplicate = prevMessages.some(
                msg => msg.chatId === messageData.chatId,
              );
              return isDuplicate
                ? prevMessages
                : [...prevMessages, messageData];
            });
          } else {
            messageData = JSON.parse(event.data);
            console.log("Parsed string message:", messageData);
            setChatMessages(prevMessages => {
              const isDuplicate = prevMessages.some(
                msg => msg.chatId === messageData.chatId,
              );
              return isDuplicate
                ? prevMessages
                : [...prevMessages, messageData];
            });
          }
        } catch (error) {
          console.error("메시지 파싱 에러:", error);
          console.log("파싱 실패한 원본 데이터:", event.data);
        }
      };

      ws.onclose = () => {
        console.log("웹소켓 연결 종료");
        setConnected(false);
        setSocket(null);

        // 재연결 시도 해보기
        if (reconnectAttempts < maxReconnectAttempts) {
          console.log(
            `재연결 시도 ${reconnectAttempts + 1}/${maxReconnectAttempts}`,
          );
          reconnectAttempts++;
          setTimeout(connectWebSocket, 3000);
        }
      };

      ws.onerror = error => {
        console.error("웹소켓 에러:", error);
      };
    };

    connectWebSocket();

    // 컴포넌트 언마운트 시 웹소켓 연결 종료
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [selectedRoomId]);

  // 메시지 자동 스크롤
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const sendMessage = async () => {
    if (!selectedRoomId || (!message.trim() && selectedImages.length === 0))
      return;

    try {
      if (!socket || socket.readyState !== WebSocket.OPEN) {
        console.error("웹소켓이 연결되어 있지 않습니다. 재연결을 시도합니다.");
        return;
      }

      const messageData = {
        flag: 1,
        roomId: selectedRoomId,
        message: message.trim() || "",
      };

      if (selectedImages.length > 0) {
        const imagePromises = selectedImages.map(async image => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
              resolve({
                name: image.name,
                type: image.type,
                data: reader.result.split(",")[1],
              });
            };
            reader.onerror = () => reject(new Error("파일 읽기 실패"));
            reader.readAsDataURL(image);
          });
        });

        const processedImages = await Promise.all(imagePromises);
        messageData.file = processedImages[0];
      }

      const jsonString = JSON.stringify(messageData);
      socket.send(jsonString);

      const localMessage = {
        flag: 1,
        contents: message.trim() || "",
        pics: selectedImages.map(image => URL.createObjectURL(image)),
        tempId: Date.now(),
      };

      setChatMessages(prev => [...prev, localMessage]);

      setMessage("");
      setSelectedImages([]);
      setPreviewUrls([]);

      const fileInput = document.getElementById("imageUpload");
      if (fileInput) fileInput.value = "";
    } catch (error) {
      console.error("메시지 전송 에러:", error);
    }
  };

  const handleImageUpload = event => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    const validImageFiles = files.filter(file =>
      file.type.startsWith("image/"),
    );
    if (validImageFiles.length === 0) {
      alert("이미지 파일만 업로드 가능합니다.");
      return;
    }

    setSelectedImages(validImageFiles);

    previewUrls.forEach(url => URL.revokeObjectURL(url));

    const newPreviewUrls = validImageFiles.map(file =>
      URL.createObjectURL(file),
    );
    setPreviewUrls(newPreviewUrls);
  };

  useEffect(() => {
    return () => {
      previewUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  const handleSendMessage = sendMessage;
  useEffect(() => {
    chatRoomList();
  }, []);

  // 웹소켓 연결 상태 모니터링 추가
  useEffect(() => {
    if (socket) {
      const checkConnection = setInterval(() => {
        if (socket.readyState !== WebSocket.OPEN) {
          console.log("웹소켓 연결이 끊어졌습니다. 재연결을 시도합니다.");
          setConnected(false);
        }
      }, 5000);

      return () => clearInterval(checkConnection);
    }
  }, [socket]);

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
      <div className="flex justify-center items-center pb-[50px]">
        <span className="text-[24px] font-normal">메시지함</span>
      </div>
      <div className="flex justify-center w-full">
        <div className="flex justify-between items-start w-[780px]">
          <div className="flex justify-center w-[280px] h-[800px] bg-[#FFFFFF] overflow-hidden">
            {/* 메시지 리스트 */}
            <div className="flex flex-col w-full overflow-y-auto">
              {loading ? (
                <LoadingSpinner />
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
                        ?.logo
                        ? `${IMAGE_BASE_URL}${chatRooms.find(item => item.roomId === selectedRoomId)?.logo}`
                        : "/default-profile.png"
                    }
                    alt="업체 이미지"
                    className="w-[40px] h-[40px] rounded-full object-cover"
                  />
                  <span className="text-[18px] font-semibold pl-[10px]">
                    {
                      chatRooms.find(item => item.roomId === selectedRoomId)
                        ?.businessName
                    }
                  </span>
                </div>
                {/* 채팅내용 */}
                <div
                  className="flex flex-col items-center w-full p-[20px] flex-grow overflow-y-auto"
                  ref={messageContainerRef}
                >
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
                      key={
                        chat.chatId ||
                        `${chat.flag}-${Date.now()}-${Math.random()}`
                      }
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
                <div className="flex flex-col w-full bg-[#EDF0F8] mt-auto">
                  {/* Image previews */}
                  {previewUrls.length > 0 && (
                    <div className="flex gap-2 p-2 overflow-x-auto">
                      {previewUrls.map((url, index) => (
                        <div key={index} className="relative">
                          <img
                            src={url}
                            alt={`Preview ${index + 1}`}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <button
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                            onClick={() => {
                              const newImages = selectedImages.filter(
                                (_, i) => i !== index,
                              );
                              const newUrls = previewUrls.filter(
                                (_, i) => i !== index,
                              );
                              setSelectedImages(newImages);
                              setPreviewUrls(newUrls);
                              URL.revokeObjectURL(url);
                            }}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex justify-center items-center w-full min-h-[60px] gap-[5px]">
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
                        className="flex justify-center items-center w-full h-[35px] border rounded-full shadow-[0_3px_3px_-3px_rgba(0,0,0,0.2)] pl-[50px]"
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
                      className="flex justify-center items-center w-[35px] h-[35px] bg-[#34C5F0] rounded-full"
                      onClick={() => {
                        if (message.trim()) {
                          handleSendMessage();
                          setMessage("");
                        }
                      }}
                    >
                      <FiSend className="text-[20px] text-white ml-[-2px] mb-[-2px]" />
                    </button>
                  </div>
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
