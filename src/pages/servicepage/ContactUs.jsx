import { useState } from "react";
//styled
import { MessageBoxDiv } from "./servicepage";
import { MessageDetail } from "../../components/ServiceIcon";
// icon
import { FiSend } from "react-icons/fi";
import { CiImageOn } from "react-icons/ci";

function ContactUs() {
  const [message, setMessage] = useState("");
  const handleSendMessage = () => {
    console.log("Sending message:", message);
  };

  return (
    <MessageBoxDiv>
      {/* 상세 메시지 */}
      {MessageDetail.map(item => (
        <div key={item.resultData[0].roomId} className="layer">
          {/* 업체 정보 */}
          <div className="tit ">
            <img src={item.resultData[0].pic} alt="업체 이미지" />
            <h2>{item.resultData[0].companyName}</h2>
          </div>
          {/* 채팅내용 */}
          <div className="chat-box">
            <div className="date">
              <span>{item.resultData[0].roomCreatedAt}</span>
            </div>
            {/* 업체챗 */}
            <div className="chat expert-chat">
              <img src={item.resultData[0].pic} alt="업체로고" />
              <div className="bubble">
                <span>{item.resultData[0].companyChat}</span>
                <em>{item.resultData[0].sendTime}</em>
              </div>
            </div>
            {/* 유저쳇 */}
            <div className="chat user-chat">
              <div className="bubble">
                <span>
                  {item.resultData[0].companyChat}
                  <img src={item.resultData[0].pic} alt="" />
                </span>
                <em>{item.resultData[0].sendTime}</em>
              </div>
            </div>
          </div>
          {/* 메시지 입력 */}
          <div className="input-bar">
            <div className="input-value">
              <input
                type="text"
                placeholder="메시지를 입력해주세요."
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
            <div className="btn-area">
              <input
                type="file"
                id="imageUpload"
                className="hidden"
                accept="image/*"
              />
              <label htmlFor="imageUpload">
                <CiImageOn />
              </label>

              <button
                onClick={() => {
                  if (message.trim()) {
                    handleSendMessage();
                    setMessage("");
                  }
                }}
              >
                <FiSend />
              </button>
            </div>
          </div>
        </div>
      ))}
    </MessageBoxDiv>
  );
}

export default ContactUs;
