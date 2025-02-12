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
          border-bottom: 1px dotted #333;
          &:last-child {
            border-bottom: none;
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
        input {
          width: calc(100% - 80px);
          padding: 5px;
          /* border: 1px solid red; */
          font-size: 14px;
          height: 34px;
        }
      }
    }
    /* textarea */
    .text-area {
      textarea {
        width: 100%;
        height: 120px;
        resize: none;
        border: 1px solid #333;
        outline: none;
        padding: 15px;
        font-size: 14px;
        line-height: 1.3em;
        color: #333;
      }
    }
  }
`;
// 추가견적
export const AddOptionDiv = styled.div`
  > div {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .tr {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
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
          width: 50%;
        }
        &:nth-of-type(3) {
          width: 10%;
        }
        &:nth-of-type(4) {
          width: 35%;
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
    }
    .price {
      input {
        text-align: right;
      }
    }
  }
`;
export const DatePriceDiv = styled.div`
  .date {
    border-bottom: none;
  }
  .price {
    border-top: 1px dotted #333;
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
