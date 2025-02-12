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

function Index() {
  const businessId = localStorage.getItem("businessId");
  // const navigate = useNavigate();
  const status = useRecoilValue(statusAtom);
  const businessDetail = useRecoilValue(businessDetailState);
  const [reservationData, setReservationData] = useState([]);

  const getStatusList = async (businessId, status) => {
    console.log("businessId, status", businessId, status);
    try {
      const res = await loginApi.get(
        `/api/service?business_id=${businessId}&status=${status}&page=${1}&size=${10}`,
      );

      console.log("0000", res.data);
      setReservationData(res.data.resultData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (businessDetail) {
      getStatusList(businessId, status);
    }
  }, []);
  useEffect(() => {
    console.log("businessDetail", businessDetail);
    console.log("businessId", businessId);
  }, [businessId]);
  return (
    <ExpertListPageDiv>
      <h2 className="tit">결제관리</h2>
      <EListContDiv>
        <EFilterDiv>
          <ul className="btn-area">
            <li>
              <button className="completed3">결제대기</button>
            </li>

            <li>
              <button className="completed5">결제완료</button>
            </li>
          </ul>
          <div className="search-bar">
            <label htmlFor="">
              <input type="text" />
            </label>
            <button>검색</button>
          </div>
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

          {reservationData.map(reservation => (
            <ul className="tr" key={reservation.serviceId}>
              <li className="td">{reservation.startDate || "N/A"}</li>
              <li className="td">{reservation.address || "N/A"}</li>
              <li className="td black">{reservation.price}</li>
              <li className="td">{reservation.userName}</li>

              <li className="td">
                <p
                  className={
                    reservation.paymentStatus === "5"
                      ? "completed5"
                      : "completed3"
                  }
                >
                  {reservation.paymentStatus === "5" ? "결제완료" : "결제대기"}
                </p>
              </li>
              <li className="td btn-area">
                {reservation.paymentStatus === "5" && (
                  <button className="red">결제내역</button>
                )}
              </li>
            </ul>
          ))}
        </ExportPaymentListDiv>
      </EListContDiv>
    </ExpertListPageDiv>
  );
}

export default Index;
