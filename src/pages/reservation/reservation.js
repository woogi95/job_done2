import styled from "@emotion/styled";
import { BtnAreaDiv } from "../../components/papers/papers";

export const ReservationDiv = styled.div`
  padding: 80px 100px;

  .tit {
    text-align: center;
    font-size: 38px;
  }
`;
export const ReserVationContDiv = styled.div`
  padding: 80px 0 50px;

  > form {
    width: 100%;
    position: relative;
    max-width: 900px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    flex-direction: row;
    margin: 0 auto;
    > div {
      width: 400px;
    }
  }
  form::after {
    content: "";
    width: 2px;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 829px;
    background-color: #eee;
  }
  h3 {
    font-size: 18px;
    font-weight: 600;
    color: #121212;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 5px;
    p {
      font-size: 12px;
      color: #999;
      margin-bottom: 0px;
      font-weight: 600;
      b {
        color: red;
      }
    }
  }
  h4 {
    font-size: 14px;
    font-weight: 600;
    color: #222;
  }
  p {
    font-size: 12px;
    color: #999;
    margin-bottom: 5px;
    b {
      color: red;
    }
  }
`;

// 예약하기 컨텐츠 --- 왼쪽
export const LeftContDiv = styled.div`
  /* 큐브 */
  > div {
    padding: 0px 0 25px;
  }
`;
/* 날짜선택 date-picker custom*/
export const DateDiv = styled.div`
  .react-datepicker {
    width: 100%;
    border: 1px solid #ccc;
    background-color: #dde9ff;
  }
  .react-datepicker__month-container {
    width: 100%;
    padding-bottom: 10px;
  }
  .react-datepicker__day-name {
    line-height: 25px;
    margin-top: 15px;
    width: calc((100% - 65px) / 7);
    font-family: "Pretendard-Regular" !important;
  }
  .react-datepicker__day,
  .react-datepicker__time-name {
    width: calc((100% - 50px) / 7);
    background-color: #fff;
    font-size: 14px;
    line-height: 45px;
    border: 1px solid #ccc;
    color: #333;
  }
  .react-datepicker__day-name:nth-of-type(1),
  .react-datepicker__day:nth-of-type(1) {
    color: #fc5456;
  }
  .react-datepicker__day-name:nth-of-type(7),
  .react-datepicker__day:nth-of-type(7) {
    color: #4581f0;
  }
  .react-datepicker__header {
    background-color: #dde9ff;
    border-bottom: 1px solid #dde9ff;
    border-top-left-radius: 0.3rem;
    padding: 20px 0 0px;
  }
  .react-datepicker__day--outside-month {
    opacity: 0.6;
  }
  .react-datepicker__day--selected,
  .react-datepicker__day--in-selecting-range,
  .react-datepicker__day--in-range,
  .react-datepicker__month-text--selected,
  .react-datepicker__month-text--in-selecting-range,
  .react-datepicker__month-text--in-range,
  .react-datepicker__quarter-text--selected,
  .react-datepicker__quarter-text--in-selecting-range,
  .react-datepicker__quarter-text--in-range,
  .react-datepicker__year-text--selected,
  .react-datepicker__year-text--in-selecting-range,
  .react-datepicker__year-text--in-range {
    border-radius: 0.3rem;
    background-color: #34c5f0;
    color: #fff;
  }
  .react-datepicker__day--selected:not([aria-disabled="true"]):hover,
  .react-datepicker__day--in-selecting-range:not([aria-disabled="true"]):hover,
  .react-datepicker__day--in-range:not([aria-disabled="true"]):hover,
  .react-datepicker__month-text--selected:not([aria-disabled="true"]):hover,
  .react-datepicker__month-text--in-selecting-range:not(
      [aria-disabled="true"]
    ):hover,
  .react-datepicker__month-text--in-range:not([aria-disabled="true"]):hover,
  .react-datepicker__quarter-text--selected:not([aria-disabled="true"]):hover,
  .react-datepicker__quarter-text--in-selecting-range:not(
      [aria-disabled="true"]
    ):hover,
  .react-datepicker__quarter-text--in-range:not([aria-disabled="true"]):hover,
  .react-datepicker__year-text--selected:not([aria-disabled="true"]):hover,
  .react-datepicker__year-text--in-selecting-range:not(
      [aria-disabled="true"]
    ):hover,
  .react-datepicker__year-text--in-range:not([aria-disabled="true"]):hover {
    background-color: #34c5f0;
    color: #fff;
  }
  .react-datepicker__day--keyboard-selected:not([aria-disabled="true"]):hover,
  .react-datepicker__month-text--keyboard-selected:not(
      [aria-disabled="true"]
    ):hover,
  .react-datepicker__quarter-text--keyboard-selected:not(
      [aria-disabled="true"]
    ):hover,
  .react-datepicker__year-text--keyboard-selected:not(
      [aria-disabled="true"]
    ):hover {
    background-color: #34c5f0;
    color: #fff;
  }
  .react-datepicker__day--keyboard-selected,
  .react-datepicker__month-text--keyboard-selected,
  .react-datepicker__quarter-text--keyboard-selected,
  .react-datepicker__year-text--keyboard-selected {
    background-color: #34c5f0;
    color: #fff;
  }

  .react-datepicker__navigation-icon::before,
  .react-datepicker__year-read-view--down-arrow,
  .react-datepicker__month-read-view--down-arrow,
  .react-datepicker__month-year-read-view--down-arrow {
    border-color: #34c5f0;
  }

  h2.react-datepicker__current-month {
    width: 110px;
    font-family: "Pretendard-Regular" !important;
    font-size: 18px;
    color: #333;
  }

  .react-datepicker__navigation--previous {
    right: 60px;
    left: auto;
  }
  .react-datepicker__navigation--next {
    right: 10px;
  }
  .react-datepicker__navigation {
    top: 17px;
  }
`;
// 시간선택
export const TimeDiv = styled.div`
  > div {
    display: flex;
    gap: 10px 6px;
    flex-wrap: wrap;
    margin-bottom: 10px;
    h4 {
      width: 100%;
    }
  }
  div {
    input {
      display: none;
      + label {
        border: 1px solid #ccc;
        padding: 9px;
        text-align: center;
        border-radius: 5px;
        min-width: 76px;
        font-size: 13px;
        color: #333;
        font-family: "Roboto", sans-serif;
        display: inline-block;
        cursor: pointer;
        transition: all 0.3s;
      }
    }
    input:checked + label {
      background-color: #34c5f0;
      border: 1px solid #34c5f0;
      color: #fff;
    }
  }
`;
export const ReservationInfoDiv = styled.div`
  label {
    display: flex;
    align-items: center;
    border: 1px solid #ccc;
    overflow: hidden;
    border-radius: 5px;
    margin-bottom: 10px;
    position: relative;
    input {
      height: 40px;
      line-height: 40px;
      width: 100%;
      text-indent: 5px;
      color: #555;
      font-size: 14px;
      &::placeholder {
        color: #dcdcdc;
      }
    }
    input.addr {
      width: calc(100% - 85px);
    }
    h4 {
      width: 85px;
      line-height: 40px;
      padding-left: 10px;
      border-right: 1px solid #ccc;
    }
    button {
      border-radius: 4px;
      font-size: 12px;
      width: 75px;
      height: 34px;
      margin-right: 3px;
      color: #fff;
      background-color: #34c5f0;
      box-shadow: 0 0 3px rgba(20, 111, 139, 0.3);
      transition: all 0.3s;
      &:hover {
        transform: scale(0.97);
        background-color: #34a5f0;
      }
    }
  }
  .error-m {
    color: red;
  }
`;
// 예약하기 컨텐츠 --- 오른쪽
export const RightContDiv = styled.div`
  width: 50%;
  > div {
    margin-bottom: 25px;
  }
`;
// 옵션선택
export const SelectOptionDiv = styled.div`
  > div {
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fdfdfd;
    height: 690px;
    overflow-y: auto;
    h4 {
      font-size: 16px;
      padding: 10px;
      background-color: #edf7fe;
      background-color: #dde9ff;
      border-top: 1px solid #ddd;
      border-bottom: 4px double #999;
    }
    > div:nth-of-type(1) h4 {
      border-top-color: transparent;
    }
    .option-list {
      padding: 10px;
      label {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
        border-bottom: 2px dotted #ddd;
        padding: 8px;
        input {
          display: none;
        }
        input:checked + em b,
        input:checked + em + span {
          color: #34a5f0;
        }
        em {
          display: flex;
          align-items: center;
          svg {
            transform: translateY(1px);
            font-size: 18px;
          }
          i {
            margin-right: 6px;
          }
        }
      }
    }
  }
`;
// 평수입력
export const RoomSizeDiv = styled.div`
  margin-top: 35px;
  label {
    display: flex;
    border: 1px solid #ccc;
    overflow: hidden;
    border-radius: 5px;
    margin-bottom: 10px;
    input {
      height: 40px;
      line-height: 40px;
      width: 100%;
      text-indent: 5px;
      color: #555;
      font-size: 14px;
      &::placeholder {
        color: #dcdcdc;
      }
    }
    h4 {
      width: 85px;
      line-height: 40px;
      padding-left: 10px;
      border-right: 1px solid #ccc;
    }
  }
`;
// 총금액
export const TotalPriceDiv = styled.div`
  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #ccc;
    overflow: hidden;
    border-radius: 5px;
    background-color: #4581f0;

    > * {
      display: flex;
      align-items: center;
      height: 50px;
    }
    h4 {
      padding-left: 10px;
      width: 75px;
      font-size: 18px;
      font-weight: 500;
      color: rgb(12, 255, 255);
    }
    p {
      font-size: 20px;
      width: calc(100% - 75px);
      justify-content: center;
      margin-bottom: 0;
      color: #fff;
    }
  }
`;
// 예약하기 컨텐츠 아래
export const BottomContDiv = styled.div`
  width: 100% !important;

  textarea {
    width: 100%;
    border: 1px solid #ccc;
    height: 220px;
    resize: none;
    box-sizing: border-box;
    background-color: #fdfdfd;
    padding: 20px;
    color: #555;
    line-height: 1.3em;
  }
  textarea::placeholder {
    color: #dcdcdc;
  }
`;
export const BtnAreaCustomDiv = styled(BtnAreaDiv)`
  width: 100% !important;

  button.cancel {
    background-color: #777777;
  }
  button.confirm {
    background-color: #4581f0;
  }
`;
