import { useNavigate } from "react-router-dom";
import { EFilterDiv } from "../../../components/expert-List/expertList";
import {
  EListContDiv,
  ExpertListPageDiv,
  ExportListDiv,
} from "../reservation-management/reservationMangement";
import { useRecoilValue } from "recoil";
// import { businessDetailState } from "../../../atoms/businessAtom";
import { useEffect, useState } from "react";
import { statusAtom } from "../../../atoms/statusAtom";
import { loginApi } from "../../../apis/login";
import { useCookies } from "react-cookie";
import { Pagination } from "antd";
function Index() {
  const businessId = localStorage.getItem("businessId");
  const navigate = useNavigate();
  const status = useRecoilValue(statusAtom);
  const [cookies, setCookie] = useCookies(["serviceId"]);
  const [reservationData, setReservationData] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [appliedSearchTerm, setAppliedSearchTerm] = useState("");
  const getStatusList = async (businessId, status) => {
    try {
      const res = await loginApi.get(
        `/api/service?business_id=${businessId}&status=${status}&page=${currentPage}&size=${itemsPerPage}`,
      );
      setReservationData(res.data.resultData);
      setTotalItems(res.data.totalCount);
      console.log("API 응답 데이터 (reservationData):", res.data.resultData);
    } catch (error) {
      console.log("API 호출 에러:", error);
    }
  };
  useEffect(() => {
    if (businessId) {
      getStatusList(businessId, status);
    }
  }, []);
  const handleSearch = e => {
    e.preventDefault();
    setAppliedSearchTerm(searchTerm);
    setCurrentPage(1);
    console.log("검색어 적용:", searchTerm);
  };
  const handleStatusFilter = filter => {
    setStatusFilter(filter);
    setCurrentPage(1);
  };
  const filteredData = reservationData.filter(item => {
    const statusMatch =
      statusFilter === "all" ||
      (statusFilter === "0" && item.completed === 0) || // 작성대기 (completed: 2)
      (statusFilter === "2" && item.completed === 2); // 견적완료 (completed: 6)
    const searchMatch =
      appliedSearchTerm === "" ||
      item.userName.toLowerCase().includes(appliedSearchTerm.toLowerCase()) ||
      item.detailTypeName
        .toLowerCase()
        .includes(appliedSearchTerm.toLowerCase()) ||
      item.createdAt.includes(appliedSearchTerm) ||
      item.startDate.includes(appliedSearchTerm);
    return statusMatch && searchMatch;
  });
  console.log("필터링된 데이터 (filteredData):", filteredData);
  console.log("현재 필터 상태 (statusFilter):", statusFilter);
  console.log("적용된 검색어 (appliedSearchTerm):", appliedSearchTerm);
  const currentItems = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const stateChange = async serviceId => {
    try {
      const res = await loginApi.patch("/api/service", {
        completed: 1,
        serviceId: serviceId,
        businessId: businessId,
      });
      console.log("상태 변경 성공:", res.data);
    } catch (error) {
      console.log("API 에러:", error);
    }
  };

  const getStatusText = completed => {
    switch (completed) {
      case 0:
        return "작성대기";
      case 2:
        return "견적완료";
      default:
        return "미정";
    }
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
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  placeholder="이름, 서비스명, 접수일, 예약날짜로 검색"
                />
              </label>
              <button type="submit">검색</button>
            </form>
          </div>
          <ul className="btn-area">
            <li>
              <button
                className={`completed3 ${statusFilter === "0" ? "active" : ""}`}
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
          {currentItems.map(reservation => (
            <ul className="tr" key={reservation.serviceId}>
              <li className="td">{reservation.createdAt.split(" ")[0]}</li>
              <li className="td black">{reservation.startDate || "미정"}</li>
              <li className="td">{reservation.detailTypeName}</li>
              <li className="td">{reservation.userName}</li>
              <li className="td">{reservation.totalPrice}</li>
              <li className="td">
                <p
                  className={
                    reservation.completed === 0 ? "completed3" : "completed1"
                  }
                >
                  {getStatusText(reservation.completed)}
                </p>
              </li>
              <li className="td btn-area">
                <button
                  className="blue"
                  onClick={() => {
                    setCookie("serviceId", reservation.serviceId, {
                      path: "/",
                    });
                    if (reservation.completed === 2) {
                      stateChange(reservation.serviceId);
                    }
                    navigate("/expert/quote-management/quotation-form");
                  }}
                >
                  수정하기
                </button>
              </li>
            </ul>
          ))}
        </ExportListDiv>
        <Pagination
          total={totalItems}
          pageSize={itemsPerPage}
          current={currentPage}
          onChange={setCurrentPage}
        />
      </EListContDiv>
    </ExpertListPageDiv>
  );
}
export default Index;
