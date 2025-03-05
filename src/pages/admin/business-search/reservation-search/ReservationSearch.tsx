import axios from "axios";
import { useEffect, useState } from "react";
import {
  EmptyMessage,
  PageButton,
  PaginationContainer,
  RequestBusiContainer,
  TableContainer,
  TableWrapper,
} from "../category-search/categorysearchs";

interface BusiServiceCountType {
  businessName: string;
  detailTypeName: string;
  totalServiceCount: number;
  thisMonthServiceCount: number;
}
const ReservationSearch = () => {
  const [countList, setCountList] = useState<BusiServiceCountType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // 한 페이지당 표시할 아이템 개수
  //api 요청
  const getBusiServiceCount = async () => {
    try {
      const res = await axios.get("/api/business/serviceCount/byAdmin");
      if (res.data.resultData) {
        setCountList(res.data.resultData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBusiServiceCount();
  }, []);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = countList.slice(indexOfFirstItem, indexOfLastItem);
  const maxPage = Math.ceil(countList.length / itemsPerPage);
  return (
    <RequestBusiContainer>
      <TableWrapper>
        <TableContainer>
          <thead>
            <tr>
              <th>업체 이름</th>
              <th>세부 유형</th>
              <th>총 예약 수</th>
              <th>이번달 예약</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length === 0 ? (
              <tr>
                <EmptyMessage colSpan={4}>등록된 업체가 없습니다.</EmptyMessage>
              </tr>
            ) : (
              currentData.map(business => (
                <tr key={business.businessName}>
                  <td>{business.businessName}</td>
                  <td>{business.detailTypeName}</td>
                  <td>{business.totalServiceCount}</td>
                  <td>{business.thisMonthServiceCount}</td>
                </tr>
              ))
            )}
          </tbody>
        </TableContainer>
      </TableWrapper>

      {/* ✅ 페이지네이션 UI 추가 */}
      {maxPage > 1 && (
        <PaginationContainer>
          {[...Array(maxPage)].map((_, index) => (
            <PageButton
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              active={currentPage === index + 1}
            >
              {index + 1}
            </PageButton>
          ))}
        </PaginationContainer>
      )}
    </RequestBusiContainer>
  );
};

export default ReservationSearch;
