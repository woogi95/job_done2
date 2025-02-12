import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import React from "react";
import { reserveList } from "../../../atoms/reservationAtom";
import { useRecoilState } from "recoil";

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
          if (info.event.end) {
            info.el.style.borderRadius = "5px";
          }
        }}
      />
    </div>
  );
}

export default Index;
