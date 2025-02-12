import styled from "@emotion/styled";

export const PopupDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;
export const PopupContDiv = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 8px;
  width: 380px;
  text-align: center;
  h4 {
    margin-bottom: 15px;
    font-size: 24px;
    font-weight: 600;
  }

  span {
    margin-bottom: 35px;
    line-height: 1.2em;
    display: block;
  }

  .btn-area {
    display: flex;
    justify-content: center;
    gap: 8px;
  }

  .btn-area button {
    padding: 14px 20px;
    width: 50%;
    background-color: #4581f0;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s;
  }

  .btn-area button:nth-child(1) {
    background-color: #aaa;
  }

  .btn-area button:hover {
    background-color: rgb(46, 103, 209);
  }

  .btn-area button:nth-child(1):hover {
    background-color: #999;
  }
`;
