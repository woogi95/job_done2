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
  // const roomId = useRecoilValue(checkRoom);

  // 메시지 컨테이너에 대한 ref 추가
  const messageContainerRef = useRef(null);
  const roomId = cookies.roomId;

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
      // console.log("Attempting to connect with roomId:", roomId); // 웹소켓 연결 시 roomId 확인
      ws = new WebSocket(`ws://112.222.157.157:5234/chat/${roomId}`);

      ws.onopen = () => {
        console.log("웹소켓 연결 성공!");
        setConnected(true);
        setSocket(ws);
        reconnectAttempts = 0; // 연결 성공시 재시도 횟수 초기화
      };

      ws.onmessage = event => {
        try {
          let messageData;
          console.log("Raw message received:", event.data);

          if (event.data instanceof Blob) {
            const reader = new FileReader();
            reader.onload = () => {
              try {
                messageData = JSON.parse(reader.result);
                if (!messageData.username) {
                  messageData.username = username;
                }
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

    // 메시지와 파일이 모두 비어 있는지 확인
    if (!inputMessage.trim() && !selectedImage) {
      alert("메시지나 이미지를 입력하세요.");
      return;
    }

    // username 체크 조건 완화
    if (socket && socket.readyState === WebSocket.OPEN) {
      try {
        if (selectedImage) {
          const reader = new FileReader();
          reader.onload = async () => {
            const fileData = {
              name: selectedImage.name,
              type: selectedImage.type,
              data: reader.result.split(",")[1],
            };
            console.log("방번호 몇번?", roomId);
            const messageData = {
              flag: 1,
              roomId: roomId,
              message: inputMessage,
              // username: username,
              file: fileData,
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
          const messageData = {
            flag: 1,
            roomId: roomId,
            message: inputMessage,
            // username: username,
          };

          // 직접 문자열로 전송하지 않고 Blob과 ArrayBuffer를 사용
          const jsonString = JSON.stringify(messageData);
          console.log("Sending message:", jsonString); // 디버깅용

          // 일반 텍스트 메시지도 이미지와 동일한 방식으로 전송
          const blob = new Blob([jsonString], { type: "application/json" });
          const arrayBuffer = await blob.arrayBuffer();
          socket.send(arrayBuffer);

          // 로컬 메시지 목록에 추가 (즉시 화면에 표시)
          setMessages(prevMessages => [...prevMessages, messageData]);
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

  return (
    <div className="flex flex-col h-[800px] w-[500px] bg-[#F5F5F5]">
      {/* 상태 표시 헤더 */}
      <div className="flex p-[10px] justify-center items-center h-[80px] w-full bg-[#EEEEEE] shadow-[0_4px_5px_-6px_rgba(0,0,0,0.2)]">
        <span className="flex text-[24px] font-semibold pl-[10px]">
          고객문의
        </span>
        {/* <span className="text-[18px] font-semibold pl-[10px]">
          연결 상태:{" "}
          {connected ? (
            <span className="text-[#34C5F0]">연결됨</span>
          ) : (
            <span className="text-red-500">연결되지 않음</span>
          )}
        </span> */}
      </div>

      {/* 메시지 컨테이너 */}
      <div
        ref={messageContainerRef}
        className="flex flex-col items-center w-full p-[20px] flex-grow overflow-y-auto"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.flag === 1 ? "self-end" : "self-start"
            } gap-[10px] py-[15px]`}
          >
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
              {msg.file && msg.file.data && (
                <div className="mx-4 mb-4">
                  <img
                    src={`data:${msg.file.type};base64,${msg.file.data}`}
                    alt={msg.file.name}
                    className="max-w-[200px] rounded"
                  />
                </div>
              )}
            </span>
          </div>
        ))}
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
