import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { loginApi } from "../../../apis/login";
import { reserveList } from "../../../atoms/reservationAtom";
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
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [isModal, setIsModal] = useState(false);
  const [comId, setComId] = useState();
  const clickModal = info => {
    setComId(info.event._def.extendedProps.serviceId);
    if (info.event._def.extendedProps.completed === 6) {
      setIsModal(true);
      setModalPosition({
        top: info.jsEvent.clientY, // 마우스 아래 10px
        left: info.jsEvent.clientX - 150, // 마우스 오른쪽 10px
      });
    }
  };
  const changeComId = async () => {
    const businessId = Number(localStorage.getItem("businessId"));
    const formData = {
      businessId: businessId,
      completed: 7,
      serviceId: comId,
    };
    try {
      const res = await loginApi.patch("/api/service", formData);
      if (res) {
        setReserveInfo(prev =>
          prev.map(event =>
            event.serviceId === comId ? { ...event, completed: 7 } : event,
          ),
        );
        setIsModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
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
        eventClick={item => clickModal(item)}
      />
      {isModal && (
        <div
          className="modal"
          style={{
            top: `${modalPosition.top}px`,
            left: `${modalPosition.left}px`,
          }}
        >
          <div className="modal-content">
            <span></span>
            <button onClick={() => changeComId()}>완료</button>
            <button onClick={() => setIsModal(false)}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Index;
