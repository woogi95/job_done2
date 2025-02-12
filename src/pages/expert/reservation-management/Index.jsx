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

function Index() {
  const [isReservationPop, setIsReservationPop] = useState(false);
  const [seletedServiceId, setSeletedServiceId] = useState(null);

  const businessId = localStorage.getItem("businessId");
  const status = useRecoilValue(statusAtom);
  const businessDetail = useRecoilValue(businessDetailState);
  const [reservationData, setReservationData] = useState([]);

  const getStatusList = async (businessId, status) => {
    console.log("businessId, status", businessId, status);
    try {
      // console.log("이것무엇", businessId, status);
      const res = await loginApi.get(
        // `/api/service?business_id=${businessId}&status=${status}&page=${1}&size=${10}`,
        `/api/service?business_id=${businessId}&status=${status}&page=${1}&size=${10}`,
      );
      console.log(res.data);
      setReservationData(res.data.resultData);
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
  }, [businessId, status]);

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

  return (
    <ExpertListPageDiv>
      <h2 className="tit">예약리스트</h2>
      <EListContDiv>
        <EFilterDiv>
          <ul className="btn-area">
            <li>
              <button className="completed3">취소</button>
            </li>
            <li>
              <button className="completed0">대기</button>
            </li>
            <li>
              <button className="completed1">완료</button>
            </li>
            <li>
              <button className="completed5">거절</button>
            </li>
          </ul>
          <div className="search-bar">
            <label htmlFor="">
              <input type="text" />
            </label>
            <button>검색</button>
          </div>
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

          {reservationData.map(reservation => (
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
                    handleViewDetail(reservation.serviceId);
                  }}
                >
                  신청서
                </button>
              </li>
            </ul>
          ))}
        </ExportListDiv>
      </EListContDiv>
      {isReservationPop && (
        <ExpertReservation
          isReservationPop={isReservationPop}
          setIsReservationPop={setIsReservationPop}
        />
      )}
    </ExpertListPageDiv>
  );
}

export default Index;
