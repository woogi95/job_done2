import styled from "@emotion/styled";
import {
  EListContDiv,
  ExpertListPageDiv,
} from "../reservation-management/reservationMangement";
import { DContsDiv } from "../../../components/serviceDetail/serviceDetail";

// 스크롤
export const ExportPageDiv = styled(ExpertListPageDiv)`
  overflow-y: auto;
`;
export const TitleAreaDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h2.tit {
    font-size: 24px;
  }
  button {
    display: flex;
    align-items: center;
    padding: 10px 15px;
    height: 35px;
    gap: 5px;
    background-color: #11b1e1;
    box-shadow: -1px 3px 4px rgba(9, 126, 161, 0.6);
    transition: all 0.3s;
    color: #fff;
    &:hover {
      background-color: rgb(12, 145, 185);
    }
    svg {
      transform: translateY(1px);
    }
  }
`;

// 나누는 박스(공통)
export const ContBoxDiv = styled(EListContDiv)`
  padding: 25px 50px;
  display: flex;
  gap: 50px;
  align-items: center;
  margin-bottom: 30px;
`;
//  업체 정보
export const ExpertInfoDiv = styled.div`
  form {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  /* ---- 업체 정보 ---- */
  .photo-area {
    padding: 10px 0;
    /* border: 1px solid; */
    width: 206px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .logo {
      /* border: 1px solid; */
      width: 120px;
      height: 120px;
      display: flex;
      border-radius: 100%;
      justify-content: center;
      align-items: center;
      position: relative;
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      img {
        width: 120px;
        height: 120px;
        object-fit: cover;
        padding: 8px;
        background: #eee;
        border-radius: 100%;
      }
      input {
        display: none;
      }
      .file-btn {
        border: 1px solid #ddd;
        bottom: 5px;
        right: 5px;
        font-size: 18px;
        background-color: #ccc;
        color: #333;
        border-radius: 100%;
        padding: 3px;
        position: absolute;
        transition: all 0.3s;
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.85);
        &:hover {
          background-color: rgb(190, 190, 190);
        }
      }
    }
    .btn-area {
      /* border: 1px solid; */
      padding: 24px 0 10px;
      display: flex;
      align-items: center;
      gap: 6px;
      justify-content: center;

      button {
        border: 1px solid;
        border-radius: 6px;
        width: 100px;
        padding: 10px;
        font-size: 13px;
        color: #fff;
        transition: all 0.3s;
        &:nth-child(1) {
          background-color: #70be3b;
        }
        &:nth-child(2) {
          background-color: #22aaea;
        }

        &:hover {
          opacity: 0.8;
        }
      }
      button.cancel {
        background-color: #999;
      }
    }
  }
  /* 업체정보 오른쪽 */
  .info-area {
    /* border: 1px solid #eee; */
    width: 100%;
    h2 {
      font-size: 28px;
      font-weight: 600;
    }
    span {
      font-size: 15px;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.7);
      display: block;
      margin: 9px 0 18px;
    }
    > div {
      /* border: 1px solid #eee; */
      display: flex;
      flex-direction: column;
      gap: 10px;
      p {
        height: 20px;
        align-items: center;

        svg {
          margin: 0 3px 0px;
          color: #2a58ad;
        }
        b {
          margin-left: 6px;
        }
        color: #333;
        font-size: 14px;
        display: flex;
        font-weight: 600;

        em {
          font-style: normal;
          font-weight: 400;
          font-size: 13px;
          padding-left: 5px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }

  .edit-info-form {
    width: 100%;
    position: relative;
  }
  .edit-info-area {
    /* border: 1px solid; */
    width: 100%;
    input {
      height: 26px;
      border: 1px solid #eee;
      padding: 0px 10px;
      font-size: 14px;
      background-color: #11b1e120;
    }
    input[type="text"] {
      width: 256px;
    }
    input[type="text"]::placeholder {
      color: #1d4c9e50;
    }
    button {
      position: absolute;
      top: -90px;
      right: -50px;
      padding: 10px 40px;
      display: block;
      text-align: center !important;
      height: 35px;
      background-color: #11b1e1;
      box-shadow: -1px 3px 4px rgba(9, 126, 161, 0.6);
      transition: all 0.3s;
      color: #fff;
      &:hover {
        background-color: rgb(12, 145, 185);
      }
      svg {
        transform: translateY(1px);
      }
    }
  }
`;

// 업체상품 ExpertProductDiv
export const ExpertProductDiv = styled.div`
  /* ---- 업체상품 ---- */
  .product-info {
    border: 1px solid #eee;
    border-radius: 4px;
    line-height: 1.25em;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* padding: 5px 0; */
    > div {
      display: flex;
      justify-content: center;
      align-items: center;
      /* border: 1px solid #000; */
      width: calc(100% - 100px);
      height: 100%;
      background-color: #eaeef1;
      p {
        width: 120px;
        height: 100% !important;
        /* min-height: 40px; */
        display: flex;
        justify-content: center;
        align-items: center;
        width: 120px;
        text-align: center;
        /* border-right: 1px solid #ccc; */
        font-weight: 600;
        color: #333;
      }
      h2 {
        background-color: #fff;
        padding: 10px;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.75);
        width: calc(100% - 120px);
      }
    }
    a {
      background-color: #70be3b;
      min-width: 65px;
      height: 30px;
      color: #fff;
      padding: 5px 15px;
      margin-right: 10px;
      border-radius: 5px;
      font-size: 13px;
      transition: all 0.3s;
      &:hover {
        opacity: 0.8;
      }
    }
  }
`;
// 옵션정보
export const ExpertOptionInfoDiv = styled.div`
  height: 100%;
  /* border: 1px solid red; */
  .option-list {
    width: 100%;
    min-height: calc(100vh - 485px);

    display: flex;
    flex-direction: column;
    gap: 25px;
    .option-box {
      h3 {
        padding: 10px;
        border-bottom: 2px solid #2a58ad;
        font-weight: 600;
        font-size: 15px;
        color: #2a58ad;
        background-color: rgba(42, 88, 173, 0.2);
        background-color: #d5deee;
        display: flex;
        align-items: center;
        justify-content: space-between;
        /* 옵션명 삭제버튼 */
        button {
          background-color: #2a58ad;
          color: #fff;
          padding: 5px 10px;
          border-radius: 5px;
          font-size: 13px;
        }
      }

      /* 옵션 디테일 리스트*/
      .op-detail-list {
        /* background-color: rgba(42, 88, 173, 0.05); */
        background-color: #f5f6fb;
        box-shadow:
          rgba(50, 50, 93, 0.06) 0px 6px 12px -2px,
          rgba(0, 0, 0, 0.12) 0px 3px 7px -3px;
        li {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 5px 10px;
          gap: 10px;
          border-bottom: 1px solid #ddd;
          height: 47px;
          &:last-child {
            border-bottom: 0;
          }
          p {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 14px;
            span {
              color: #111;
              width: calc(100% - 360px);
            }
            em {
              color: #999;
              font-weight: 400;
              display: block;
              /* border: 1px solid #ddd; */
              width: 200px;
              text-align: right;
              font-style: normal;
            }
          }
          button {
            width: 80px;
            height: 26px;
            background-color: #333;
            color: #fff;
          }
        }
      }
    }
  }
`;
// 포트폴리오리스트
export const PortfolioListDiv = styled(EListContDiv)`
  border: 1px solid #eee;
  display: flex;
  gap: 27px;
  flex-wrap: wrap;
  max-height: calc(100% - 100px);
  min-height: calc(100% - 100px);
  justify-content: flex-start;
  align-content: flex-start;
  overflow-y: auto;
  & > div {
    margin-bottom: 10px; // 줄 간의 간격 조절
  }
  /* border: 1px solid #000; */
`;
export const PortfolioListItemDiv = styled.div`
  width: calc((100% - 90px) / 4);
  min-width: 213px;
  height: 213px;
  border: 1px solid #eee;
  border: 1px solid rgb(0, 67, 192, 0.15);
  background-color: #fff;
  overflow: hidden;
  border-radius: 5px;
  position: relative;
  transition: all 0.3s;
  &:hover {
    transform: scale(1.02);
    /* border: 1px solid rgb(0, 67, 192); */
    box-shadow:
      rgba(0, 0, 0, 0.19) 0px 10px 20px,
      rgba(0, 0, 0, 0.23) 0px 6px 6px;
  }

  .thum {
    position: absolute;
    top: 0;
    left: 0;
    cursor: pointer;
    width: 100%;
    height: 100%;
    background-color: #fdfdfd;
    overflow: hidden;
    transition: all 0.3s;
    &:hover {
      transform: scale(1.05);
    }
    img {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      object-fit: cover;
    }
  }
  .txt-area {
    cursor: pointer;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 10px 15px;
    height: 80px;
    background-image: linear-gradient(
      180deg,
      transparent 0,
      rgb(34, 34, 34, 0.45)
    );
    h4 {
      position: absolute;
      bottom: 6px;
      left: 20px;
      width: calc(100% - 40px);
      font-size: 16px;
      font-weight: 600;
      letter-spacing: 0.04em;
      color: #fff;
      text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.65);
      margin-bottom: 10px;
      line-height: 1.25em;
    }

    /* .btn-area {
      display: flex;
      align-items: center;
      gap: 10px;
      button {
        height: 30px;
        text-align: center;
        width: 50%;
        border-radius: 3px;
        background-color: #eee;
        font-size: 14px;
        transition: all 0.3s;
        &:hover {
          opacity: 0.88;
        }
      }
      button.edit-btn {
        background-color: #2a58ad;
        color: #fff;
        &:hover {
          background-color: #11b1e1;
        }
      }
    } */
  }
`;

// 상세페이지 수정
export const EditDetailDiv = styled.div`
  width: 100% !important;
  height: 100vh;
  background-color: #eaeef1 !important;
  position: fixed;
  top: 0;
  left: 0;
  .inner {
    max-width: 1280px;
    margin: 0 auto;
    border: 1px solid #eee;
    background-color: #fff;
    height: 100%;
  }
  .inner-bg {
    box-shadow:
      rgba(0, 0, 0, 0.08) 0px 10px 15px -3px,
      rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  }
  h1 {
    font-size: 38px;
    text-align: center;
    display: block;
    padding: 80px 0 40px;
    color: #143c99;
    font-weight: 600;
  }

  label {
    width: 100%;
    display: flex;
    border-top: 1px solid #2a58ad55;
    border-bottom: 1px solid #2a58ad;
    margin-bottom: 20px;

    span {
      width: 120px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      background-color: #eaeef1;
      padding: 10px;
      color: #333;
      background-color: #1f3d9b;
      color: #fff;
    }
    input {
      /* border: 1px solid #eee; */
      width: calc(100% - 120px);
      padding: 5px 10px;
      height: 40px;
      color: #333;
    }
  }
  .ql-container {
    border: 1px solid #2a58ad50;
    height: calc(100vh - 330px);
  }

  .ql-toolbar {
    border: 1px solid #2a58ad50;
    background-color: #eaeef1;
    background-color: #f2f5ff;
  }

  .btn-area {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 10px;
    border-top: 1px solid #2a58ad;
    button {
      width: 75px;
      height: 32px;
      background-color: #fff;
      color: #555;
      border-radius: 5px;
    }
    button[type="submit"] {
      border: 1px solid #4581f0;
      color: #4581f0;
    }
  }
  /* 퀼 : 에디터 상세페이지 */
  .ql-video {
    max-width: 652px;
    width: 100%;
    /* min-height: 400px; */
    height: 70%;
  }
  .ql-editor {
    h1 {
      font-size: 45px;
      line-height: 1.25em;
      text-align: left;
    }
    h3 {
      font-size: 32px;
      line-height: 1.25em;
    }
    h5 {
      font-size: 24px;
      line-height: 1.35em;
    }
    h6 {
      font-size: 18px;
      line-height: 1.25em;
    }
    p {
      padding: 5px 0px;
      font-size: 15px;
    }
  }
`;
export const PreviewAreaDiv = styled(EditDetailDiv)`
  height: auto;
`;
// 상세페이지 미리보기
export const PreviewDetailDiv = styled(DContsDiv)`
  max-width: 1280px;
  margin: 0 auto;
  height: 100%;
  background-color: #fff;

  .box {
    padding: 0 !important;
    height: calc(100vh - 279px);
    margin-bottom: 33px;

    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

// 업체 옵션 수정
export const OpContBoxDiv = styled(ContBoxDiv)`
  padding: 25px 50px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 40px;
  align-items: center;
  margin-bottom: 30px;

  /* border: 1px solid #000; */
  .option-box {
    border-radius: 6px;
    overflow: hidden;
    box-shadow: 0 5px 12px rgba(0, 0, 0, 0.1);
  }
  .tit {
    width: 100%;
    font-size: 18px;
    font-weight: 600;
    color: #333;
    margin-bottom: 15px;
  }
  .add-option {
    /* border: 1px solid #000; */
    display: flex;
    align-items: end;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 10px;
    gap: 15px;
    input {
      border: 1px solid #ddd;
      padding: 8px 10px;
      border-radius: 5px;
      width: calc(100% - 100px);
      font-size: 15px;

      color: #333;
    }
    button {
      min-width: 100px;
      border: 1px solid #2a58ad;
      color: #2a58ad;
      padding: 10px 10px;
      border-radius: 5px;
    }
  }
  .op-box {
    /* border: 1px solid #000; */
    display: flex;
    width: 100%;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
  }
  .add-detail-op {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 20px;
    margin: 8px 0;
    width: 100%;
    input {
      border: 1px solid #ddd;
      width: calc(100% - 320px);
      padding: 4px 10px;
      border-radius: 5px;
    }
    input[type="number"] {
      width: calc(200px);
    }
    /* 선택옵션 추가 버튼 */
    button {
      width: 110px;
      border: 1px solid #2a58ad;
      color: #2a58ad;
      padding: 8px 10px;
      border-radius: 5px;
      font-size: 13px;
    }
  }
  .option-info {
    display: flex;
    align-items: center;
    width: 100%;

    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;

    label {
      display: flex;
      border: 1px solid #eee;
      border-radius: 5px;
      align-items: center;
      gap: 10px;
      font-size: 15px;
      font-weight: 600;
      color: #333;
      width: 100%;
      height: 40px;
      b {
        width: 120px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        background-color: #eaeef1;
        padding: 10px;
      }
      em {
        font-size: 13px;
        font-weight: 400;
        color: #555;
      }
      span {
        border-radius: 30px;
        background-color: #333;
        color: #fff;
        font-size: 13px;
        padding: 7px 16px 8px;
      }
      input {
        border: 0;
        background-color: transparent;
        font-size: 15px;
        font-weight: 400;
        color: #555;
      }
      .basic-price {
        width: auto;
      }
    }
  }
  .op-item p {
    padding: 5px 10px;
    border-bottom: 1px solid #ddd;
    &:last-child {
      border-bottom: 0;
    }
  }
`;
// 미리보기
export const PreviewDiv = styled.div`
  width: calc(100% + 200px) !important;
  height: 100vh;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: #fff !important;
  z-index: 99;
  > div:nth-child(2) {
    background-color: #fff;
  }

  .btn-area {
    position: absolute;
    max-width: 1280px;
    width: 100%;
    top: 0px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 10px;
    display: flex;
    justify-content: end;
    border-color: transparent !important;
    > div {
      /* border: 1px solid #000; */
      margin-top: 60px;
      display: flex;
      gap: 12px;

      button {
        width: 100px;
        height: 38px;
        background-color: #fff;
        color: #555;
        border-radius: 5px;
        transition: all 0.3s;
        &:hover {
          opacity: 0.8;
        }
      }
      /* 미리보기 */
      button[type="submit"] {
        border: 1px solid #4581f0;
        color: #4581f0;
      }
      button.close-btn {
        background-color: #ddd;
        color: #333;
      }
      button.edit-btn {
        background-color: #2a58ad;
        background-color: #ff5665;
        color: #fff;
      }
    }
  }
`;
