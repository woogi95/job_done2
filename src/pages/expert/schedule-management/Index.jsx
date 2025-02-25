import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import React from "react";
import { reserveList } from "../../../atoms/reservationAtom";
import { useRecoilState } from "recoil";
import "./index.css";
document.addEventListener("DOMContentLoaded", function () {
  const calendarEl = document.getElementById("calendar");
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
  });
  calendar.render();

  // 이전 달 버튼 기능
  document
    .getElementById("my-prev-button")
    .addEventListener("click", function () {
      calendar.prev(); // 이전 달로 이동
    });
});
function Index() {
  const [reserveInfo, setReserveInfo] = useRecoilState(reserveList);

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h2>예약 일정</h2>
      </div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: `prev next today`,
          center: "title",
          right: "dayGridMonth,dayGridWeek,dayGridDay",
        }}
        nowIndicator={true}
        events={reserveInfo}
        locale="ko"
        height="100%"
        aspectRatio={1.8}
        eventDidMount={info => {
          if ([7, 8, 9].includes(info.event.extendedProps.completed)) {
            info.el
              .querySelector(".fc-event-main")
              .style.setProperty("background-color", "black", "important");
          }
        }}
      />
    </div>
  );
}

export default Index;
