import { useEffect, useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { loginApi } from "../../apis/login";

function ReserveUserCount() {
  const busiId = localStorage.getItem("businessId");
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllPrice = async () => {
      if (!busiId) return;
      try {
        const res = await loginApi.get(
          `/api/business/serviceCount?businessId=${busiId}`,
        );
        console.log(res);
        const sortedData = Array.isArray(res.data.resultData)
          ? res.data.resultData.sort((a, b) =>
              a.year === b.year ? a.month - b.month : a.year - b.year,
            )
          : [];
        setUserData(sortedData);
      } catch (error) {
        console.error("Error fetching price data:", error);
        setUserData([]);
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
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "500px",
          fontSize: "18px",
          fontWeight: "bold",
          color: "#555",
        }}
      >
        <div className="spinner" />
        <p>차트를 불러오는 중...</p>
        <style>
          {`
            .spinner {
              width: 40px;
              height: 40px;
              border: 4px solid rgba(0, 0, 0, 0.1);
              border-top-color: #3498db;
              border-radius: 50%;
              animation: spin 1s linear infinite;
            }
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

  const formattedData = userData.map(({ year, month, serviceCount }) => ({
    date: `${String(year).slice(2)}년 ${String(month).padStart(2, "0")}월`,
    count: serviceCount ?? 0,
  }));
  console.log("이용자 수", formattedData);
  return (
    <div
      style={{
        width: "100%",
        height: "90%",
        margin: "10px auto",
        padding: "10px",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2 style={{ fontSize: "22px", marginBottom: "10px", color: "#333" }}>
        📊 최근 6개월 이용자 수
      </h2>
      {formattedData.length > 0 ? (
        <ResponsiveBar
          data={formattedData}
          keys={["count"]}
          indexBy="date"
          margin={{ top: 50, right: 40, bottom: 50, left: 50 }}
          padding={0.3}
          valueScale={{ type: "linear" }}
          indexScale={{ type: "band", round: true }}
          colors={{ scheme: "set2" }}
          borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          axisTop={null}
          axisRight={null}
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
            legend: "이용자 수",
            legendPosition: "middle",
            legendOffset: -40,
            tickValues: 5,
            format: value => Math.floor(value),
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          role="application"
          ariaLabel="Nivo bar chart for user count"
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
      ) : (
        <div className="noData">📉 데이터가 없습니다.</div>
      )}
    </div>
  );
}

export default ReserveUserCount;
