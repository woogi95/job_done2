import { ResponsiveBar } from "@nivo/bar";
import { useRecoilState } from "recoil";
import { dcDaysUserDataAtom } from "../../../../atoms/third-atoms/admin/mainAtom";

const DaysUser = () => {
  const [barChartData] = useRecoilState(dcDaysUserDataAtom);

  console.log("✅ Recoil에서 가져온 데이터:", barChartData);
  const chartData = barChartData.data;
  const formattedData: { date: string; visitorCount: number }[] = (
    chartData ?? []
  ).map(item => ({
    date: item.date || "N/A",
    formattedDate: String(item.date)
      .split("-")
      .map((val, idx) => (idx === 0 ? `${val}월` : `${val}일`)) // "24-01" → "24년 01월"
      .join(" "),
    visitorCount: item.visitorCount ?? 0,
  }));

  return (
    <div style={{ width: "100%", height: "90%" }}>
      <ResponsiveBar
        data={formattedData}
        keys={["visitorCount"]} // ✅ keys를 직접 지정
        indexBy="formattedDate"
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
          legendOffset: -50,
          tickValues: 5,
          format: value => Math.floor(value),
        }}
        tooltip={({ indexValue, value }) => {
          return (
            <div
              style={{
                background: "rgba(0, 0, 0, 0.8)",
                color: "#fff",
                padding: "8px 12px",
                borderRadius: "6px",
                boxShadow: "0px 2px 5px rgba(0,0,0,0.3)",
              }}
            >
              <strong>📅 {indexValue}</strong>
              <br />
              <span style={{ color: "#f4d03f", fontWeight: "bold" }}>
                👥 이용자 수: {new Intl.NumberFormat().format(value)}명
              </span>
            </div>
          );
        }}
      />
    </div>
  );
};

export default DaysUser;
