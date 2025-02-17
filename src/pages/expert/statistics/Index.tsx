// import React, { useState } from "react";
// // import ApexCharts from "react-apexcharts";
// import { useRecoilState } from "recoil";
// import { reserveAllPrice } from "../../../atoms/reservationAtom";
// import { loginApi } from "../../../apis/login";
// import { ResponsiveLine } from "@nivo/line";

// function Index() {
//   const [reservationData, setReservationData] = useRecoilState(reserveAllPrice);
//   // const gData = {
//   //   name: businessName,
//   //   value: price,
//   // };
//   const getStatusList = async (businessId: number, status: number) => {
//     console.log("businessId, status", businessId, status);
//     try {
//       // console.log("이것무엇", businessId, status);
//       const res = await loginApi.get(
//         // `/api/service?business_id=${businessId}&status=${status}&page=${1}&size=${10}`,
//         `/api/service?business_id=${businessId}&status=${status}&page=${1}&size=${10}`,
//       );
//       console.log(res.data);
//       const filterData = setReservationData(res.data.resultData);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <ResponsiveLine
//       data={data}
//       margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
//       xScale={{ type: "point" }}
//       yScale={{
//         type: "linear",
//         min: "auto",
//         max: "auto",
//         stacked: true,
//         reverse: false,
//       }}
//       yFormat=" >-.2f"
//       axisTop={null}
//       axisRight={null}
//       axisBottom={{
//         tickSize: 5,
//         tickPadding: 5,
//         tickRotation: 0,
//         legend: "transportation",
//         legendOffset: 36,
//         legendPosition: "middle",
//         truncateTickAt: 0,
//       }}
//       axisLeft={{
//         tickSize: 5,
//         tickPadding: 5,
//         tickRotation: 0,
//         legend: "count",
//         legendOffset: -40,
//         legendPosition: "middle",
//         truncateTickAt: 0,
//       }}
//       colors={{ scheme: "set1" }}
//       lineWidth={5}
//       pointSize={10}
//       pointColor={{ theme: "background" }}
//       pointBorderWidth={2}
//       pointBorderColor={{ from: "serieColor" }}
//       pointLabel="data.yFormatted"
//       pointLabelYOffset={-12}
//       enableTouchCrosshair={true}
//       useMesh={true}
//       legends={[
//         {
//           anchor: "bottom-right",
//           direction: "column",
//           justify: false,
//           translateX: 100,
//           translateY: 0,
//           itemsSpacing: 0,
//           itemDirection: "left-to-right",
//           itemWidth: 80,
//           itemHeight: 20,
//           itemOpacity: 0.75,
//           symbolSize: 12,
//           symbolShape: "circle",
//           symbolBorderColor: "rgba(0, 0, 0, .5)",
//           effects: [
//             {
//               on: "hover",
//               style: {
//                 itemBackground: "rgba(0, 0, 0, .03)",
//                 itemOpacity: 1,
//               },
//             },
//           ],
//         },
//       ]}
//     />
//   );
// }
// export default Index;

const Index = () => {
  return <div>Index</div>;
};

export default Index;
