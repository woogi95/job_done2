import { EFilterDiv } from "../../../components/expert-List/expertList";
import {
  EListContDiv,
  ExpertListPageDiv,
  ExportListDiv,
} from "../reservation-management/reservationMangement";
import { useRecoilValue } from "recoil";
import { useEffect, useState, useMemo } from "react";
import { statusAtom } from "../../../atoms/statusAtom";
import { loginApi } from "../../../apis/login";
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

  }, []);

  const handleSearch = e => {
    e.preventDefault();
    setAppliedSearchQuery(searchQuery);
    setCurrentPage(1); // 검색 시 페이지를 1로 초기화
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
    setCurrentPage(page); // 페이지 변경 시 currentPage 업데이트
    getStatusList(businessId, page); // 해당 페이지의 데이터를 가져옴
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
              <li className="td">{reservation.price}</li>
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

                    setCookie("serviceId", reservation.serviceId, {
                      path: "/",
                    });
                    if (reservation.completed === 2) {
                      stateChange(reservation.serviceId);
                    }
                    navigate("/expert/quote-management/quotation-form");

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
