import React from "react";
import styled from "@emotion/styled";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./expertmain.css";
import { useRecoilState } from "recoil";
import { businessDetailState } from "../../atoms/businessAtom";
import { reserveCountAtom, reserveList } from "../../atoms/reservationAtom";
import ExpertMainReserveList from "../../components/export-main-datas/ExpertMainReserveList";

import ReserveUserCount from "../../components/export-statistics/ReserveUserCount";
import TotalPriceMonth from "../../components/export-statistics/TotalPriceMonth";

import { ExportMainDiv } from "./expert";
// const BigBox = styled.div`
//   height: 100%;
//   width: 489px;
//   border: 2px solid #d6d6d6;
//   border-radius: 5px;
//   background-color: white;
//   font-family: "Pretendard-Regular", "Spoqa Han Sans Neo", "Roboto", sans-serif;
// `;
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
    <ExportMainDiv>
      {/* 상단 예약 건수 등 3 칸 */}
      <div className="summation">
        <div className="box new-reserve-box">
          <div>
            <p>신규 예약</p>
            <span>{applyData}건</span>
          </div>
          <div>
            <p>예약 취소</p>
            <span>{cancelData}건</span>
          </div>
        </div>
        <div className="box reserve-box">
          <div>
            <p>예약 완료</p>
            <span>{reserveData}건</span>
          </div>
          <div>
            <p>작업 완료</p>
            <span>{workData}건</span>
          </div>
        </div>
        <div className="box review-box">
          <div>
            <p>이용자 수</p>
            <span>{Object.keys(reserveInfo || {}).length}건</span>
          </div>
          <div>
            <p>작성된 리뷰</p>
            <span>0건</span>
          </div>
        </div>
      </div>
      {/* 예약 현황, 미니 켈린더 */}
      <div className="statistics">
        <div className="col2-box">
          {/*  예약 현황 */}
          <div className="col4-box">
            <h4>예약현황</h4>
            <ExpertMainReserveList />
          </div>
          {/* 미니 켈린더 */}
          <div className="col4-box">
            <h4>일정관리</h4>
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
          </div>
        </div>
        {/* 최근결제, 알림 */}
        <div className="col2-box">
          <div className="col4-box">
            <h4>매출현황</h4>
            <TotalPriceMonth />
          </div>
          <div className="col4-box">
            <h4>예약자수 현황</h4>
            <ReserveUserCount />
          </div>
        </div>
      </div>
    </ExportMainDiv>
  );
}

export default ExpertMain;
