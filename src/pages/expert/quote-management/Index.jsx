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

function Index() {
  const businessId = localStorage.getItem("businessId");
  const navigate = useNavigate();
  const status = useRecoilValue(statusAtom);

  const [reservationData, setReservationData] = useState([]);

  const getStatusList = async (businessId, status) => {
    console.log("businessId, status", businessId, status);
    try {
      const res = await loginApi.get(
        `/api/service?business_id=${businessId}&status=${status}&page=${1}&size=${10}`,
      );
      console.log("!@#!#!#!$!$@#$!%!", res.data);
      setReservationData(res.data.resultData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (businessId) {
      getStatusList(businessId, status);
    }
  }, []);
  return (
    <ExpertListPageDiv>
      <h2 className="tit">견적관리</h2>
      <EListContDiv>
        <EFilterDiv>
          <ul className="btn-area">
            <li>
              <button className="completed3">작성대기</button>
            </li>

            <li>
              <button className="completed1">견적완료</button>
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
            <li className="th">견적금액</li>
            <li className="th">견적현황</li>
            <li className="th">견적서</li>
          </ul>

          {reservationData.map(reservation => (
            <ul className="tr" key={reservation.serviceId}>
              <li className="td">{reservation.createdAt.split(" ")[0]}</li>
              <li className="td black">{reservation.startDate || "미정"}</li>
              <li className="td">{reservation.detailTypeName}</li>
              <li className="td">{reservation.userName}</li>
              <li className="td">{reservation.price}</li>
              <li className="td">
                <p
                  className={
                    reservation.completed === 1 ? "completed1" : "completed3"
                  }
                >
                  {reservation.completed === 1 ? "견적완료" : "작성대기"}
                </p>
              </li>
              <li className="td btn-area">
                <button
                  className="blue"
                  onClick={() => {
                    navigate("/expert/quote-management/quotation-form");
                  }}
                >
                  작성하기
                </button>
                <button
                  className="green"
                  onClick={() => {
                    navigate("/expert/quote-management/edit-quotation");
                  }}
                >
                  수정하기
                </button>
              </li>
            </ul>
          ))}
        </ExportListDiv>
      </EListContDiv>
    </ExpertListPageDiv>
  );
}

export default Index;
