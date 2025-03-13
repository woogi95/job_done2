import { ResponsiveBar } from "@nivo/bar";
import { useRecoilState } from "recoil";
import { dcDaysUserDataAtom } from "../../../../atoms/third-atoms/admin/mainAtom";

const DaysUser = () => {
  const [barChartData] = useRecoilState(dcDaysUserDataAtom);
  const formattedData = (barChartData?.data ?? []).map(item => ({
    date: item.date.slice(5), // ✅ "2025-03-04" → "03-04" 변환
    visitorCount: item.visitorCount, // ✅ 방문자 수 추가
  }));
  console.log(barChartData);

  return (
    <div style={{ width: "100%", height: "90%" }}>
      <ResponsiveBar
        data={formattedData} // ✅ 변환된 데이터 사용
        keys={barChartData.keys} // ✅ visitorCount만 표시
        indexBy="date" // ✅ X축을 "date" 기준으로 설정
        margin={{ top: 50, right: 30, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
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
          format: value => new Intl.NumberFormat().format(value), // ✅ 1,000 단위 쉼표 추가
        }}
      />
    </div>
  );
};

export default DaysUser;
