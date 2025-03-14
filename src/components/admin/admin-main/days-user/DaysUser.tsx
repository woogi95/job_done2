import { ResponsiveBar } from "@nivo/bar";
import { useRecoilState } from "recoil";
import { dcDaysUserDataAtom } from "../../../../atoms/third-atoms/admin/mainAtom";

const DaysUser = () => {
  const [barChartData] = useRecoilState(dcDaysUserDataAtom);

  console.log("✅ Recoil에서 가져온 데이터:", barChartData);
  const chartData = barChartData.data;
  const formattedData = chartData?.map(item => ({
    date: item.date || "N/A",
    visitorCount: item.visitorCount ?? 0,
  }));
  console.log(formattedData);
  return (
    <div style={{ width: "100%", height: "90%" }}>
      <ResponsiveBar
        data={formattedData}
        keys={["visitorCount"]} // ✅ keys를 직접 지정
        indexBy="date"
        margin={{ top: 50, right: 30, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear", min: 0 }} // ✅ Y축 최소값 0 설정
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "paired" }}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "날짜",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "방문자 수",
          legendPosition: "middle",
          legendOffset: -40,
          format: value => new Intl.NumberFormat().format(value),
        }}
      />
    </div>
  );
};

export default DaysUser;
