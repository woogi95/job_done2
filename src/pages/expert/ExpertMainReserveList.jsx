import { useEffect, useRef, useState } from "react";
import {
  EListContDiv,
  ExpertListPageDiv,
  ExportListDiv,
} from "./expertmainreservelist";
import ExpertReservation from "../../components/papers/ExpertReservation";
import { useRecoilValue } from "recoil";
import { statusAtom } from "../../atoms/statusAtom";
import { businessDetailState } from "../../atoms/businessAtom";
import { loginApi } from "../../apis/login";

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
        `/api/service?business_id=${businessId}&status=1&page=1&size=10`,
      );
      console.log("📡 API 응답 데이터:", res.data);
      setReservationData(res.data.resultData || []); // 🚀 안전한 초기화
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

  console.log("🔄 현재 reservationData:", reservationData);

  return (
    <ExpertListPageDiv>
      <EListContDiv>
        <ExportListDiv>
          <ul className="tr" style={{ width: "100%", marginBottom: "5px" }}>
            <li className="th">접수일</li>
            <li className="th">예약날짜</li>
            <li className="th">서비스 종류</li>
            <li className="th">예약자</li>
            <li className="th">예상금액</li>
            <li className="th">예약현황</li>
          </ul>

          <div ref={containerRef} className="w-full h-72 overflow-y-scroll">
            {reservationData.map((reservation, index) => {
              console.log(`✅ 화면에 표시될 데이터 ${index}:`, reservation);
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
                  <div className="w-full space-y-4">
                    <ul className="tr">
                      <li className="td">{reservation.startDate || "미정"}</li>
                      <li className="td black">
                        {reservation.createdAt?.split(" ")[0] || "미정"}
                      </li>
                      <li className="td">{reservation.detailTypeName}</li>
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
        />
      )}
    </ExpertListPageDiv>
  );
}

export default ExpertMainReserveList;
