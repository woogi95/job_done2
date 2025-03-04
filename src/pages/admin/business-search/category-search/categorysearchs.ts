import styled from "@emotion/styled";

// 전체 컨테이너
export const RequestBusiContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px auto;
  width: 90%;
  max-width: 1000px;
  padding: 20px;
  gap: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow:
    rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
`;

// 테이블 감싸는 박스
export const TableWrapper = styled.div`
  width: 100%;
  background: white;
  border-radius: 8px;
  padding: 20px;
`;

// 테이블 스타일
export const TableContainer = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    background: #007bff;
    color: white;
    font-weight: bold;
    padding: 12px;
    text-align: center;
  }

  td {
    padding: 14px;
    text-align: center;
  }

  tbody tr:nth-child(odd) {
    background: #f8f9fa;
  }

  tbody tr:nth-child(even) {
    background: #ffffff;
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

export const AcceptButton = styled.button`
  padding: 6px 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  background: #ff9800;
  color: white;
  transition: 0.3s;

  &:hover {
    background: #e68900;
  }
`;

export const StatusDone = styled.span`
  font-weight: bold;
  color: #28a745;
`;
export const CancelDone = styled.span`
  font-weight: bold;
  color: #ff3044;
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
  gap: 10px;
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
  font-weight: bold;
  background: ${props => (props.active ? "#007bff" : "#ddd")};
  color: ${props => (props.active ? "white" : "black")};
  transition: 0.3s;

  &:hover {
    background: ${props => (props.active ? "#0056b3" : "#bbb")};
  }
`;
