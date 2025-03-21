import React, { useEffect, useState } from "react";
import { loginApi } from "../../apis/login";
// 캘린더
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
//  상태관리
import { useRecoilState } from "recoil";
import { businessDetailState } from "../../atoms/businessAtom";
import { reserveCountAtom, reserveList } from "../../atoms/reservationAtom";
import ExpertMainReserveList from "../../components/export-main-datas/ExpertMainReserveList";
// comp
import ReserveUserCount from "../../components/export-statistics/ReserveUserCount";
//  styled
import { ExportMainDiv } from "./expert";
// nivo
import { ResponsiveLine } from "@nivo/line";
import { ResponsiveBar } from "@nivo/bar";

function ExpertMain() {
  const [reserveInfo, setReserveInfo] = useRecoilState(reserveList);
  const [businessInfo, setBusinessInfo] = useRecoilState(businessDetailState);
  const [reserveCount, setReserveCount] = useRecoilState(reserveCountAtom);
  const busiId = localStorage.getItem("businessId");
  const [priceData, setPriceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);

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

  useEffect(() => {
    const getAllPrice = async () => {
      if (!busiId) return;
      try {
        const res = await loginApi.get(
          `/api/business/revenue?businessId=${busiId}`,
        );
        const sortedData = Array.isArray(res.data.resultData)
          ? res.data.resultData.sort((a, b) =>
              a.year === b.year ? a.month - b.month : a.year - b.year,
            )
          : [];
        setPriceData(sortedData);
      } catch (error) {
        console.error("Error fetching price data:", error);
        setPriceData([]);
      } finally {
        setLoading(false);
      }
    };

    getAllPrice();

    // 예약자수
    const getAllPrice2 = async () => {
      if (!busiId) return;
      try {
        const res = await loginApi.get(
          `/api/business/serviceCount?businessId=${busiId}`,
        );
        const sortedData = Array.isArray(res.data.resultData)
          ? res.data.resultData.sort((a, b) =>
              a.year === b.year ? a.month - b.month : a.year - b.year,
            )
          : [];
        setUserData(sortedData);
      } catch (error) {
        console.error("Error fetching price data:", error);
        setUserData([]);
      } finally {
        setLoading(false);
      }
    };

    getAllPrice2();
  }, [busiId]);

  if (loading) {
    return (
      <div className="loadingContainer">
        <div className="spinner" />
        <p>차트를 불러오는 중...</p>
      </div>
    );
  }

  const formattedData =
    priceData.length > 0
      ? [
          {
            id: priceData[0]?.businessName ?? "Unknown Business",
            data: priceData
              .filter(({ year, month }) => year > 0 && month > 0)
              .map(({ month, totalPrice }) => ({
                x: `${String(month).padStart(2, "0")}월`,
                y: totalPrice ?? 0,
                formattedY: new Intl.NumberFormat().format(totalPrice ?? 0),
              })),
          },
        ]
      : [];

  // -----end 매출현황------//

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "500px",
          fontSize: "18px",
          fontWeight: "bold",
          color: "#555",
        }}
      >
        <div className="spinner" />
        <p>차트를 불러오는 중...</p>
        <style>
          {`
            .spinner {
              width: 40px;
              height: 40px;
              border: 4px solid rgba(0, 0, 0, 0.1);
              border-top-color: #3498db;
              border-radius: 50%;
              animation: spin 1s linear infinite;
            }
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

  const visitedFormattedData = userData.map(({ month, serviceCount }) => ({
    date: `${String(month).padStart(2, "0")}월`,
    count: serviceCount ?? 0,
  }));

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
            <span>{countReview}건</span>
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
          <div className="col4-box calendar-box">
            <h4>일정관리</h4>
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                left: "prev,",
                center: "title",
                right: "next",
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
        <div className="col2-box graph-box">
          <div className="col4-box sales-box">
            <h4>매출현황</h4>
            <div className="chartContainer">
              <b>
                월매출
                <br />
                <em>(단위 : 만원)</em>
              </b>
              {formattedData.length > 0 ? (
                <ResponsiveLine
                  data={formattedData}
                  margin={{ top: 20, right: 15, bottom: 30, left: 55 }}
                  xScale={{ type: "point" }}
                  yScale={{ type: "linear" }}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickValues: 5,
                    format: value =>
                      value >= 1000000
                        ? `${new Intl.NumberFormat().format(value / 10000)}만원`
                        : new Intl.NumberFormat().format(value),
                  }}
                  colors={["red"]}
                  lineWidth={2}
                  pointSize={4}
                  pointColor={{ from: "color", modifiers: [["darker", 0.3]] }}
                  pointBorderWidth={2}
                  pointBorderColor={{ from: "serieColor" }}
                  useMesh={true}
                  motionConfig="gentle"
                  tooltip={({ point }) => {
                    const amount = point.data.y;
                    const formattedAmount =
                      amount >= 1000000
                        ? `${new Intl.NumberFormat().format(amount / 10000)}만원`
                        : `${new Intl.NumberFormat().format(amount)}원`;
                    return (
                      <div className="detail-price">
                        <strong>{point.data.x} 평균 매출</strong>
                        <span>{formattedAmount}</span>
                      </div>
                    );
                  }}
                />
              ) : (
                <div className="noData">📉 데이터가 없습니다.</div>
              )}
            </div>
          </div>
          <div className="col4-box visited-box">
            <h4>예약자수 현황</h4>
            <div className="chartContainer">
              <b>
                예약자수
                <br />
                <em>(단위 : 명)</em>
              </b>
              {visitedFormattedData.length > 0 ? (
                <ResponsiveBar
                  data={visitedFormattedData}
                  keys={["count"]}
                  indexBy="date"
                  margin={{ top: 40, right: 15, bottom: 30, left: 35 }}
                  padding={0.2}
                  valueScale={{ type: "linear" }}
                  indexScale={{ type: "band", round: true }}
                  colors={["#70BE3B"]}
                  borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                  }}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickValues: 5,
                    format: value => `${Math.floor(value)}`,
                  }}
                  label={d => `${d.value}명`}
                  labelTextColor="#ffffff"
                  labelSkipWidth={16}
                  labelSkipHeight={16}
                  labelTextStyle={{
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                  role="application"
                  tooltip={({ indexValue, value }) => {
                    return (
                      <div className="detail-price">
                        <strong>{indexValue} 예약자 수</strong>
                        <span>{new Intl.NumberFormat().format(value)}명</span>
                      </div>
                    );
                  }}
                />
              ) : (
                <div className="noData">📉 데이터가 없습니다.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ExportMainDiv>
  );
}

export default ExpertMain;
