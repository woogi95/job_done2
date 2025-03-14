import styled from "@emotion/styled";
import { CSSProperties } from "react";

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
  h2.tit {
    font-size: 28px;
    font-weight: 600;
    padding: 20px 0;
  }
`;

// 테이블 감싸는 박스
export const TableWrapper = styled.div`
  width: 100%;
  background: white;
  border-radius: 8px;
  padding: 25px 20px;
  box-shadow:
    rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
`;

// 테이블 스타일
export const TableContainer = styled.table`
  width: 100%;
  max-width: 970px;
  border-collapse: collapse;
  min-height: 100%;
  th {
    background: #f8f9fa;
    color: #a0a3ab;
    font-weight: bold;
    padding: 10px;
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
  th,
  td {
    &:nth-of-type(1) {
      width: 10%;
    }
    &:nth-of-type(2) {
      width: 30%;
    }
    &:nth-of-type(3) {
      width: 20%;
    }
    &:nth-of-type(4) {
      width: 20%;
    }
  }
`;

// 버튼 스타일
export const PhotoButton = styled.button`
  padding: 6px 14px;
  border: 1px solid rgb(226, 226, 226);
  border-radius: 3px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  background: #0049a5;
  color: white;
  transition: 0.3s;

  &:hover {
    background: #218838;
  }
`;

export const AcceptButton = styled.button`
  padding: 6px 14px;
  border: 1px solid rgb(226, 226, 226);
  border-radius: 3px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  background: #ff9800;
  color: white;
  transition: 0.3s;

  &:hover {
    background: #e68900;
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

interface PageButtonProps {
  active: boolean;
}

// 페이지네이션 버튼
export const PageButton = styled.button<PageButtonProps>`
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

export const CancelButton = styled.button`
  padding: 10px 24px; /* 내부 여백 증가 */
  font-size: 18px; /* 글자 크기 증가 */
  width: 150px; /* 버튼 크기 조절 */
  height: 40px;
  border: none;
  border-radius: 8px; /* 둥근 모서리 */
  cursor: pointer;
  font-weight: bold;
  background: #bbbbbb;
  color: white;
  transition: 0.3s;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: #ff3044;
  }
`;
export const textareaStyle = {
  width: "100%",
  height: "80px",
  padding: "8px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  resize: "none" as const,
};
export const ApplyButton = styled.button`
  padding: 12px 24px; /* 내부 여백 증가 */
  font-size: 18px; /* 글자 크기 증가 */
  width: 150px; /* 버튼 크기 조절 */
  height: 40px;
  border: none;
  border-radius: 8px; /* 둥근 모서리 */
  cursor: pointer;
  font-weight: bold;
  background: #0049a5;
  color: white;
  transition: 0.3s;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: #218838;
  }
`;
export const modalButtonContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "10px",
};

export const modalStyle: CSSProperties = {
  width: "400px",
  height: "200px",
  padding: "20px",
  borderRadius: "10px",
  backgroundColor: "#fff",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  position: "relative" as const,
};
export const overlayStyle = {
  position: "fixed" as const,
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};
