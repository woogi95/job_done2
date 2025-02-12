import React, { useEffect } from "react";
import styled from "@emotion/styled";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./expertmain.css";
import { useRecoilState } from "recoil";
import { businessDetailState } from "../../atoms/businessAtom";
import { reserveList } from "../../atoms/reservationAtom";
import ExpertMainReserveList from "./ExpertMainReserveList.jsx";

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
            <span>작업 현황</span>
            <span>{businessInfo.setReserveInfo}건</span>
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
            <span>신규 예약</span>
            <span>0건</span>
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
        ></div>
        <div
          style={{
            border: "2px solid #D6D6D6",
            borderRadius: 5,
            width: 310,
            height: 100,
            backgroundColor: "white",
          }}
        ></div>
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
        <BigBox></BigBox>
        <BigBox></BigBox>
      </div>
    </div>
  );
}

export default ExpertMain;
