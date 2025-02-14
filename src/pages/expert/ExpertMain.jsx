import React, { useEffect } from "react";
import styled from "@emotion/styled";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./expertmain.css";
import { useRecoilState } from "recoil";
import { businessDetailState } from "../../atoms/businessAtom";
import { reserveList } from "../../atoms/reservationAtom";
import ExpertMainReserveList from "../../components/export-main-datas/ExpertMainReserveList";
import { loginApi } from "../../apis/login";

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
  const businessPage = async () => {
    try {
      const busiId = localStorage.getItem("businessId");
      const res = await loginApi.get(
        `/api/service?business_id=${busiId}&status=4&page=1&size=100`,
      );
      const response = await loginApi.get(
        `/api/business?business_id=${busiId}`,
      );
      // console.log("캘린더 데이터", res);
      // console.log("업체 데이터", response); // API 응답 확인
      const {
        logo,
        detailTypeId,
        detailTypeName,
        businessId,
        businessName,
        title,
        scoreAvg,
        price,
        like,
        address,
        serviceCount,
        openingTime,
        closingTime,
        years,
        contents,
        reviewCount,
        tel,
        tel2,
        tel3,
      } = response.data.resultData;
      let filteredData = []; // ✅ if 블록 바깥에서 선언 (초기값 빈 배열)
      console.log(res);
      if (res && res.data.resultData) {
        // ✅ 필요한 데이터만 추출 (userName, serviceId, startDate)
        filteredData = res.data.resultData.map(item => ({
          title: item.userName,
          servicId: item.serviceId,
          start: item.startDate,
          completed: item.completed,
        }));
      }
      // console.log(filteredData);
      setBusinessInfo({
        logo: logo,
        detailTypeId: detailTypeId,
        detailTypeName: detailTypeName,
        businessId: businessId,
        businessName: businessName,
        title: title,
        scoreAvg: scoreAvg,
        price: price,
        like: like,
        address: address,
        serviceCount: serviceCount,
        openingTime: openingTime,
        closingTime: closingTime,
        years: years,
        contents: contents,
        reviewCount: reviewCount,
        tel: tel,
        tel2: tel2,
        tel3: tel3,
      });
      setReserveInfo(filteredData);
      console.log(filteredData);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(businessInfo);
  useEffect(() => {
    businessPage();
  }, []);
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
