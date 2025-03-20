import styled from "@emotion/styled";
// 예약 페이지
export const QuotationDiv = styled.div`
  padding: 30px 20px;
  h2.tit {
    font-size: 28px;
    font-weight: 600;
    padding: 20px 0;
    text-align: center;
  }
`;
export const QuotationFormDiv = styled.div`
  border: 1px solid #ccc;
  height: calc(100% - 97px);
  overflow-y: auto;
  padding: 25px 20px;
  background-color: #fff;
  box-shadow:
    rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
  .readonly {
    background-color: #eee;
    color: #999 !important;
  }

  form {
    > div {
      /* border: 1px solid; */
      margin-bottom: 25px;
      h3 {
        font-weight: 600;
        font-size: 18px;
        padding: 10px 0;
      }
      > div {
        border-top: 2px solid #333;
        border-bottom: 2px solid #333;

        display: flex;
        align-items: center;
        flex-wrap: wrap;
        label {
          width: 50%;
          display: flex;
          align-items: center;
          font-size: 14px;
          color: #353535;
          border-bottom: 1px dotted #333;
          &:last-child {
            border-bottom: none;
            width: 100%;
          }
          &.flex {
            display: flex;
            align-items: stretch;

            h4 {
              height: auto;
              min-width: 80px;
              min-height: 34px;
            }

            .flex-col {
              align-items: stretch;
            }
          }
        }

        h4 {
          width: 80px;
          height: 34px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #2a58ad;
          font-size: 12px;
          color: #fff;
          /* border: 1px solid #333; */
        }
        .op-label {
          border: 1px solid gray;
          overflow: hidden;
          width: 100%;
          height: 100%;

          .op-label::after {
            content: "";
            clear: both;
            display: block;
          }

          .op-style {
            float: left;
            min-height: 100px;

            height: auto !important;
          }
          > div {
            float: left;
            height: 100% !important;
          }
        }

        input {
          width: calc(100% - 80px);
          padding: 5px 15px;
          /* border: 1px solid red; */
          font-size: 14px;
          height: 34px;
          color: #353535;
        }
      }
    }
    /* textarea */
    .text-area {
      textarea {
        width: 100%;
        height: 120px;
        resize: none;
        border: 1px solid #999;
        outline: none;
        padding: 15px;
        font-size: 13px;
        line-height: 1.3em;
        color: #353535;
      }
    }
  }

  .option-box {
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: calc(100% - 80px);
    margin-bottom: 0 !important;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
    div {
      display: flex;
      justify-content: space-between;
      border: 1px dotted #999;
      padding: 10px;
      border-radius: 5px;
      span {
        font-size: 13px;
        color: #333;

        b {
          font-weight: 600;
          color: rgb(10, 55, 139);
        }
      }
    }
  }
  .pyeong {
    padding-right: 20px;
    input[type="text"] {
      text-align: right;
      padding: 5px;
      color: #353535;
    }
  }
`;
// 추가견적
export const AddOptionDiv = styled.div`
  > div {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 4px;
    border-top: none !important;
    &:last-child {
      padding-bottom: 0;
    }
    > button {
      background-color: #70be3b;
      color: #fff;
      border: none;
      padding: 9px 14px;
      border-radius: 5px;
      font-size: 12px;
    }
    /* flex-direction: column; */
    .tr {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 13px;
      color: #fff;
      width: 100%;
      height: 34px;
      padding: 0 10px;
      text-align: center;
      border-bottom: 1px dotted #333;
      /* 가로 사이즈 */
      .th,
      .td {
        &:nth-of-type(1) {
          width: 5%;
        }
        &:nth-of-type(2) {
          width: 70%;
        }
        &:nth-of-type(3) {
          width: 15%;
        }
        &:nth-of-type(4) {
          width: 10%;
        }
      }
    }
    .head {
      background: #2a58ad;
    }
    .td {
      color: #333;
      height: 34px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-right: 1px solid #eee;
      &:last-child {
        border-right: none;
      }
      input {
        /* border: 1px solid #eee; */
        width: 100%;
        background-color: transparent;
      }
      button {
        background-color: #333;
        padding: 6px 10px;
        border-radius: 3px;
        font-size: 12px;
        color: #fff;
      }
    }
    .price {
      input {
        text-align: right;
      }
    }
  }
`;
export const DatePriceDiv = styled.div`
  position: relative;
  .error-message {
    position: absolute;
    top: 8px;
    left: 150px;
    color: red;
    font-size: 12px;
    margin-top: 5px;
  }
  .date {
    border-bottom: none;
  }
  .price {
    border-top: 1px dotted #333;
    > div {
      background-color: rgba(255, 0, 0, 0.04);
      padding: 0 15px;
      height: 35px;
      font-size: 14px;
      width: calc(100% - 80px);
      color: red;
    }
  }
  /* 한줄 */
  > div {
    display: flex;
    align-items: center;

    /* 각각 감싼것 정렬*/
    > div {
      display: flex;
      align-items: center;
      width: 50%;

      /* 날짜, 시간 정렬 */
      > div {
        align-items: center;
        display: flex;
        justify-content: center;
      }
    }
  }
  .col2 {
    /* border: 1px solid red; */
    padding: 2px 10px;
    justify-content: start;
    width: calc(100% - 80px) !important;
    input {
      font-size: 12px;
      color: #355353;
    }
    input::placeholder {
      color: #2a58ad;
    }

    > span {
      display: inline-block;
      padding: 0 10px;
    }
  }
  .dp-style {
    border: none;
    background-color: rgba(42, 88, 173, 0.11);
  }
`;

// 견적서 수정

export const EditQuotationDiv = styled(QuotationFormDiv)`
  h4 {
    background-color: green !important;
  }
  .head {
    background-color: green !important;
  }
`;
