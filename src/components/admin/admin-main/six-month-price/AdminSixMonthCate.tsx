import { ResponsiveBar } from "@nivo/bar";
import { useRecoilState } from "recoil";
import { stateSixMonthAtom } from "../../../../atoms/third-atoms/admin/mainAtom";

const AdminSixMonth = () => {
  const [serverData, _setServerData] = useRecoilState(stateSixMonthAtom);

  const categories = [
    ...new Set(
      serverData
        .flatMap(item => item.salesInfoDtos?.map(s => s.categoryName ?? "기타"))
        .filter(Boolean),
    ),
  ] as string[];

  // 🔹 (2) 데이터를 Nivo 차트 형식으로 변환
  const nivoData = serverData.map(item => {
    const formattedMonth = item.month.replace("-", "."); // "2024-10" → "24.10" 변환
    const salesData: Record<string, number> = {};
    // 각 카테고리의 `totalPrice` 매핑
    item.salesInfoDtos?.forEach(cur => {
      salesData[cur.categoryName] = cur.totalPrice;
    }, {});

    return {
      month: formattedMonth,
      ...salesData, // 각 카테고리별 데이터 추가
    };
  });

  // 🔹 (3) Nivo 차트 설정
  const barChartData = {
    data: nivoData,
    keys: categories,
    indexBy: "month", // X축을 month(월)로 설정
  };

  return (
    <div style={{ width: "100%", height: "80%" }}>
      <ResponsiveBar
        data={barChartData.data} // ✅ 변환된 데이터 사용
        keys={barChartData.keys} // ✅ 동적으로 생성된 카테고리 키 사용
        indexBy="month" // ✅ X축을 "month" 기준으로 설정
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "nivo" }}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "월",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "매출",
          legendPosition: "middle",
          legendOffset: -40,
          format: value => new Intl.NumberFormat().format(value), // 1,000 단위 쉼표 추가
        }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            translateX: 120,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [{ on: "hover", style: { itemOpacity: 1 } }],
          },
        ]}
      />
    </div>
  );
};

export default AdminSixMonth;
