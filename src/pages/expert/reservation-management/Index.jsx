import { useEffect, useState, useMemo } from "react";
import { EFilterDiv } from "../../../components/expert-List/expertList";
// import ExportFilter from "../../../components/expert-List/ExportFilter";
import {
  EListContDiv,
  ExpertListPageDiv,
  ExportListDiv,
} from "./reservationMangement";
import ExpertReservation from "../../../components/papers/ExpertReservation";
import { useRecoilValue } from "recoil";
import { statusAtom } from "../../../atoms/statusAtom";
// import axios from "axios";
// import { businessDetailState } from "../../../atoms/businessAtom";
import { loginApi } from "../../../apis/login";
import { Pagination } from "antd";

function Index() {
  const [isReservationPop, setIsReservationPop] = useState(false);
  const [seletedServiceId, setSeletedServiceId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all"); // 상태 필터
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태
  const [appliedSearchQuery, setAppliedSearchQuery] = useState(""); // 적용된 검색어 상태
  const itemsPerPage = 10;

  const businessId = localStorage.getItem("businessId");
  const status = useRecoilValue(statusAtom);
  // const businessDetail = useRecoilValue(businessDetailState);
  const [reservationData, setReservationData] = useState([]);
  const [pagination, setPagination] = useState({
    all: { currentPage: 1, totalItems: 0 },
    0: { currentPage: 1, totalItems: 0 },
    1: { currentPage: 1, totalItems: 0 },
    3: { currentPage: 1, totalItems: 0 },
    5: { currentPage: 1, totalItems: 0 },
  });

  const getStatusList = async (businessId, statusFilter, page) => {
    console.log("API 호출 파라미터:", {
      businessId,
      statusFilter,
      page,
      itemsPerPage,
    });
    try {
      const url = `/api/service?business_id=${businessId}&status=${0}&page=${page}&size=${itemsPerPage}`;
      const res = await loginApi.get(url);
      console.log("API 응답 데이터:", res.data);

      setReservationData(res.data.resultData);
      setPagination(prev => ({
        ...prev,
        [statusFilter]: {
          currentPage: page,
          totalItems: res.data.totalCount || 0, // 전체 데이터의 개수로 업데이트
        },
      }));
    } catch (error) {
      console.error("API 호출 에러:", error);
    }
  };

  useEffect(() => {
    if (businessId) {
      getStatusList(businessId, status, currentPage);
    }
  }, [businessId, status, currentPage]);

  const getStatusText = completed => {
    switch (completed) {
      case 0:
        return "대기"; // Pending
      case 1:
        return "완료"; // Completed
      case 3:
        return "취소"; // Canceled
      case 5:
        return "거절"; // Rejected
      default:
        return "미정"; // Undefined
    }
  };

  // 검색어 입력 핸들러
  const handleSearch = e => {
    e.preventDefault(); // 기본 동작 방지
    console.log("검색어:", searchQuery);
    if (searchQuery.trim() === "") {
      setAppliedSearchQuery(""); // 검색어가 비어 있으면 초기화
    } else {
      setAppliedSearchQuery(searchQuery);
    }
    setCurrentPage(1); // 검색 시 페이지를 1로 초기화
  };

  // 엔터키 이벤트 핸들러
  const handleKeyPress = e => {
    if (e.key === "Enter") {
      e.preventDefault(); // 기본 동작 방지
      handleSearch(e);
    }
  };

  // 검색어 필터링 로직 수정
  const filteredData = useMemo(() => {
    let filtered = reservationData;

    // 상태 필터링
    if (statusFilter !== "all") {
      filtered = filtered.filter(
        item => item.completed === Number(statusFilter),
      );
    }

    // 검색어 필터링 (적용된 검색어가 있을 경우)
    if (appliedSearchQuery) {
      filtered = filtered.filter(
        item =>
          item.userName.includes(appliedSearchQuery) ||
          item.createdAt.includes(appliedSearchQuery) ||
          item.startDate.includes(appliedSearchQuery),
      );
    }

    console.log("필터링된 데이터:", filtered);
    return filtered;
  }, [reservationData, statusFilter, appliedSearchQuery]);

  // 현재 페이지네이션 정보 업데이트
  const currentPagination = {
    currentPage: pagination[statusFilter]?.currentPage || 1,
    totalItems: filteredData.length,
  };

  // 현재 페이지의 데이터
  const startIndex = (currentPagination.currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

  // 상태 필터 변경 핸들러
  const handleStatusFilter = status => {
    console.log("필터 변경:", status);
    setStatusFilter(status);
    setCurrentPage(1); // 필터 변경 시 첫 페이지로 이동
  };

  // 신청서 확인 버튼 클릭 핸들러
  const handleReservationClick = serviceId => {
    setSeletedServiceId(serviceId); // 선택된 서비스 아이디 설정
    setIsReservationPop(true); // 신청서 팝업 열기
  };

  // 페이지 변경 핸들러
  const handlePageChange = page => {
    setCurrentPage(page); // 페이지 변경 시 currentPage 업데이트
    getStatusList(businessId, statusFilter, page); // 해당 페이지의 데이터를 가져옴
  };

  return (
    <ExpertListPageDiv>
      <h2 className="tit">예약리스트</h2>
      <EListContDiv>
        <EFilterDiv>
          <div className="search-bar">
            <form onSubmit={handleSearch}>
              <label htmlFor="search">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="이름, 업체명, 서비스명, 접수일, 예약날짜로 검색"
                />
              </label>
              <button type="button">검색</button>
            </form>
          </div>
          <ul className="btn-area">
            <li>
              <button
                className={`completed3 ${statusFilter === "3" ? "active" : ""}`}
                onClick={() => handleStatusFilter("3")}
              >
                취소
              </button>
            </li>
            <li>
              <button
                className={`completed0 ${statusFilter === "0" ? "active" : ""}`}
                onClick={() => handleStatusFilter("0")}
              >
                대기
              </button>
            </li>
            <li>
              <button
                className={`completed1 ${statusFilter === "1" ? "active" : ""}`}
                onClick={() => handleStatusFilter("1")}
              >
                완료
              </button>
            </li>
            <li>
              <button
                className={`completed5 ${statusFilter === "5" ? "active" : ""}`}
                onClick={() => handleStatusFilter("5")}
              >
                거절
              </button>
            </li>
            <li>
              <button
                className={`all ${statusFilter === "all" ? "active" : ""}`}
                onClick={() => handleStatusFilter("all")}
              >
                전체보기
              </button>
            </li>
          </ul>
        </EFilterDiv>
        <ExportListDiv>
          <ul className="tr">
            <li className="th">접수일</li>
            <li className="th">예약날짜</li>
            <li className="th">서비스 종류</li>
            <li className="th">예약자</li>
            <li className="th">예상금액</li>
            <li className="th">예약현황</li>
            <li className="th">예약신청서확인</li>
          </ul>

          {currentItems.map((reservation, index) => (
            <ul
              key={`${reservation.serviceId}-${reservation.createdAt}-${index}`}
              className="tr"
            >
              <li className="td">{reservation.startDate || "미정"}</li>
              <li className="td black">
                {reservation.createdAt.split(" ")[0]}
              </li>
              <li className="td">{reservation.detailTypeName}</li>
              <li className="td">{reservation.userName}</li>
              <li className="td">{reservation.price?.toLocaleString()} 원</li>
              <li className="td">
                <p className={`completed${reservation.completed}`}>
                  {getStatusText(reservation.completed)}
                </p>
              </li>
              <li className="td blue btn-area">
                <button
                  onClick={() => {
                    handleReservationClick(reservation.serviceId);
                  }}
                >
                  신청서
                </button>
              </li>
            </ul>
          ))}
        </ExportListDiv>

        <Pagination
          className="pagination"
          currentPage={currentPagination.currentPage}
          totalItems={filteredData.length}
          current={currentPagination.currentPage} // currentPage 사용
          total={currentPagination.totalItems} // totalItems 사용
          pageSize={itemsPerPage} // 한 페이지에 보여줄 아이템 수
          onChange={handlePageChange} // 페이지 변경 시 호출
        />
      </EListContDiv>
      {isReservationPop && (
        <ExpertReservation
          isReservationPop={isReservationPop}
          setIsReservationPop={setIsReservationPop}
          serviceId={seletedServiceId}
        />
      )}
    </ExpertListPageDiv>
  );
}

export default Index;
