import { EFilterDiv } from "../../../components/expert-List/expertList";
import {
  EListContDiv,
  ExpertListPageDiv,
  ExportPaymentListDiv,
} from "../reservation-management/reservationMangement";
import { useRecoilValue } from "recoil";
import { businessDetailState } from "../../../atoms/businessAtom";
import { useEffect, useState } from "react";
import { statusAtom } from "../../../atoms/statusAtom";
// import { useNavigate } from "react-router-dom";
import { loginApi } from "../../../apis/login";
import { Pagination } from "antd";
import PaymentHistory from "../../../components/papers/PaymentHistory";

function Index() {
  const businessId = localStorage.getItem("businessId");
  // const navigate = useNavigate();
  const status = useRecoilValue(statusAtom);
  const businessDetail = useRecoilValue(businessDetailState);
  const [reservationData, setReservationData] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [appliedSearchTerm, setAppliedSearchTerm] = useState("");
  const [isPaymentHistoryOpen, setIsPaymentHistoryOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  const getStatusList = async (businessId, status) => {
    console.log("businessId, status", businessId, status);
    try {
      const res = await loginApi.get(
        `/api/service?business_id=${businessId}&status=${status}&page=${currentPage}&size=${itemsPerPage}`,
      );

      console.log("0000", res.data);
      setReservationData(res.data.resultData);
      setTotalItems(res.data.totalCount);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (businessDetail) {
      getStatusList(businessId, status);
    }
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    console.log("businessDetail", businessDetail);
    console.log("businessId", businessId);
  }, [businessId]);

  const handleSearch = e => {
    e.preventDefault();
    setAppliedSearchTerm(searchTerm);
    setCurrentPage(1);
  };

  const handleStatusFilter = filter => {
    setStatusFilter(filter);
    setCurrentPage(1);
  };

  const handlePaymentHistoryClick = serviceId => {
    setSelectedServiceId(serviceId);
    setIsPaymentHistoryOpen(true);
  };

  const closePaymentHistory = () => {
    setIsPaymentHistoryOpen(false);
  };

  const filteredData = reservationData.filter(item => {
    const statusMatch =
      statusFilter === "all" ||
      (statusFilter === "2" && item.completed === 2) || // 결제대기
      (statusFilter === "6" && item.completed === 6); // 결제완료

    const searchMatch =
      appliedSearchTerm === "" ||
      item.userName.toLowerCase().includes(appliedSearchTerm.toLowerCase()) ||
      item.address.toLowerCase().includes(appliedSearchTerm.toLowerCase()) ||
      item.startDate.includes(appliedSearchTerm);

    return statusMatch && searchMatch;
  });

  const currentItems = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

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
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  placeholder="이름, 주소, 예약날짜로 검색"
                />
              </label>
              <button type="submit">검색</button>
            </form>
          </div>
          <ul className="btn-area">
            <li>
              <button
                className={`completed3 ${statusFilter === "2" ? "active" : ""}`}
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
          {currentItems.map(reservation => (
            <ul className="tr" key={reservation.serviceId}>
              <li className="td">{reservation.startDate || "N/A"}</li>
              <li className="td">{reservation.address || "N/A"}</li>
              <li className="td black">{reservation.price}</li>
              <li className="td">{reservation.userName}</li>
              <li className="td">
                <p
                  className={
                    reservation.completed === 6 ? "completed5" : "completed3"
                  }
                >
                  {reservation.completed === 6 ? "결제완료" : "결제대기"}
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
          total={filteredData.length}
          pageSize={itemsPerPage}
          current={currentPage}
          onChange={setCurrentPage}
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
