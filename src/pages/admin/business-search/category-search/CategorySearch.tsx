import axios from "axios";
import { useEffect, useState } from "react";
import {
  RequestBusiContainer,
  TableWrapper,
  TableContainer,
  EmptyMessage,
  PaginationContainer,
  PageButton,
  textareaStyle,
  modalButtonContainerStyle,
  ApplyButton,
  CancelButton,
  modalStyle,
  overlayStyle,
} from "./categorysearchs";
import { loginApi } from "../../../../apis/login";
import { useNavigate } from "react-router-dom";

type BusinessType = {
  id: number;
  businessId: number;
  businessName: string;
  categoryName: string;
  detailTypeName: string;
};

interface CategoryType {
  categoryId: number;
  categoryName: string;
}
const CategorySearch = () => {
  const [businessList, setBusinessList] = useState<BusinessType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // 한 페이지당 표시할 아이템 개수
  const [categoryList, setCategoryList] = useState<CategoryType[]>([]);
  const [cateState, setCateState] = useState<string>("");
  const navigate = useNavigate();
  // 등록모달 상태
  const [cateModal, setCateModal] = useState<boolean>(false);
  const [cateText, setCateText] = useState<string>("");
  // ✅ API 요청 함수
  const getBusinessList = async () => {
    try {
      const res = await axios.get(`/api/business`);
      const resData = res.data.resultData;

      // ✅ 올바르게 객체 리스트를 저장
      const filterData = resData.map((item: BusinessType, index: number) => ({
        id: index + 1,
        businessId: item.businessId,
        businessName: item.businessName,
        categoryName: item.categoryName,
        detailTypeName: item.detailTypeName,
      }));
      if (cateState === "") {
        setBusinessList(filterData);
      } else if (cateState) {
        const cateData = filterData.filter(
          (item: BusinessType) => item.categoryName === cateState,
        );
        setBusinessList(cateData);
      }
    } catch (error) {
      console.log("🚨 API 요청 오류:", error);
    }
  };

  // category 조회 api
  const getCategoryList = async () => {
    try {
      const res = await axios.get("/api/category");
      setCategoryList(res.data.resultData);
    } catch (error) {
      console.log(error);
    }
  };
  // category 등록
  const postCategory = async (data: string) => {
    try {
      const res = await loginApi.post("/api/category", {
        categoryName: data,
      });
      if (res.data.resultData === 1) {
        setCateModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // 업체 정보 이동
  const handleNavigate = (businessId: number) => {
    navigate(`infomationbusi/${businessId}`);
  };
  useEffect(() => {
    getBusinessList();
    getCategoryList();
  }, [cateState]);

  // ✅ 페이지네이션을 위한 데이터 슬라이싱
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = businessList.slice(indexOfFirstItem, indexOfLastItem);
  const maxPage = Math.ceil(businessList.length / itemsPerPage);

  return (
    <RequestBusiContainer>
      <TableWrapper>
        <div style={{ display: "flex", justifyContent: "right" }}>
          <button
            style={{
              border: "2px solid #333",
              backgroundColor: "#fff",
              color: "#333",
              width: "100px",
              height: "32px",
              padding: "5px 5px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.3s ease",
              marginBottom: "10px",
            }}
            onMouseOver={e => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                "#f5f5f5";
            }}
            onMouseOut={e => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                "#fff";
            }}
            onClick={() => setCateModal(true)}
          >
            카테고리 등록
          </button>
        </div>

        <TableContainer>
          <thead>
            <tr>
              <th>번호</th>
              <th>업체 이름</th>
              <th>
                카테고리{" "}
                <select
                  value={cateState}
                  onChange={e => setCateState(e.target.value)}
                  style={{ border: "1px solid black", borderRadius: "6px" }}
                >
                  <option value="">전체</option>
                  {categoryList.map(item => (
                    <option key={item.categoryId} value={item.categoryName}>
                      {item.categoryName}
                    </option>
                  ))}
                </select>
              </th>
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
                <tr
                  key={business.businessId}
                  onClick={() => handleNavigate(business.businessId)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{business.id}</td>
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          marginTop: "20px",
          alignItems: "center",
        }}
      >
        {maxPage > 1 && (
          <PaginationContainer style={{ alignItems: "center" }}>
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

      {cateModal && (
        <div style={overlayStyle}>
          <div
            style={modalStyle as React.CSSProperties}
            onClick={e => e.stopPropagation()}
          >
            <textarea
              value={cateText}
              onChange={e => setCateText(e.target.value)}
              placeholder="등록할 카테고리를 입력해주세요"
              style={textareaStyle}
            />
            <div style={modalButtonContainerStyle}>
              <ApplyButton onClick={() => postCategory(cateText)}>
                완료
              </ApplyButton>
              <CancelButton onClick={() => setCateModal(false)}>
                취소
              </CancelButton>
            </div>
          </div>
        </div>
      )}
    </RequestBusiContainer>
  );
};

export default CategorySearch;
