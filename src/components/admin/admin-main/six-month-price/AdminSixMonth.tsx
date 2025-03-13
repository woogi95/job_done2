import { ResponsiveBar } from "@nivo/bar";
import { useRecoilState } from "recoil";
import { dcSixMonthDataAtom } from "../../../../atoms/third-atoms/admin/mainAtom";

const AdminSixMonth = () => {
  const [serverData] = useRecoilState(dcSixMonthDataAtom);
  // console.log(serverData);

  // // 🔹 데이터를 Nivo 차트 형식으로 변환 (totalPrice만 포함)
  // const nivoData = serverData.map(item => ({
  //   month: item.month
  //     .split("-")
  //     .map((val, idx) => (idx === 0 ? val.slice(2) : val))
  //     .join("-"),
  //   totalPrice: item.totalPrice, // ✅ 전체 매출만 사용
  // }));

  // // 🔹 Nivo 차트 설정 (keys에 'totalPrice'만 사용)
  // const barChartData = {
  //   data: nivoData,
  //   keys: ["totalPrice"], // ✅ totalPrice만 차트에 표시
  //   indexBy: "month", // ✅ X축을 "month" 기준으로 설정
  // };

  // console.log(barChartData);

  return (
    <div style={{ width: "100%", height: "90%" }}>
      <ResponsiveBar
        data={serverData} // ✅ 변환된 데이터 사용
        keys={["totalPrice"]} // ✅ totalPrice만 표시
        indexBy="month" // ✅ X축을 "month" 기준으로 설정
        margin={{ top: 50, right: -10, bottom: 50, left: 80 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "nivo" }}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "년-월",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "매출",
          legendPosition: "middle",
          legendOffset: -72,
          format: value => new Intl.NumberFormat().format(value), // ✅ 1,000 단위 쉼표 추가
        }}
      />
    </div>
  );
};

export default AdminSixMonth;
