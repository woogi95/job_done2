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

interface BusirevenueType {
  businessName: string;
  detailTypeName: string;
  totalRevenue: number;
  thisMonthRevenue: number;
}
const RevenueSearch = () => {
  const [revenueList, setRevenueList] = useState<BusirevenueType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // 한 페이지당 표시할 아이템 개수
  //api 요청
  const getBusirevenue = async () => {
    try {
      const res = await axios.get("/api/business/revenue/byAdmin");
      if (res.data.resultData) {
        setRevenueList(res.data.resultData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBusirevenue();
  }, []);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = revenueList.slice(indexOfFirstItem, indexOfLastItem);
  const maxPage = Math.ceil(revenueList.length / itemsPerPage);
  return (
    <RequestBusiContainer>
      <TableWrapper>
        <TableContainer>
          <thead>
            <tr>
              <th>업체 이름</th>
              <th>세부 유형</th>
              <th>총 매출</th>
              <th>이번달 매출</th>
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
                  <td>{business.totalRevenue}</td>
                  <td>{business.thisMonthRevenue}</td>
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

export default RevenueSearch;
