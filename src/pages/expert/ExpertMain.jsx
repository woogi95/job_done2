import React, { useEffect } from "react";
import styled from "@emotion/styled";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./expertmain.css";
import { useRecoilState } from "recoil";
import { businessDetailState } from "../../atoms/businessAtom";
import { reserveCountAtom, reserveList } from "../../atoms/reservationAtom";
import ExpertMainReserveList from "../../components/export-main-datas/ExpertMainReserveList";
import { loginApi } from "../../apis/login";
import Index from "./statistics/Index";
import ReserveUserCount from "../../components/export-statistics/ReserveUserCount";
import TotalPriceMonth from "../../components/export-statistics/TotalPriceMonth";
const BigBox = styled.div`
  height: 100%;
  width: 489px;
  border: 2px solid #d6d6d6;
  border-radius: 5px;
  background-color: white;
  font-family: "Pretendard-Regular", "Spoqa Han Sans Neo", "Roboto", sans-serif;
`;
function ExpertMain() {
  const [reserveInfo, setReserveInfo] = useRecoilState(reserveList);
  const [businessInfo, setBusinessInfo] = useRecoilState(businessDetailState);
  const [reserveCount, setReserveCount] = useRecoilState(reserveCountAtom);
  console.log(reserveInfo);
  // 신청 0.1.2
  const applyData = reserveCount.filter(item =>
    [0, 1, 2].includes(item.completed),
  ).length;
  // 취소 3.4.5
  const cancelData = reserveCount.filter(item =>
    [3, 4, 5].includes(item.completed),
  ).length;
  // 예약완료 6
  const reserveData = reserveCount.filter(item => item.completed === 6).length;
  // 작업완료 7
  const workData = reserveCount.filter(item => item.completed === 7).length;
  // 이용자수
  // 작성된 리뷰 수 8
  const countReview = reserveCount.filter(item => item.completed === 8).length;

  return (
    <div style={{ backgroundColor: "white", padding: 15 }}>
      {/* 상단 예약 건수 등 3 칸 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 15,
        }}
      >
        <div
          style={{
            border: "1px solid #D6D6D6",
            borderRadius: 5,
            width: 310,
            height: 100,
            backgroundColor: "white",
            alignItems: "center",
            marginRight: "5px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              height: 50,
              alignItems: "center",
              padding: 10,
            }}
          >
            <span>신규 예약</span>
            <span>{applyData}건</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              height: 50,
              alignItems: "center",
              padding: 10,
            }}
          >
            <span>예약 취소</span>
            <span>{cancelData}건</span>
          </div>
        </div>
        <div
          style={{
            border: "2px solid #D6D6D6",
            borderRadius: 5,
            width: 310,
            height: 100,
            backgroundColor: "white",
            marginRight: "5px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              height: 50,
              alignItems: "center",
              padding: 10,
            }}
          >
            <span>예약 완료</span>
            <span>{reserveData}건</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              height: 50,
              alignItems: "center",
              padding: 10,
            }}
          >
            <span>작업 완료</span>
            <span>{workData}건</span>
          </div>
        </div>
        <div
          style={{
            border: "2px solid #D6D6D6",
            borderRadius: 5,
            width: 310,
            height: 100,
            backgroundColor: "white",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              height: 50,
              alignItems: "center",
              padding: 10,
            }}
          >
            <span>이용자 수</span>
            <span>{Object.keys(reserveInfo || {}).length}건</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              height: 50,
              alignItems: "center",
              padding: 10,
            }}
          >
            <span>작성된 리뷰</span>
            <span>0건</span>
          </div>
        </div>
      </div>
      {/* 예약 현황, 미니 켈린더 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          height: 360,
          marginBottom: 15,
        }}
      >
        {/*  예약 현황 */}
        <BigBox>
          <ExpertMainReserveList />
        </BigBox>
        {/* 미니 켈린더 */}
        <BigBox>
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "prev,next",
              center: "title",
              right: "today",
            }}
            nowIndicator={true}
            events={reserveInfo}
            locale="ko"
            height="100%"
            aspectRatio={1.8}
            eventDidMount={info => {
              if (info.event.end) {
                info.el.style.borderRadius = "5px";
              }
            }}
          />
        </BigBox>
      </div>
      {/* 최근결제, 알림 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          height: 360,
        }}
      >
        <BigBox>
          <TotalPriceMonth />
        </BigBox>
        <BigBox>
          <ReserveUserCount />
        </BigBox>
      </div>
    </div>
  );
}

export default ExpertMain;
