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
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc"); // ✅ 정렬 상태 추가
  const [searchKeyword, setSearchKeyword] = useState(""); // ✅ 검색 키워드 상태 추가

  const itemsPerPage = 10; // 한 페이지당 표시할 아이템 개수

  // 📌 API 요청
  const getBusirevenue = async () => {
    try {
      const res = await axios.get("/api/business/revenue/byAdmin");
      if (res.data.resultData) {
        const data = res.data.resultData.map(
          (item: BusirevenueType, index: number) => ({
            id: index + 1, // 기본 ID 설정
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

  // ✅ 업체 이름 필터링
  const filteredList = revenueList.filter(business =>
    business.businessName.toLowerCase().includes(searchKeyword.toLowerCase()),
  );

  // ✅ 정렬 로직 (정렬 후 ID 재설정)
  const sortedRevenueList = [...filteredList]
    .sort((a, b) => {
      return sortOrder === "asc"
        ? a.totalRevenue - b.totalRevenue
        : b.totalRevenue - a.totalRevenue;
    })
    .map((item, index) => ({
      ...item,
      id: index + 1, // 정렬 후 새로운 ID 설정 (1번부터 다시 시작)
    }));

  // ✅ 페이지네이션 적용
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = sortedRevenueList.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  const maxPage = Math.ceil(sortedRevenueList.length / itemsPerPage);

  return (
    <RequestBusiContainer>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 className="tit">매출 별 조회</h2>
        <input
          type="text"
          placeholder="업체 이름 검색"
          value={searchKeyword}
          onChange={e => setSearchKeyword(e.target.value)}
          style={{
            padding: "5px",
            fontSize: "16px",
            width: "100%",
            maxWidth: "300px",
            height: "40px",
            border: "2px solid #f6f6f6",
            borderRadius: "5px",
          }}
        />
      </div>

      <TableWrapper>
        <TableContainer>
          <thead>
            <tr>
              <th>번호</th>
              <th>업체 이름</th>
              <th>세부 유형</th>
              <th
                onClick={() =>
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                }
                style={{ cursor: "pointer" }}
              >
                총 매출
                {sortOrder === "asc" ? " ▲" : " ▼"}{" "}
                {/* 정렬 상태 아이콘 표시 */}
              </th>

              <th>이번달 매출</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length === 0 ? (
              <tr>
                <EmptyMessage colSpan={5}>검색 결과가 없습니다.</EmptyMessage>
              </tr>
            ) : (
              currentData.map(business => (
                <tr key={business.businessName}>
                  <td>{business.id}</td>{" "}
                  {/* ✅ 정렬 후 ID가 1번부터 다시 매겨짐 */}
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

      {/* ✅ 페이지네이션 UI */}
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
