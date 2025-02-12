import styled from "@emotion/styled";
import {
  EListContDiv,
  ExpertListPageDiv,
} from "../reservation-management/reservationMangement";

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
  /* ---- 업체 정보 ---- */
  .photo-area {
    padding: 10px 0;
    /* border: 1px solid; */
    width: 30%;
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
      img {
        width: 120px;
        height: 120px;
        object-fit: contain;
        padding: 15px;
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
      padding: 10px 0;
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
        svg {
          margin: 0 3px 0px;
          color: #2a58ad;
        }
        b {
          margin-left: 6px;
        }
        color: #333;
        font-size: 12px;
        display: flex;
        font-weight: 600;

        em {
          font-weight: 400;
          padding-left: 5px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }
`;

// 업체상품 ExpertProductDiv
export const ExpertProductDiv = styled.div`
  /* ---- 업체상품 ---- */
  .product-info {
    border: 1px solid #ddd;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0;
    > div {
      display: flex;
      justify-content: center;
      align-items: center;
      p {
        width: 80px;
        text-align: center;
        border-right: 1px solid #bbb;
        font-weight: 600;
      }
      h2 {
        padding: 0 10px;
        /* border: 1px solid;1 */
      }
    }
    a {
      background-color: #70be3b;
      color: #fff;
      padding: 8px 10px;
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
  .option-list {
    width: 100%;
    /* border: 1px solid; */
    display: flex;
    flex-direction: column;
    gap: 15px;
    .option-box {
      /* border: 1px solid red; */

      h3 {
        padding: 10px;
        border-bottom: 2px solid #2a58ad;
        font-weight: 600;
        font-size: 15px;
        color: #2a58ad;
        background-color: rgba(42, 88, 173, 0.2);
      }

      /* 옵션 디테일 리스트*/
      .op-detail-list {
        background-color: rgba(42, 88, 173, 0.05);
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
            }
            em {
              color: #999;
              font-weight: 400;
            }
          }
          button {
            width: 20px;
            height: 20px;
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
  gap: 30px;
  max-height: calc(100% - 100px);
  overflow: auto;
`;
export const PortfolioListItemDiv = styled.div`
  width: calc((100% - 90px) / 4);
  height: 213px;
  border: 1px solid #ddd;
  background-color: #fff;
  overflow: hidden;
  border-radius: 5px;
  position: relative;

  .thum {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fdfdfd;
    img {
      position: absolute;
      width: 100%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      object-fit: cover;
    }
  }
  .txt-area {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 10px 15px;
    h4 {
      font-size: 16px;
      font-weight: 600;
      color: #333;
      margin-bottom: 10px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .btn-area {
      /* border: 1px solid; */
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
      }
    }
  }
`;
