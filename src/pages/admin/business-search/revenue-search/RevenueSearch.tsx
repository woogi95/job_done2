import axios from "axios";
import { useEffect, useState } from "react";
import {
  EmptyMessage,
  PageButton,
  PaginationContainer,
  RequestBusiContainer,
  TableContainer,
  TableWrapper,
} from "./RevenueSearchs";

interface BusirevenueType {
  id: number;
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
        const data = res.data.resultData.map(
          (item: BusirevenueType, index: number) => ({
            id: index + 1,
            businessName: item.businessName,
            detailTypeName: item.detailTypeName,
            totalRevenue: item.totalRevenue,
            thisMonthRevenue: item.thisMonthRevenue,
          }),
        );
        setRevenueList(data);
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
      <h2 className="tit">매출 별 조회</h2>
      <TableWrapper>
        <TableContainer>
          <thead>
            <tr>
              <th>번호</th>
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
                  <td>{business.id}</td>
                  <td>{business.businessName}</td>
                  <td>{business.detailTypeName}</td>
                  <td>{business.totalRevenue.toLocaleString()} 원</td>
                  <td>{business.thisMonthRevenue.toLocaleString()} 원</td>
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
