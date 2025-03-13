import styled from "@emotion/styled";

// 전체 컨테이너
export const RequestBusiContainer = styled.div`
  padding: 30px 20px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow:
    rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
  max-width: 100%;
  width: 100%;
`;

// 테이블 감싸는 박스
export const TableWrapper = styled.div`
  width: 100%;
  background: white;
  min-height: calc(100vh - 390px);
  padding: 25px 20px;
  box-shadow:
    rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
`;

// 테이블 스타일
export const TableContainer = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  th {
    background: #f8f9fa;
    color: #a0a3ab;
    font-weight: bold;
    padding: 5px;
    text-align: center;
    border-bottom: 1px solid #ececec;
  }

  td {
    padding: 14px;
    text-align: center;
    color: #777;
    border-bottom: 1px dotted #ececec;
  }

  tbody tr:nth-child(odd) {
    background: #ffffff;
  }

  tbody tr:nth-child(even) {
    background: #f8f9fa;
  }
  /* 항목 가로길이 th, td 공통 */
  .th,
  .td {
    width: 100%;
    font-size: 14px;
    text-align: center;
    &:nth-of-type(1) {
      width: 15%;
    }
    &:nth-of-type(2) {
      width: 15%;
    }
    &:nth-of-type(3) {
      width: 20%;
    }
    &:nth-of-type(4) {
      width: 20%;
    }
    &:nth-of-type(5) {
      width: 20%;
    }
    &:nth-of-type(6) {
      width: 10%;
    }
  }
`;

// 버튼 스타일
export const PhotoButton = styled.button`
  padding: 6px 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  background: #0049a5;
  color: white;
  transition: 0.3s;

  &:hover {
    background: #218838;
  }
`;

export const CancelButton = styled.button`
  padding: 10px 24px; /* 내부 여백 증가 */
  font-size: 18px; /* 글자 크기 증가 */
  width: 170px; /* 버튼 크기 조절 */
  height: 60px;
  border: none;
  border-radius: 8px; /* 둥근 모서리 */
  cursor: pointer;
  font-weight: bold;
  background: #bbbbbb;
  color: white;
  transition: 0.3s;
  box-sizing: border-box;

  &:hover {
    background: #ff3044;
  }
`;
export const AcceptButton = styled.button`
  padding: 6px 14px;
  // border: 1px solid rgb(226, 226, 226);
  border-radius: 3px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;

  // background: #ff9800;
  color: #007aff;
  transition: 0.3s;

  &:hover {
    background: rgb(202, 201, 201);
  }
`;

export const StatusDone = styled.span`
  font-weight: bold;
  color: #41b662;
`;
export const CancelDone = styled.span`
  font-weight: bold;
  color: #db3319;
`;

export const EmptyMessage = styled.td`
  text-align: center;
  padding: 15px;
  font-size: 16px;
  color: #999;
`;

// 페이지네이션 컨테이너
export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  margin-top: 20px;
`;

// 페이지네이션 버튼
export const PageButton = styled.button`
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  font-size: 12px;
  background: ${props => (props.active ? "#007bff" : "#ddd")};
  color: ${props => (props.active ? "white" : "black")};
  transition: 0.3s;

  &:hover {
    background: ${props => (props.active ? "#0056b3" : "#bbb")};
  }
`;

export const EFilterDiv = styled.div`
  display: flex;
  justify-content: end;
  gap: 10px;
  /* padding: 0 10px; */

  .search-bar {
    order: 2;
    form {
      display: flex;
      align-items: center;
      gap: 8px;

      input {
        border: 1px solid #ccc;
        height: 33px;
        border-radius: 4px;
        width: 240px;
        padding: 5px;
        color: #555;
        font-size: 14px;
        background-color: #f8f9fa;
        &::placeholder {
          font-size: 12px;
          color: #bbb;
          transform: translateY(-2px);
        }
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
  }

  ul.btn-area {
    order: 1;
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
`;
