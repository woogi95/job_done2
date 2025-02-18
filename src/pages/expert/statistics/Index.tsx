import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { loginApi } from "../../../apis/login";
import { ResponsiveLine } from "@nivo/line";
import { businessDetailState } from "../../../atoms/businessAtom";

interface AvgPrice {
  year: number;
  month: number;
  totalPrice: number;
  businessName: string;
}

function Index(): JSX.Element {
  const businessDetail = useRecoilValue(businessDetailState);
  const [priceData, setPriceData] = useState<AvgPrice[]>([]);

  // 안전한 데이터 접근
  const busiId: number = businessDetail[0]?.businessId ?? 0;

  const getAllPrice = async (): Promise<void> => {
    try {
      const res = await loginApi.get(`/api/business/monthly/${busiId}`);
      setPriceData(
        Array.isArray(res.data.resultData) ? res.data.resultData : [],
      );
    } catch (error) {
      console.error("Error fetching price data:", error);
    }
  };

  useEffect(() => {
    if (busiId) {
      getAllPrice();
    }
  }, [busiId]);

  // Nivo 데이터 형식 변환
  const formattedData = [
    {
      id: priceData.length > 0 ? priceData[0].businessName : "Unknown Business",
      data: priceData.map((item: AvgPrice) => ({
        x: `${item.year}-${String(item.month).padStart(2, "0")}`,
        y: item.totalPrice,
      })),
    },
  ];

  return (
    <ResponsiveLine
      data={formattedData}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
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
  );
}

export default Index;
