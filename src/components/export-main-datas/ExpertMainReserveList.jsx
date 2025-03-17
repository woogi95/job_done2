import { useEffect, useRef, useState } from "react";
import {
  EListContDiv,
  ExpertListPageDiv,
  ExportListDiv,
} from "./expertmainreservelistcss";
import ExpertReservation from "../papers/ExpertReservation";
import { useRecoilValue } from "recoil";
import { statusAtom } from "../../atoms/statusAtom";
import { businessDetailState } from "../../atoms/businessAtom";
import { loginApi } from "../../apis/login";
import { se } from "date-fns/locale";

function ExpertMainReserveList() {
  const [isReservationPop, setIsReservationPop] = useState(false);
  const [seletedServiceId, setSeletedServiceId] = useState(null);
  const [reservationData, setReservationData] = useState([]);

  const businessId = localStorage.getItem("businessId");
  const status = useRecoilValue(statusAtom);
  const businessDetail = useRecoilValue(businessDetailState);

  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    let scrollAmount = 0;
    const scrollSpeed = 1; // 스크롤 속도 조절

    const scroll = () => {
      if (containerRef.current && contentRef.current) {
        scrollAmount += scrollSpeed;
        containerRef.current.scrollTop = scrollAmount;

        if (
          scrollAmount >=
          contentRef.current.offsetHeight - containerRef.current.offsetHeight
        ) {
          scrollAmount = 0; // 최상단으로 리셋
        }

        requestAnimationFrame(scroll);
      }
    };

    scroll();
  }, []);

  const getStatusList = async businessId => {
    try {
      const res = await loginApi.get(
        `/api/service?business_id=${businessId}&status=0&page=1&size=10`,
      );
      // console.log("📡 API 응답 데이터:", res.data);
      setReservationData(res.data.resultData || []); // 🚀 안전한 초기화

      console.log(reservationData);
    } catch (error) {
      console.error("🚨 API 호출 오류:", error);
    }
  };

  const handleViewDetail = serviceId => {
    setIsReservationPop(true);
    setSeletedServiceId(serviceId);
  };

  useEffect(() => {
    if (businessId) {
      getStatusList(businessId);
    }
  }, [businessId]);

  const getStatusText = completed => {
    switch (completed) {
      case 0:
        return "대기";
      case 1:
        return "완료";
      case 3:
        return "취소";
      case 5:
        return "거절";
      default:
        return "미정";
    }
  };

  // console.log("🔄 현재 reservationData:", reservationData);

  return (
    <ExpertListPageDiv>
      <EListContDiv>
        <ExportListDiv>
          <ul
            className="tr top-tr"
            style={{ marginBottom: "5px", backgroundColor: "#e9f4ff" }}
          >
            <li className="th">접수일</li>
            <li className="th">예약날짜</li>
            {/* <li className="th">서비스 종류</li> */}
            <li className="th">예약자</li>
            <li className="th">예상금액</li>
            <li className="th">예약현황</li>
          </ul>

          <div className="list" ref={containerRef}>
            {reservationData
              .filter(reservation => [0, 1].includes(reservation.completed))
              .map(reservation => {
                return (
                  <button
                    key={reservation.serviceId}
                    style={{
                      display: "block",
                      width: "100%",
                      marginBottom: "5px",
                    }}
                    onClick={() => handleViewDetail(reservation.serviceId)}
                  >
                    <div>
                      <ul className="tr">
                        <li className="td">
                          {reservation.startDate || "미정"}
                        </li>
                        <li className="td black">
                          {reservation.createdAt?.split(" ")[0] || "미정"}
                        </li>
                        {/* <li className="td">{reservation.detailTypeName}</li> */}
                        <li className="td">{reservation.userName}</li>
                        <li className="td">{reservation.price}</li>
                        <li className="td">
                          <p className={`completed${reservation.completed}`}>
                            {getStatusText(reservation.completed)}
                          </p>
                        </li>
                      </ul>
                    </div>
                  </button>
                );
              })}
          </div>
        </ExportListDiv>
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

export default ExpertMainReserveList;
