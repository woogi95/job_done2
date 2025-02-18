import { useEffect, useState } from "react";
import { loginApi } from "../../../apis/login";
import { ResponsiveLine } from "@nivo/line";

interface AvgPrice {
  year: number;
  month: number;
  totalPrice: number;
  businessName: string;
}

function Index(): JSX.Element {
  const busiId = localStorage.getItem("businessId");
  const [priceData, setPriceData] = useState<AvgPrice[]>([]);
  const [loading, setLoading] = useState(true);
  console.log(busiId);
  const getAllPrice = async (): Promise<void> => {
    try {
      const res = await loginApi.get(`/api/business/monthly/${busiId}`);
      console.log(res);
      const responseData = Array.isArray(res.data.resultData)
        ? res.data.resultData
        : [];
      setPriceData(responseData);
    } catch (error) {
      console.error("Error fetching price data:", error);
      setPriceData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (busiId) {
      getAllPrice();
    }
  }, [busiId]);

  if (loading) {
    return <div>Loading chart...</div>;
  }

  const formattedData =
    priceData.length > 0
      ? [
          {
            id: priceData[0]?.businessName ?? "Unknown Business",
            data: priceData.map((item: AvgPrice) => ({
              x:
                item?.year && item?.month
                  ? `${item.year}-${String(item.month).padStart(2, "0")}`
                  : "Unknown",
              y: item?.totalPrice ?? 0,
            })),
          },
        ]
      : [{ id: "데이터 불러오기 실패", data: [{ x: "N/A", y: 0 }] }];

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <ResponsiveLine
        data={formattedData}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: 0,
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Month",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Total Price",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        colors={{ scheme: "set1" }}
        lineWidth={5}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabel="data.yFormatted"
        pointLabelYOffset={-12}
        enableTouchCrosshair={true}
        useMesh={true}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
}

export default Index;
