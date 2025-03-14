import { useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import "./totalPriceMonthD.css"; // ✅ 스타일 모듈 적용
import { loginApi } from "../../apis/login";

const TotalPriceMonth = () => {
  const busiId = localStorage.getItem("businessId");
  const [priceData, setPriceData] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <div className="loadingContainer">
        <div className="spinner" />
        <p>차트를 불러오는 중...</p>
      </div>
    );
  }

  const formattedData =
    priceData.length > 0
      ? [
          {
            id: priceData[0]?.businessName ?? "Unknown Business",
            data: priceData
              .filter(({ year, month }) => year > 0 && month > 0)
              .map(({ year, month, totalPrice }) => ({
                x: `${String(year).slice(2)}년${String(month).padStart(2, "0")}월`,
                y: totalPrice ?? 0,
                formattedY: new Intl.NumberFormat().format(totalPrice ?? 0),
              })),
          },
        ]
      : [];
  console.log(priceData);
  console.log(formattedData.length);
  return (
    <div className="chartContainer">
      <h2 style={{ fontSize: "22px", marginBottom: "10px", color: "#333" }}>
        📊 최근 6개월 월 매출
      </h2>
      {formattedData.length > 0 ? (
        <ResponsiveLine
          data={formattedData}
          margin={{ top: 50, right: 60, bottom: 50, left: 90 }}
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
            tickPadding: 10,
            tickRotation: 0,
            legend: "년-월",
            legendOffset: 36,
            legendPosition: "middle",
            format: value => value.replace("-", "."),
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 10,
            tickRotation: 0,
            legend: "월 매출",
            legendOffset: -80,
            legendPosition: "middle",
            tickValues: 5,
            format: value =>
              value >= 1000000
                ? `${new Intl.NumberFormat().format(value / 10000)}만원`
                : new Intl.NumberFormat().format(value),
          }}
          colors={{ scheme: "set2" }}
          lineWidth={3}
          pointSize={10}
          pointColor={{ from: "color", modifiers: [["darker", 0.3]] }}
          pointBorderWidth={3}
          pointBorderColor={{ from: "serieColor" }}
          useMesh={true}
          motionConfig="gentle"
          tooltip={({ point }) => {
            const amount = point.data.y;
            const formattedAmount =
              amount >= 1000000
                ? `${new Intl.NumberFormat().format(amount / 10000)}만원`
                : `${new Intl.NumberFormat().format(amount)}원`;
            return (
              <div
                style={{
                  background: "rgba(0, 0, 0, 0.8)",
                  color: "#fff",
                  padding: "10px",
                  borderRadius: "6px",
                  boxShadow: "0px 2px 5px rgba(0,0,0,0.3)",
                }}
              >
                <strong style={{ fontSize: "14px" }}>{point.data.x}</strong>
                <br />
                <span style={{ color: point.serieColor, fontWeight: "bold" }}>
                  💰 매출: {formattedAmount}
                </span>
              </div>
            );
          }}
        />
      ) : (
        <div className="noData">📉 데이터가 없습니다.</div>
      )}
    </div>
  );
};

export default TotalPriceMonth;
