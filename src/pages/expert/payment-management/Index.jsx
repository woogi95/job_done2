import { EFilterDiv } from "../../../components/expert-List/expertList";
import {
  EListContDiv,
  ExpertListPageDiv,
  ExportPaymentListDiv,
} from "../reservation-management/reservationMangement";
import { useRecoilValue } from "recoil";
import { businessDetailState } from "../../../atoms/businessAtom";
import { useEffect, useState, useMemo } from "react";
import { statusAtom } from "../../../atoms/statusAtom";
// import { useNavigate } from "react-router-dom";
import { loginApi } from "../../../apis/login";
import { Pagination } from "antd";
import PaymentHistory from "../../../components/papers/PaymentHistory";
import { useNavigate } from "react-router-dom";

function Index() {
  const [isPaymentHistoryOpen, setIsPaymentHistoryOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedSearchQuery, setAppliedSearchQuery] = useState("");
  const itemsPerPage = 10;
  const navigate = useNavigate();
  const businessId = localStorage.getItem("businessId");
  const status = useRecoilValue(statusAtom);
  const businessDetail = useRecoilValue(businessDetailState);
  const [reservationData, setReservationData] = useState([]);
  const [pagination, setPagination] = useState({
    all: { currentPage: 1, totalItems: 0 },
    2: { currentPage: 1, totalItems: 0 },
    6: { currentPage: 1, totalItems: 0 },
  });

  useEffect(() => {
    if (businessId) {
      fetchReservationData(businessId, status, currentPage);
    }
  }, [businessId, status, currentPage]);

  const fetchReservationData = async (businessId, statusFilter, page) => {
    try {
      const url = `/api/service?business_id=${businessId}&status=${2}&page=${page}&size=${itemsPerPage}`;
      const res = await loginApi.get(url);
      setReservationData(res.data.resultData);
      setPagination(prev => ({
        ...prev,
        [statusFilter]: {
          currentPage: page,
          totalItems: res.data.totalCount || 0,
        },
      }));
    } catch (error) {
      console.error("API 호출 에러:", error);
    }
  };

  useEffect(() => {}, [businessId]);

  const handleSearch = e => {
    e.preventDefault();
    setAppliedSearchQuery(searchQuery);
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleKeyPress = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch(e);
    }
  };

  const filteredData = useMemo(() => {
    let filtered = reservationData;

    if (statusFilter === "2") {
      filtered = filtered.filter(item => item.completed === 2);
    } else if (statusFilter === "6") {
      filtered = filtered.filter(item => item.completed === 6);
    }

    if (appliedSearchQuery) {
      filtered = filtered.filter(
        item =>
          item.userName.includes(appliedSearchQuery) ||
          item.address.includes(appliedSearchQuery) ||
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
    setCurrentPage(1);
  };

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (businessId) {
      fetchReservationData(businessId, statusFilter, currentPage);
    }
  }, [currentPage]);

  const handlePaymentHistoryClick = serviceId => {
    setSelectedServiceId(serviceId);
    setIsPaymentHistoryOpen(true);
    navigate(`/expert/company-management/paymenthistory/${serviceId}`);
  };

  const closePaymentHistory = () => {
    setIsPaymentHistoryOpen(false);
  };

  const getStatusText = completed => {
    switch (completed) {
      case 2:
        return "결제대기";
      case 6:
        return "결제완료";
      default:
        return "미정";
    }
  };

  return (
    <ExpertListPageDiv>
      <h2 className="tit">결제관리</h2>
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
                  placeholder="이름, 주소, 예약날짜로 검색"
                />
              </label>
              <button type="submit">검색</button>
            </form>
          </div>
          <ul className="btn-area">
            <li>
              <button
                className={`completed0 ${statusFilter === "2" ? "active" : ""}`}
                onClick={() => handleStatusFilter("2")}
              >
                결제대기
              </button>
            </li>
            <li>
              <button
                className={`completed5 ${statusFilter === "6" ? "active" : ""}`}
                onClick={() => handleStatusFilter("6")}
              >
                결제완료
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
        <ExportPaymentListDiv>
          <ul className="tr">
            <li className="th">예약날짜</li>
            <li className="th">주소</li>
            <li className="th">결제금액</li>
            <li className="th">예약자</li>
            <li className="th">결제상황</li>
            <li className="th">결제내역</li>
          </ul>
          {currentItems.map((reservation, index) => (
            <ul
              key={`${reservation.serviceId}-${reservation.createdAt}-${index}`}
              className="tr"
            >
              <li className="td">{reservation.startDate || "N/A"}</li>
              <li className="td">{reservation.address || "N/A"}</li>
              <li className="td black">
                {reservation.price?.toLocaleString()} 원
              </li>
              <li className="td">{reservation.userName}</li>
              <li className="td">
                <p
                  className={
                    reservation.completed === 6 ? "completed5" : "completed0"
                  }
                >
                  {getStatusText(reservation.completed)}
                </p>
              </li>
              <li className="td btn-area">
                {reservation.completed === 6 && (
                  <button
                    className="red"
                    onClick={() =>
                      handlePaymentHistoryClick(reservation.serviceId)
                    }
                  >
                    결제내역
                  </button>
                )}
              </li>
            </ul>
          ))}
        </ExportPaymentListDiv>
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
      {isPaymentHistoryOpen && (
        <PaymentHistory
          serviceId={selectedServiceId}
          onClose={closePaymentHistory}
        />
      )}
    </ExpertListPageDiv>
  );
}

export default Index;
