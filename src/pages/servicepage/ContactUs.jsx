import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";

function TestMessage() {
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
    if (socket && socket.readyState === WebSocket.OPEN && username) {
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
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-4 font-semibold text-gray-700">
        연결 상태:{" "}
        {connected ? (
          <span className="text-green-600">연결됨</span>
        ) : (
          <span className="text-red-600">연결되지 않음</span>
        )}
      </div>

      <div className="space-y-4">
        <div
          ref={messageContainerRef}
          className="h-[400px] overflow-y-auto border border-gray-200 rounded-lg p-4 bg-gray-50"
        >
          {messages.map((msg, index) => (
            <div key={index} className="mb-2 p-2 rounded-lg bg-white shadow-sm">
              <strong className="text-blue-600">{msg.username}: </strong>
              <span className="text-gray-700">{msg.message}</span>
              {msg.file && msg.file.data && (
                <div className="mt-2">
                  <img
                    src={`data:${msg.file.type};base64,${msg.file.data}`}
                    alt={msg.file.name}
                    className="max-w-[200px] rounded-lg"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        <form onSubmit={handleSendMessage} className="space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={e => setInputMessage(e.target.value)}
              placeholder="메시지를 입력하세요"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
            >
              사진
            </label>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              전송
            </button>
          </div>
          {selectedImage && (
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm text-gray-600">
                선택된 이미지: {selectedImage.name}
              </span>
              <button
                type="button"
                onClick={() => {
                  setSelectedImage(null);
                  const fileInput = document.getElementById("image-upload");
                  if (fileInput) fileInput.value = "";
                }}
                className="text-red-500 text-sm"
              >
                ✕
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default TestMessage;
