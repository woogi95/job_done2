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
  deleteStyle,
  PostDelete,
  deleteSecondStyle,
  CategoryButton,
  YesOrNo,
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
  const [cateDeleteModal, setCateDeleteModal] = useState<boolean>(false);
  const [checkModal, setCheckModal] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number>(0);
  // ✅ API 요청 함수
  const getBusinessList = async () => {
    try {
      const res = await loginApi.get(`/api/business`);
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
        const cateData = filterData
          .filter((item: BusinessType) => item.categoryName === cateState)
          .map((item: BusinessType, index: number) => ({
            ...item,
            id: index + 1, // ✅ 필터링 후 다시 1부터 번호 부여
          }));
        setBusinessList(cateData);
      }
    } catch (error) {
      console.log("🚨 API 요청 오류:", error);
    }
  };
  // category 삭제 api
  const deleteCategory = async (item: number) => {
    try {
      const res = await loginApi.delete(`/api/category?categoryId=${item}`);
      console.log(res);
      setCheckModal(false);
    } catch (error) {
      console.log(error);
    }
  };
  // category 조회 api
  const getCategoryList = async () => {
    try {
      const res = await loginApi.get("/api/category");
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
      <h2 className="tit">카테고리 조회 | 등록</h2>
      <TableWrapper>
        <div
          style={{
            display: "flex",
            justifyContent: "right",
            gap: "5px",
            marginBottom: "20px",
          }}
        >
          <PostDelete onClick={() => setCateModal(true)}>등록</PostDelete>
          <PostDelete onClick={() => setCateDeleteModal(true)}>삭제</PostDelete>
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

      {cateModal && (
        <div style={overlayStyle} onClick={() => setCateModal(false)}>
          {" "}
          {/* ✅ 배경 클릭 시 모달 닫기 */}
          <div
            style={modalStyle as React.CSSProperties}
            onClick={e => e.stopPropagation()} // ✅ 모달 내부 클릭 시 이벤트 버블링 방지
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
      {cateDeleteModal && (
        <div style={overlayStyle} onClick={() => setCateDeleteModal(false)}>
          <div
            style={deleteStyle as React.CSSProperties}
            // onClick={e => e.stopPropagation()} // ✅ 모달 내부 클릭 시 이벤트 버블링 방지
          >
            삭제하실 카테고리를 선택 해주세요
            <div
              style={{
                display: "flex",
                width: "100%",
                height: "100%",
                gap: "5px",
                borderTop: "2px solid #777777",
                padding: "10px",
              }}
            >
              {categoryList.map(item => (
                <CategoryButton
                  key={item.categoryId}
                  value={item.categoryName}
                  onClick={() => {
                    setDeleteId(item.categoryId);
                    setCateDeleteModal(false);
                    setCheckModal(true);
                  }}
                >
                  {item.categoryName}
                </CategoryButton>
              ))}
            </div>
          </div>
        </div>
      )}
      {checkModal && (
        <div style={overlayStyle} onClick={() => setCheckModal(false)}>
          <div style={deleteSecondStyle} onClick={e => e.stopPropagation()}>
            <div>
              <span>정말 삭제 하시겠습니까?</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                height: "60px",
              }}
            >
              <YesOrNo
                style={{ width: "40%", height: "100%" }}
                onClick={() => deleteCategory(deleteId)}
              >
                네
              </YesOrNo>
              <YesOrNo onClick={() => setCheckModal(false)}>아니요</YesOrNo>
            </div>
          </div>
        </div>
      )}
    </RequestBusiContainer>
  );
};

export default CategorySearch;
