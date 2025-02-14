import React, { useState } from "react";
import ApexCharts from "react-apexcharts";
import { useRecoilState } from "recoil";
import { reserveAllPrice } from "../../../atoms/reservationAtom";

function Index() {
  const [reservationData, setReservationData] = useRecoilState(reserveAllPrice);
  const [state, setState] = useState({
    series: [
      {
        name: "Desktops",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: "Product Trends by Month",
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
        ],
      },
    },
  });
  const getStatusList = async (businessId, status) => {
    console.log("businessId, status", businessId, status);
    try {
      // console.log("이것무엇", businessId, status);
      const res = await loginApi.get(
        // `/api/service?business_id=${businessId}&status=${status}&page=${1}&size=${10}`,
        `/api/service?business_id=${businessId}&status=${status}&page=${1}&size=${10}`,
      );
      console.log(res.data);
      const filterData = setReservationData(res.data.resultData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {/* 매출 통계 */}
      <div>
        <h2>매출 통계</h2>
        <div>
          <div id="chart">
            <ApexCharts
              options={state.options}
              series={state.series}
              type="line"
              height={350}
            />
          </div>
          <div id="html-dist"></div>
        </div>
      </div>
      {/* 주간 이용 유저 */}
      <div>주간 이용 유저</div>
    </div>
  );
}
export default Index;
