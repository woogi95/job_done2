import { useEffect, useState } from "react";
import { loginApi } from "../../../apis/login";
import { ResponsiveLine } from "@nivo/line";
import ReserveUserCount from "../../../components/export-statistics/ReserveUserCount";

function Index() {
  const busiId = localStorage.getItem("businessId");
  const [priceData, setPriceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageMove, setPageMove] = useState(true);
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
  }, [busiId]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "500px",
        }}
      >
        <p>Loading chart...</p>
      </div>
    );
  }

  console.log(priceData);
  const formattedData =
    priceData.length > 0
      ? [
          {
            id: priceData[0]?.businessName ?? "Unknown Business",
            data: priceData.map(({ year, month, totalPrice }) => ({
              x: `${String(year).slice(2)}-${String(month).padStart(2, "0")}`,
              y: totalPrice ?? 0,
            })),
          },
        ]
      : [{ id: "데이터 없음", data: [{ x: "N/A", y: 0 }] }];

  return (
    <div
      style={{
        width: "100%",
        height: "80%",
        padding: "20px",
        background: "#fff",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <div style={{ display: "flex", gap: "20px" }}>
        <button
          onClick={() => {
            setPageMove(true);
          }}
        >
          월 매출
        </button>
        <button
          onClick={() => {
            setPageMove(false);
          }}
        >
          이용자 수
        </button>
      </div>
      {pageMove ? (
        <ResponsiveLine
          data={formattedData}
          style={{ fontSzie: "20" }}
          margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: 0,
            max: "auto",
            stacked: false,
            reverse: false,
          }}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Year-Month",
            legendOffset: 36,
            legendPosition: "middle",
          }}
          // axisLeft={{
          //   tickSize: 5,
          //   tickPadding: 5,
          //   tickRotation: 0,
          //   legend: "Total Price",
          //   legendOffset: -55,
          //   legendPosition: "middle",
          //   tickValues: 4,
          // }}
          colors={{ scheme: "category10" }}
          lineWidth={3}
          pointSize={8}
          pointColor={{ from: "color", modifiers: [] }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          enableSlices="x"
          useMesh={true}
          legends={[
            {
              anchor: "top-right",
              direction: "column",
              translateX: 100,
              itemWidth: 120,
              itemHeight: 20,
              symbolSize: 16,
              symbolShape: "circle",
            },
          ]}
        />
      ) : (
        <ReserveUserCount />
      )}
    </div>
  );
}

export default Index;
