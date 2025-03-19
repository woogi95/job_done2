import axios from "axios";
import { useEffect, useState } from "react";
import {
  EmptyMessage,
  PageButton,
  PaginationContainer,
  RequestBusiContainer,
  TableContainer,
  TableWrapper,
} from "./ReservationSearchs";

interface BusiServiceCountType {
  id: number;
  businessName: string;
  detailTypeName: string;
  totalServiceCount: number;
  thisMonthServiceCount: number;
}

const ReservationSearch = () => {
  const [countList, setCountList] = useState<BusiServiceCountType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc"); // ✅ 정렬 상태 추가
  const itemsPerPage = 10; // 한 페이지당 표시할 아이템 개수

  // ✅ API 요청
  const getBusiServiceCount = async () => {
    try {
      const res = await axios.get("/api/business/serviceCount/byAdmin");
      if (res.data.resultData) {
        const data = res.data.resultData.map(
          (item: BusiServiceCountType, index: number) => ({
            id: index + 1,
            businessName: item.businessName,
            detailTypeName: item.detailTypeName,
            totalServiceCount: item.totalServiceCount,
            thisMonthServiceCount: item.thisMonthServiceCount,
          }),
        );

        setCountList(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBusiServiceCount();
  }, []);

  // ✅ 총 예약 수 정렬 기능
  const sortedList = [...countList]
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.totalServiceCount - b.totalServiceCount
        : b.totalServiceCount - a.totalServiceCount,
    )
    .map((item, index) => ({
      ...item,
      id: index + 1, // ✅ 정렬 후 ID 다시 1부터 시작
    }));

  // ✅ 페이지네이션 적용
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = sortedList.slice(indexOfFirstItem, indexOfLastItem);
  const maxPage = Math.ceil(countList.length / itemsPerPage);

  return (
    <RequestBusiContainer>
      <h2 className="tit">예약 별 조회</h2>
      <TableWrapper>
        <TableContainer>
          <thead>
            <tr>
              <th>번호</th>
              <th>업체 이름</th>
              <th>세부 유형</th>

              {/* ✅ 정렬 버튼 추가 */}
              <th
                onClick={() =>
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                }
                style={{ cursor: "pointer" }}
              >
                총 예약 수 {sortOrder === "asc" ? "▲" : "▼"}{" "}
                {/* 정렬 상태 아이콘 표시 */}
              </th>

              <th>이번달 예약</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length === 0 ? (
              <tr>
                <EmptyMessage colSpan={5}>등록된 업체가 없습니다.</EmptyMessage>
              </tr>
            ) : (
              currentData.map(business => (
                <tr key={business.businessName}>
                  <td>{business.id}</td> {/* ✅ 정렬 후 번호 1부터 다시 부여 */}
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
      <div style={{ display: "flex", justifyContent: "center" }}>
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
      </div>
    </RequestBusiContainer>
  );
};

export default ReservationSearch;
