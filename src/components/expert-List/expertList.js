import styled from "@emotion/styled";

// 필터
export const EFilterDiv = styled.div`
  display: flex;
  justify-content: end;
  gap: 10px;
  /* padding: 0 10px; */

  ul.btn-area {
    /* background-color: #f8f9fa; */
    background-color: #fff;
    border: 1px solid #ddd;
    padding: 5px 8px;
    display: flex;
    gap: 5px;
    border-radius: 5px;
    li {
      button {
        border: 1px solid rgb(226, 226, 226);
        font-size: 13px;
        padding: 4px 8px;
      }
      /* 유저 - 예약취소 */
      button.completed3 {
        background-color: #f8f9fa;
        color: #a0a3ab;
      }
      /* 예약완료 견적대기 */
      button.completed0 {
        background-color: #edfbf3;
        color: #41b662;
      }
      /* 예약승락 - 견적서 작성중 */
      button.completed1 {
        background-color: #e8f2ff;
        color: #4b8ff8;
      }
      /* 업체 - 예약 거절*/
      button.completed5 {
        background-color: #fdeeec;
        color: #db3319;
      }
    }
  }
  .search-bar {
    /* border: 1px solid; */
    display: flex;
    align-items: center;
    gap: 8px;

    input {
      border: 1px solid #ccc;
      height: 33px;
      border-radius: 4px;
      width: 180px;
      padding: 5px;
      color: #555;
      font-size: 14px;
      background-color: #f8f9fa;
    }
    button {
      width: 60px;
      height: 35px;
      background-color: #2a58ad;
      border: 1px solid #eee;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 15px;
    }
  }
`;
