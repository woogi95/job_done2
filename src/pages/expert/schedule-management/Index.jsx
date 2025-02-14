import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import React from "react";
import { reserveList } from "../../../atoms/reservationAtom";
import { useRecoilState } from "recoil";
import "./index.css";

function Index() {
  const [reserveInfo, setReserveInfo] = useRecoilState(reserveList);
  return (
    <div>
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
          if ([7, 8, 9].includes(info.event.extendedProps.completed)) {
            info.el
              .querySelector(".fc-event-main")
              .style.setProperty("background-color", "green", "important");
          }
        }}
      />
    </div>
  );
}

export default Index;
