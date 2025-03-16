import { EFilterDiv } from "../../../components/expert-List/expertList";
import {
  EListContDiv,
  ExpertListPageDiv,
  ExportListDiv,
} from "../reservation-management/reservationMangement";
// import { useRecoilValue } from "recoil";
import { useEffect, useState, useMemo } from "react";
// import { statusAtom } from "../../../atoms/statusAtom";
import { loginApi } from "../../../apis/login";
import { Pagination } from "antd";
// import ExpertReservation from "../../../components/papers/ExpertReservation";
import { useNavigate } from "react-router-dom";
import ExpertEstimate from "../../../components/papers/ExpertEstimate";
import ExpertReservation from "../../../components/papers/ExpertReservation";

function Index() {
  const [isReservationPop, setIsReservationPop] = useState(false);
  const [seletedServiceId, setSeletedServiceId] = useState(null);
  // const [isEstimatePop, setIsEstimatePop] = useState(false);
  // const [seletedServiceId, setSeletedServiceId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all"); // 상태 필터
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태
  const [appliedSearchQuery, setAppliedSearchQuery] = useState(""); // 적용된 검색어 상태
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const businessId = localStorage.getItem("businessId");
  const [reservationData, setReservationData] = useState([]);
  const [pagination, setPagination] = useState({
    all: { currentPage: 1, totalItems: 0 },
    0: { currentPage: 1, totalItems: 0 },
    2: { currentPage: 1, totalItems: 0 },
  });

  const getStatusList = async (businessId, page) => {
    try {
      const url = `/api/service?business_id=${businessId}&status=1&page=${page}&size=${itemsPerPage}`;
      const res = await loginApi.get(url);
      setReservationData(res.data.resultData);
      setPagination(prev => ({
        ...prev,
        all: {
          currentPage: page,
          totalItems: res.data.totalCount || 0,
        },
      }));
    } catch (error) {
      console.log("API 호출 에러:", error);
    }
  };

  useEffect(() => {
    if (businessId) {
      getStatusList(businessId, currentPage);
    }
  }, [businessId, currentPage]);

  const getStatusText = completed => {
    switch (completed) {
      case 0:
        return "작성대기";
      case 2:
        return "견적완료";
      default:
        return "전체보기";
    }
  };

  const handleSearch = e => {
    e.preventDefault();
    setAppliedSearchQuery(searchQuery);
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleKeyPress = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch(e); // 엔터키로 검색 실행
    }
  };

  const filteredData = useMemo(() => {
    let filtered = reservationData;

    // 상태 필터링
    if (statusFilter === "2") {
      filtered = filtered.filter(item => item.completed === 2);
    } else if (statusFilter === "0") {
      filtered = filtered.filter(item => item.completed === 0);
    } else if (statusFilter === "all") {
      // 전체보기
      filtered = reservationData;
    }

    // 검색어 필터링
    if (appliedSearchQuery) {
      filtered = filtered.filter(
        item =>
          item.userName
            .toLowerCase()
            .includes(appliedSearchQuery.toLowerCase()) ||
          item.businessName
            .toLowerCase()
            .includes(appliedSearchQuery.toLowerCase()) ||
          item.detailTypeName
            .toLowerCase()
            .includes(appliedSearchQuery.toLowerCase()) ||
          item.createdAt.includes(appliedSearchQuery) ||
          item.startDate.includes(appliedSearchQuery),
      );
    }

    return filtered;
  }, [reservationData, statusFilter, appliedSearchQuery]);

  const currentPagination = {
    currentPage: pagination[statusFilter]?.currentPage || 1,
    totalItems: filteredData.length,
  };

  const startIndex = (currentPagination.currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

  const handleStatusFilter = status => {
    setStatusFilter(status);
    setCurrentPage(1); // 필터 변경 시 첫 페이지로 이동
  };

  const handlePageChange = page => {
    setCurrentPage(page);
    getStatusList(businessId, page);
  };

  const handleEstimateClick = async serviceId => {
    navigate(`/expert/quote-management/estimate/${serviceId}`);
  };
  const handleReservationClick = serviceId => {
    setSeletedServiceId(serviceId);
    setIsReservationPop(true);
  };
  return (
    <ExpertListPageDiv>
      <h2 className="tit">견적관리</h2>
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
              <button type="submit">검색</button>
            </form>
          </div>
          <ul className="btn-area">
            <li>
              <button
                className={`completed0 ${statusFilter === "0" ? "active" : ""}`}
                onClick={() => handleStatusFilter("0")}
              >
                작성대기
              </button>
            </li>
            <li>
              <button
                className={`completed1 ${statusFilter === "2" ? "active" : ""}`}
                onClick={() => handleStatusFilter("2")}
              >
                견적완료
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
            <li className="th">견적금액</li>
            <li className="th">견적현황</li>
            <li className="th">견적서</li>
          </ul>

          {currentItems.map((reservation, index) => (
            <ul key={`${reservation.serviceId}-${index}`} className="tr">
              <li className="td">{reservation.startDate || "미정"}</li>
              <li className="td black">
                {reservation.createdAt.split(" ")[0]}
              </li>
              <li className="td">{reservation.detailTypeName}</li>
              <li className="td">{reservation.userName}</li>
              <li className="td">{reservation.price?.toLocaleString()} 원</li>
              <li className="td">
                <p
                  className={
                    reservation.completed === 0 ? "completed0" : "completed1"
                  }
                >
                  {getStatusText(reservation.completed)}
                </p>
              </li>
              <li className="td blue btn-area">
                <button
                  onClick={() => {
                    if (reservation.completed === 2) {
                      handleEstimateClick(reservation.serviceId);
                    } else {
                      handleReservationClick(reservation.serviceId);
                    }
                  }}
                >
                  견적서
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
