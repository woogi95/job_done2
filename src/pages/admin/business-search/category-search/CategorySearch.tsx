import axios from "axios";
import { useEffect, useState } from "react";
import {
  RequestBusiContainer,
  TableWrapper,
  TableContainer,
  EmptyMessage,
  PaginationContainer,
  PageButton,
} from "./categorysearchs";

type BusinessType = {
  businessId: number;
  businessName: string;
  categoryName: string;
  detailTypeName: string;
};

const CategorySearch = () => {
  const [businessList, setBusinessList] = useState<BusinessType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15; // 한 페이지당 표시할 아이템 개수

  // ✅ API 요청 함수
  const getBusinessList = async () => {
    try {
      const res = await axios.get(`/api/business`);
      const resData = res.data.resultData;

      // ✅ 올바르게 객체 리스트를 저장
      const filterData = resData.map((item: BusinessType) => ({
        businessId: item.businessId,
        businessName: item.businessName,
        categoryName: item.categoryName,
        detailTypeName: item.detailTypeName,
      }));

      setBusinessList(filterData); // ✅ 상태 업데이트
    } catch (error) {
      console.log("🚨 API 요청 오류:", error);
    }
  };

  useEffect(() => {
    getBusinessList();
  }, []);

  // ✅ 페이지네이션을 위한 데이터 슬라이싱
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = businessList.slice(indexOfFirstItem, indexOfLastItem);
  const maxPage = Math.ceil(businessList.length / itemsPerPage);

  return (
    <RequestBusiContainer>
      <h3>등록 요청 업체 목록</h3>
      <TableWrapper>
        <TableContainer>
          <thead>
            <tr>
              <th>업체 ID</th>
              <th>업체 이름</th>
              <th>카테고리</th>
              <th>세부 유형</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length === 0 ? (
              <tr>
                <EmptyMessage colSpan={4}>등록된 업체가 없습니다.</EmptyMessage>
              </tr>
            ) : (
              currentData.map(business => (
                <tr key={business.businessId}>
                  <td>{business.businessId}</td>
                  <td>{business.businessName}</td>
                  <td>{business.categoryName}</td>
                  <td>{business.detailTypeName}</td>
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

export default CategorySearch;
