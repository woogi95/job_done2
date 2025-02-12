import styled from "@emotion/styled";
import { LayoutDiv } from "../../pages/page";
import { LayerDiv, ModalDiv } from "../portfolio/portfolio";
import { FilterDiv } from "../service/service";

export const DetailLayout = styled(LayoutDiv)`
  display: flex;
  justify-content: space-between;
  position: relative;
`;
export const DetailTopDiv = styled.div`
  background-color: rgb(223, 249, 255);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 0;

  .inner {
    max-width: 1280px;
    width: 100%;
    > em {
      color: rgba(0, 0, 0, 0.65);
      font-size: 14px;
    }
    h1 {
      font-size: 24px;
      font-weight: 700;
      margin: 12px 0 16px;
      max-width: 780px;
      line-height: 1.22em;
      color: #333;
      word-break: keep-all;
    }

    /* 회사 정보 */
    .companyInfo {
      /* border: 1px solid #000; */
      display: flex;
      gap: 12px;
      margin-bottom: 16px;
      .logo {
        width: 50px;
        height: 50px;
        background-color: #eee;
        border-radius: 3px;
        overflow: hidden;
      }
      .txt {
        display: flex;
        justify-content: center;
        gap: 5px;
        flex-direction: column;
        h3 {
          font-size: 18px;
          font-weight: 700;
          em {
            font-size: 13px;
            font-weight: 400;
            color: #555;
          }
        }
        b {
          font-size: 15px;
          color: rgba(0, 0, 0, 0.65);
        }
      }
    }

    .desc {
      border: 1px solid rgb(100, 210, 244);
      background-color: #fff;
      border-radius: 5px;
      max-width: 600px;
      padding: 10px 0;
      display: flex;
      .box {
        border-right: 2px solid rgba(100, 210, 244, 0.27);
        max-width: 200px;
        width: 100%;
        text-align: center;
        display: flex;
        flex-direction: column;
        gap: 6px;
        &:last-child {
          border-right-color: transparent;
        }
        b {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.65);
        }
        div {
          font-weight: 600;
        }
      }
    }
  }
`;

export const CountStarDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  svg {
    font-size: 16px;
    color: #ff9d00;
  }
  em {
    font-size: 15px;
    color: #333;
  }
  span {
    font-size: 14px;
    color: #bbb;
    font-weight: 500;
  }
`;
// 왼쪽 - DetailContents
export const DetailContentsDiv = styled.div`
  max-width: 830px;
  width: 100%;

  nav {
    // position: "fixed",
    top: 80px;
    background-color: #fff;
    max-width: 1280px;
    width: 100%;
    padding-top: 20px;

    z-index: 8;

    border-bottom: 1px solid rgba(199, 199, 199, 0.45);
    ul {
      display: flex;
      /* gap: 40px; */
      li a {
        display: block;
        /* border: 1px solid; */
        padding: 15px 20px;
        cursor: pointer;
        font-size: 18px;
      }
      a.active {
        font-weight: 700;
        position: relative;
        &::after {
          content: "";
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 4px;
          border-radius: 5px;
          background: rgb(65, 65, 65);
        }
      }
    }
  }
`;
export const DContsDiv = styled.div`
  .box {
    padding: 0px 0 30px;
    &:nth-of-type(1) {
      padding-top: 10px;
    }
    /* &:nth-of-type(2) {
      border-top: 4px solid #3887ff;
      border-bottom: 4px solid #3887ff;
    } */

    h2 {
      border-top: 4px solid #3887ff;
      border-bottom: 2px solid #3887ff80;
      background-color: #f5f5f5;
      font-size: 20px;
      font-weight: 600;
      padding: 20px 5px;
    }

    p {
      padding: 20px 10px;
      color: #333;
      line-height: 1.5em;
    }
    > img {
      width: 100%;
      padding: 0px 10px;
    }
  }
`;
export const PortfolioSwiperDiv = styled.div`
  padding: 20px 10px;
  position: relative;

  .btn-area {
    /* border: 1px solid; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 0;
    z-index: 5;
    button {
      width: 40px;
      height: 40px;
      background: rgba(255, 255, 255, 0.95);
      border: 1px solid rgba(0, 0, 0, 0.1);
      box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.13);
      border-radius: 100%;
      font-size: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .prev:after,
    .next:after {
      display: flex;
      justify-content: center;
      align-items: center;
      line-height: normal;
      content: "";
      width: 30px;
      height: 30px;
      background: url("../images/arrow-right.svg") no-repeat center / 12px;
      transform: translate(0.5px, -1px);
    }

    .prev:after {
      transform: rotate(180deg) translate(0.5px, -1px);
    }
  }
`;

// 포트폴리오 컨텐츠 스와이퍼
export const PortfolioListItem = styled.div`
  width: 191.25px;
  height: 191.25px;
  border-radius: 8px;
  background-color: #fff;
  border: 1px solid #eee;
  position: relative;
  overflow: hidden;

  .imgbox {
    position: absolute;
    width: 100%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
      position: absolute;
    }

    &::after {
      content: "";
      display: block;
      background-image: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0.3) 62%,
        rgba(0, 0, 0, 0.7)
      );
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      cursor: pointer;
    }
  }
  h3 {
    color: #fff;
    position: absolute;
    bottom: 20px;
    left: 20px;
    font-size: 16px;
    word-break: keep-all;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    max-height: 3em;
    line-height: 1.18em;
  }
`;

// 리뷰
export const StarTotalDiv = styled.div`
  border: 1px solid #eee;
  background: #f9f9f9;
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  gap: 12px;
  box-shadow: 0px 4px 8px 0 rgba(0, 0, 0, 0.12);
  h4 {
    font-weight: 700;
    font-size: 28px;
    /* border: 1px solid; */
  }

  .star-container {
    display: flex;
    align-items: center;
    position: relative;
    gap: 5px;
    p.star {
      /* border: 1px solid #000; */
      padding: 0;
      font-size: 24px;
      display: flex;
      justify-content: center;
      gap: 3px;
      z-index: 5;
    }
    .star-grade {
      font-weight: 700;
      font-size: 20px;
    }
    .star-bg {
      display: flex;
      font-size: 24px;
      position: absolute;
      top: -20px;
      left: -10px;
      gap: 3px;
    }
  }
`;

// 오른쪽
export const SummaryDiv = styled.div`
  top: 0;
  z-index: 99;
  position: absolute;
  margin: 0 auto;
  max-width: 1280px;
  width: 100%;

  .inner {
    width: 330px;
    min-height: 380px;
    /* height: 100%; */
    padding: 40px 30px;
    position: absolute;
    right: 0;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

    .top {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      h2 {
        font-size: 20px;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.8);
        /* line-height: 1.5em; */
      }

      .like svg {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 10px;
        width: 22px;
        height: 22px;
        color: red;
        cursor: pointer;
      }
    }
    .tit {
      word-break: break-all;
      font-size: 20px;
      font-weight: 600;
      line-height: 1.3em;
      margin: 15px 0 8px;
    }

    .desc {
      /* border: 1px solid #eee; */
      display: flex;
      align-items: center;
      gap: 6px;
      padding-bottom: 30px;

      .box {
        border-radius: 15px;
        gap: 10px;
        background-color: #c3eefb65;
        color: #0062eb;
        font-weight: 600;
        padding: 5px 10px;
        font-size: 11px;
        display: flex;
        justify-content: space-between;
        div {
          color: #064153;
        }
      }
    }
    .btn-area {
      position: absolute;
      bottom: 30px;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 10px;

      & > * {
        border: 2px solid #34c5f0;
        width: 80%;
        height: 40px;
        line-height: 36px;
        font-size: 15px;
        text-align: center;
        border-radius: 5px;
      }
      button {
        background-color: #34c5f0;
        color: #fff;
        text-shadow: 1px 1px rgba(0, 0, 0, 0.2);
      }
      button:last-child {
        color: #34c5f0;
        background-color: #fff;
      }
    }
  }
`;
export const CountStarCustomDiv = styled(CountStarDiv)`
  /* border: 1px solid; */
  margin: 3px 0 12px;
  justify-content: start;
  em {
    font-size: 12px;
    margin: 0 2px 0 3px;
  }
  span {
    font-size: 12px;
  }
`;
// 리뷰
export const ReviewDiv = styled.div`
  padding: 50px 0;
  /* 리뷰 탑 */
  .rv-top {
    /* border: 1px solid; */
    display: flex;
    justify-content: space-between;
    align-items: center;

    h3 {
      font-size: 16px;
      font-weight: 600;
    }
    .filter {
      border: 1px solid #eee;
      padding: 8px 14px;
      font-size: 13px;
      color: #555;
      border-radius: 4px;
      cursor: pointer;
    }
  }

  /* 리뷰 리스트 */
  .rv-list {
    /* border: 1px solid #bbb; */
    .rv-item {
      padding: 20px 10px 15px;
      border-bottom: 2px solid #eee;
      /* 유저 리뷰 */
      .user-rv {
        /* border: 1px solid #eee; */
        .user-info {
          display: flex;
          align-items: center;
          gap: 15px;

          .user-photo {
            width: 50px;
            height: 50px;
            border-radius: 100%;
            background-color: #eee;
            overflow: hidden;
          }
          .desc {
            display: flex;
            flex-direction: column;
            gap: 6px;
            > div {
              display: flex;
              align-items: end;
              font-size: 14px;
              font-weight: 600;
              span {
                margin-left: 3px;
              }
              b {
                font-weight: normal;
                color: #bbb;
                margin-left: 6px;
                font-size: 12px;
              }
            }
          }
        }
      }
      /* 사장님댓글 */
      .reply {
        background-color: #f9f9f9;
        padding: 20px;
        .info {
          display: flex;
          align-items: end;
          gap: 6px;
          h4 {
            /* font-size: 14px; */
            font-weight: 600;
          }
          b {
            font-weight: normal;
            color: #bbb;
            margin-left: 6px;
            font-size: 12px;
          }
        }
        img {
          width: 50px;
          height: 50px;
          border-radius: 100%;
        }
      }

      /* 리뷰 글 - 사장님, 사용자 공통*/
      .comment {
        /* border: 1px solid #bbb; */
        padding: 10px 0;
        display: flex;
        justify-content: space-between;
        gap: 30px;
        span {
          word-break: keep-all;
          color: #555;
          font-weight: 300;
          line-height: 1.25em;
          font-size: 14px;
        }
        .photo {
          display: flex;
          gap: 10px;
          > div {
            width: 80px;
            height: 80px;
            background-color: #eee;
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
        }
      }
    }
  }
`;
export const ReviewFilterDiv = styled(FilterDiv)`
  .select {
    background-color: #eee;

    min-width: 145px;
    padding: 5px 20px;
    p {
      font-size: 14px;
      padding: 10px;
    }
    svg {
      color: #333;
    }
  }
`;
// 업체디테일 모달

export const PfModalDiv = styled(ModalDiv)`
  background-color: rgba(0, 0, 0, 0.75);
`;
export const PfLayerDiv = styled(LayerDiv)`
  max-width: 680px;
  min-height: auto;
  height: 450px;
  background-color: #fff;
  display: flex;
  padding: 50px 0;
  position: relative;

  /* 닫기 버튼 */
  > button {
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 24px;
  }

  .txt-area {
    border-left: 1px solid #ccc;
    width: calc(100% - 400px);
    height: 100%;
    padding: 15px;
    position: relative;

    h3 {
      font-size: 18px;
      line-height: 1.25em;
      font-weight: 600;
      margin-bottom: 15px;
    }
    ul {
      border: 1px solid #eee;
      display: flex;
      flex-direction: column;
      margin-bottom: 10px;
      background-color: #eee;
      gap: 10px;
      padding: 15px 8px;
      li {
        display: flex;
        align-items: center;
        font-size: 14px;

        b {
          width: 90px;
          color: #111;
          /* font-weight: 300; */
        }
        p {
          color: #555;
          font-weight: 500;
        }
      }
    }
    span {
      font-size: 14px;
      line-height: 1.35em;
      color: #555;
      word-break: keep-all;
    }
    button {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: calc(100% - 30px);
      height: 45px;
      line-height: 45px;
      background-color: #3887ff;
      border-radius: 4px;
      color: #fff;
    }
  }
`;

export const PhotoAreaDiv = styled.div`
  /* border: 1px solid; */
  width: 400px;
  height: 100%;
  .pfdetail-img {
    /* border: 1px solid red; */
    width: 100%;
    height: 100%;
    .swiper-slide {
      background-color: #eee;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
`;
