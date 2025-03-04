import { useEffect, useState } from "react";
import { EFilterDiv } from "../../../components/expert-List/expertList";
import ExportFilter from "../../../components/expert-List/ExportFilter";
import {
  EListContDiv,
  ExpertListPageDiv,
  ExportListDiv,
} from "./reservationMangement";
import ExpertReservation from "../../../components/papers/ExpertReservation";
import { useRecoilValue } from "recoil";
import { statusAtom } from "../../../atoms/statusAtom";
import axios from "axios";
import { businessDetailState } from "../../../atoms/businessAtom";
import { loginApi } from "../../../apis/login";
import { Pagination } from "antd";

function Index() {
  const [isReservationPop, setIsReservationPop] = useState(false);
  const [seletedServiceId, setSeletedServiceId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all"); // 상태 필터
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const [appliedSearchTerm, setAppliedSearchTerm] = useState(""); // 적용된 검색어 상태
  const itemsPerPage = 5;

  const businessId = localStorage.getItem("businessId");
  const status = useRecoilValue(statusAtom);
  const businessDetail = useRecoilValue(businessDetailState);
  const [reservationData, setReservationData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  const getStatusList = async (businessId, status) => {
    console.log("businessId, status", businessId, status);
    try {
      const res = await loginApi.get(
        `/api/service?business_id=${businessId}&status=${status}&page=${currentPage}&size=${itemsPerPage}`,
      );
      console.log("API Response:", res.data); // 응답 구조 확인
      setReservationData(res.data.resultData); // 데이터는 그대로 설정
      setTotalItems(res.data.resultData.length); // resultData의 길이를 총 데이터 개수로 설정
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewDetail = serviceId => {
    setIsReservationPop(true);
    setSeletedServiceId(serviceId);
    console.log(seletedServiceId);
  };

  useEffect(() => {
    if (businessId) {
      getStatusList(businessId, status);
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

  // 필터링 로직
  const filteredData = reservationData.filter(item => {
    // 상태 필터링
    const statusMatch =
      statusFilter === "all" || item.completed === Number(statusFilter);

    // 검색어 필터링
    const searchMatch =
      appliedSearchTerm === "" ||
      item.userName.toLowerCase().includes(appliedSearchTerm.toLowerCase()) ||
      item.businessName
        .toLowerCase()
        .includes(appliedSearchTerm.toLowerCase()) ||
      item.detailTypeName
        .toLowerCase()
        .includes(appliedSearchTerm.toLowerCase()) ||
      item.createdAt.includes(appliedSearchTerm) || // 접수일 검색
      item.startDate.includes(appliedSearchTerm); // 예약날짜 검색

    return statusMatch && searchMatch;
  });

  // 디버깅용 로그
  console.log("현재 필터:", statusFilter);
  console.log("검색어:", searchTerm);
  console.log("적용된 검색어:", appliedSearchTerm);
  console.log("필터링된 데이터:", filteredData);

  // 현재 페이지의 데이터
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

  // 상태 필터 변경 핸들러
  const handleStatusFilter = status => {
    console.log("필터 변경:", status);
    setStatusFilter(status);
    setCurrentPage(1); // 필터 변경 시 첫 페이지로 이동
  };

  // 검색어 변경 핸들러
  const handleSearch = e => {
    e.preventDefault(); // 폼 제출 방지
    setAppliedSearchTerm(searchTerm); // 검색어 적용
    setCurrentPage(1); // 검색어 변경 시 첫 페이지로 이동
  };

  // 신청서 확인 버튼 클릭 핸들러
  const handleReservationClick = serviceId => {
    setSeletedServiceId(serviceId); // 선택된 서비스 아이디 설정
    setIsReservationPop(true); // 신청서 팝업 열기
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
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  placeholder="이름, 업체명, 서비스명, 접수일, 예약날짜로 검색"
                />
              </label>
              <button type="submit">검색</button>
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

          {currentItems.map(reservation => (
            <ul key={reservation.serviceId} className="tr">
              <li className="td">{reservation.startDate || "미정"}</li>
              <li className="td black">
                {reservation.createdAt.split(" ")[0]}
              </li>
              <li className="td">{reservation.detailTypeName}</li>
              <li className="td">{reservation.userName}</li>
              <li className="td">{reservation.price}</li>
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
          total={filteredData.length}
          pageSize={itemsPerPage}
          current={currentPage}
          onChange={setCurrentPage}
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
