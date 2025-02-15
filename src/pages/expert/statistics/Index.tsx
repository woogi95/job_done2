import React, { useState } from "react";
// import ApexCharts from "react-apexcharts";
import { useRecoilState } from "recoil";
import { reserveAllPrice } from "../../../atoms/reservationAtom";
import { loginApi } from "../../../apis/login";
import { ResponsiveLine } from "@nivo/line";
function Index() {
  const [reservationData, setReservationData] = useRecoilState(reserveAllPrice);
  // const [state, setState] = useState({
  //   series: [
  //     {
  //       name: "매출",
  //       data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 100, 110, 120],
  //     },
  //   ],
  //   options: {
  //     chart: {
  //       height: 500,
  //       type: "line",
  //       zoom: {
  //         enabled: false,
  //       },
  //     },
  //     dataLabels: {
  //       enabled: false,
  //     },
  //     stroke: {
  //       curve: "straight",
  //     },
  //     yaxis: {
  //       show: true,
  //       categories: ["10", 20, 30, 40, 50, 60, 70, 80, 90, 100],
  //     },
  //     title: {
  //       text: "매출 현황",
  //       align: "left",
  //     },
  //     grid: {
  //       row: {
  //         colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
  //         opacity: 0.5,
  //       },
  //     },
  //     xaxis: {
  //       categories: [
  //         "1월",
  //         "2월",
  //         "3월",
  //         "4월",
  //         "5월",
  //         "6월",
  //         "7월",
  //         "8월",
  //         "9월",
  //         "10월",
  //         "11월",
  //         "12월",
  //       ],
  //     },
  //   },
  // });
  const getStatusList = async (businessId: number, status: number) => {
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
    // <ResponsiveLine
    //   data={data}
    //   margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    //   xScale={{ type: "point" }}
    //   yScale={{
    //     type: "linear",
    //     min: "auto",
    //     max: "auto",
    //     stacked: true,
    //     reverse: false,
    //   }}
    //   yFormat=" >-.2f"
    //   axisTop={null}
    //   axisRight={null}
    //   axisBottom={{
    //     tickSize: 5,
    //     tickPadding: 5,
    //     tickRotation: 0,
    //     legend: "transportation",
    //     legendOffset: 36,
    //     legendPosition: "middle",
    //     truncateTickAt: 0,
    //   }}
    //   axisLeft={{
    //     tickSize: 5,
    //     tickPadding: 5,
    //     tickRotation: 0,
    //     legend: "count",
    //     legendOffset: -40,
    //     legendPosition: "middle",
    //     truncateTickAt: 0,
    //   }}
    //   colors={{ scheme: "set1" }}
    //   lineWidth={5}
    //   pointSize={10}
    //   pointColor={{ theme: "background" }}
    //   pointBorderWidth={2}
    //   pointBorderColor={{ from: "serieColor" }}
    //   pointLabel="data.yFormatted"
    //   pointLabelYOffset={-12}
    //   enableTouchCrosshair={true}
    //   useMesh={true}
    //   legends={[
    //     {
    //       anchor: "bottom-right",
    //       direction: "column",
    //       justify: false,
    //       translateX: 100,
    //       translateY: 0,
    //       itemsSpacing: 0,
    //       itemDirection: "left-to-right",
    //       itemWidth: 80,
    //       itemHeight: 20,
    //       itemOpacity: 0.75,
    //       symbolSize: 12,
    //       symbolShape: "circle",
    //       symbolBorderColor: "rgba(0, 0, 0, .5)",
    //       effects: [
    //         {
    //           on: "hover",
    //           style: {
    //             itemBackground: "rgba(0, 0, 0, .03)",
    //             itemOpacity: 1,
    //           },
    //         },
    //       ],
    //     },
    //   ]}
    // />
    console.log()
  );
}
export default Index;
