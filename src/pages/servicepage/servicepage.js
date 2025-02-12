import styled from "@emotion/styled";
// 서브페이지 - 컨텐츠
export const ServiceContentDiv = styled.div`
  padding: 80px 0 160px;

  .list {
    margin: 15px 0;
    display: flex;
    flex-wrap: wrap;
    gap: 50px 20px;
  }
`;
// 새창 채팅
export const MessageBoxDiv = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: #eee;
  z-index: 999999;
  display: flex;
  justify-content: center;
  align-items: center;
  .layer {
    width: 370px;
    height: 520px;
    border: 1px solid #ddd;
    display: flex;
    flex-direction: column;
    .tit {
      border: 1px solid #eeeeee;
      height: 60px;
      background-color: #f2f3f5;
      display: flex;
      align-items: center;
      padding: 15px;
      box-shadow: 0 3px 4px rgba(0, 0, 0, 0.02);
      img {
        width: 30px;
        height: 30px;
        border-radius: 100%;
      }
      h2 {
        font-size: 20px;
        font-weight: 600;
        padding-left: 10px;
      }
    }
    /* 채팅내용 */
    .chat-box {
      overflow-y: auto;
      padding: 15px;
      height: 100%;
      background-color: #f7f8fa;
      .date {
        /* border: 1px solid; */
        display: flex;
        justify-content: center;
        align-items: center;
        height: 30px;
        span {
          text-align: center;
          font-size: 10px;
          color: #a2a2a2;
          background-color: #ecedf0;
          padding: 6px 16px;
          border-radius: 10px;
        }
      }
      /* 대화내용 */
      .chat {
        display: flex;
        gap: 8px;
        margin-bottom: 15px;
        .bubble {
          display: flex;
          align-items: end;
          margin-top: 14px;
          word-break: keep-all;
          span {
            padding: 10px 12px;
            border-radius: 15px;
            font-size: 14px;
            background-color: #fff;
            color: #444;
            box-shadow: 0 2px 3px rgba(0, 0, 0, 0.05);
            line-height: 1.25em;
          }
          em {
            padding: 0 8px;
            font-size: 8px;
            color: #828282;
          }
        }
      }
      /* 업체챗 */
      .expert-chat {
        img {
          width: 32px;
          height: 32px;
          border-radius: 100%;
        }
        .bubble {
          span {
            border: 1px solid #eeeeee;
            border-top-left-radius: 0;
            background-color: #fff;
          }
        }
      }
      /* 유저 챗 */
      .user-chat {
        justify-content: end;
        .bubble {
          flex-direction: row-reverse;
          span {
            border: 1px solid #a7e8fc;
            border-top-right-radius: 0;
            background-color: #c3eefb;
            img {
              margin: 10px 0;
              width: 100%;
            }
          }
        }
      }
    }

    /* 하단 입력바 */
    .input-bar {
      height: 67px;
      padding: 10px;
      background-color: #edf0f8;
      display: flex;
      align-items: center;
      gap: 10px;
      .input-value {
        width: 100%;

        input {
          width: 100%;
          padding: 8px 15px;
          border-radius: 30px;
          font-size: 12px;
          color: #555;
          box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.05);
        }
        input::placeholder {
          font-size: 12px;
        }
      }
      .btn-area {
        position: relative;
        display: flex;
        align-items: center;
        gap: 6px;
        input {
          display: none;
        }
        > * {
          width: 30px;
          height: 30px;
          border-radius: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 20px;
          transition: all 0.3s;
        }
        label {
          background-color: #ffc0cb;
          border: 1px solid rgb(255, 121, 143);
          color: rgb(37, 0, 6);
          font-weight: 600;
          &:hover {
            opacity: 0.8;
          }
        }
        button {
          background-color: #34c5f0;
          border: 1px solid rgb(0, 139, 182);
          color: #fff;
          &:hover {
            opacity: 0.8;
          }

          svg {
            transform: translate(-2px, 1.5px);
          }
        }
      }
    }
  }
`;
export const PageNavDiv = styled.div`
  padding: 30px;
  display: flex;
  gap: 15px;
  font-size: 20px;
  justify-content: center;
  button {
    width: 40px;
    height: 40px;
    margin: 5px;
    padding: 10px;
    border: none;
    cursor: pointer;
    background-color: #f0f0f0;
    border-radius: 5px;
    font-size: 18px;
  }

  button.active {
    background-color: #3987fc;
    color: white;
    font-weight: bold;
  }
`;
