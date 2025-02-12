import styled from "@emotion/styled";
export const HeaderDiv = styled.div`
  height: 67px;
  width: 100%;
  background-color: #2a58ad;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;

  .b-logo {
    width: 20%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    img {
      height: 100%;
    }
    &::after {
      content: "";
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 2px;
      height: 30px;
      background-color: rgba(255, 255, 255, 0.2);
    }
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: 30px;
    ul {
      display: flex;
      align-items: center;
      gap: 30px;
      li {
        color: #fff;
        position: relative;
        /* font-size: 14px; */
        &:nth-child(2) {
          color: rgba(255, 255, 255, 0.65);
        }
        &:nth-child(1)::after {
          content: "";
          position: absolute;
          right: -15px;
          top: 50%;
          transform: translateY(-50%);
          width: 2px;
          height: 15px;
          background-color: rgba(255, 255, 255, 0.5);
        }
        b {
          color: #cf8000;
        }
      }
    }
    > button {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-right: 20px;
      em {
        width: 40px;
        height: 25px;

        font-size: 0;
        background: url(/images/logo.svg) no-repeat center center / contain;
      }
      background: #333;
      color: #fff;
      height: 38px;
      padding: 2px 15px;
      font-size: 13px;
    }
  }
`;
