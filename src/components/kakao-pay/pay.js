import styled from "@emotion/styled";

export const PayModalDiv = styled.div`
  width: 100%;
  height: 100vh;
  z-index: 99;
  position: fixed;
  background-color: #fff;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .layer {
    border: 1px solid rgb(237, 244, 255);
    max-width: 400px;
    width: 100%;
    padding: 60px 30px 50px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .logo {
    background-color: rgb(237, 244, 255);
    display: inline-block;
    width: 70px;

    position: absolute;
    top: -22px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 5px;
    margin-bottom: 25px;

    img {
      width: 85%;
      margin: 0 auto;
      padding: 5px;
    }
  }
  .txt {
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: center;
    margin-bottom: 16px;
    .check-icon {
      width: 34px;
      height: 34px;
      border-radius: 100%;
      background-color: #12bb44;
      color: #fff;
      font-size: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 24px;
    }
    h1 {
      font-size: 1.6rem;
      line-height: 2rem;
      margin-bottom: 2rem;
    }
  }
  button {
    width: 100%;
    padding: 16px 0;
    color: #fff;
    font-weight: 500;
    border-radius: 0.5rem;
    background-color: #4581f0;
    transition: all 0.3s;
    &:hover {
      background-color: rgb(53, 107, 207);
    }
  }
  span {
    color: #4581f0;
    font-size: 16px;
  }
`;
export const LoadingDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;

  .box {
    display: flex;
    justify-content: center;
    align-items: end;
    gap: 10px;
    p {
      font-size: 40px;
      color: #fff;
    }
  }
`;
