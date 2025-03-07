import styled from "@emotion/styled";

// 필터
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
  .pagination {
    border: 1px solid;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px; /* 버튼 사이 간격 */
    margin: 20px 0;
  }

  .pagination button {
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f8f9fa;
    color: #333;
    font-size: 14px;
    cursor: pointer;
    transition:
      background-color 0.3s,
      color 0.3s;
  }

  .pagination button:hover {
    background-color: #007bff;
    color: #fff;
    border-color: #007bff;
  }

  .pagination button.active {
    background-color: #007bff;
    color: #fff;
    border-color: #007bff;
    font-weight: bold;
  }

  .pagination button:disabled {
    background-color: #e9ecef;
    color: #6c757d;
    cursor: not-allowed;
    border-color: #dee2e6;
  }
`;
