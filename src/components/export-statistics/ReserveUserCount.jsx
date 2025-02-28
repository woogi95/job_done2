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
          justifyContent: "center",
          alignItems: "center",
          height: "500px",
        }}
      >
        <p>Loading chart...</p>
      </div>
    );
  }

  const formattedData = userData.map(({ year, month, serviceCount }) => ({
    date: `${String(year).slice(2)}-${String(month).padStart(2, "0")}`,
    count: serviceCount ?? 0,
  }));

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
      <div>이용자 수</div>
      <ResponsiveBar
        data={formattedData}
        keys={["count"]}
        indexBy="date"
        margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "nivo" }}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Year-Month",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "User Count",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
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
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        role="application"
        ariaLabel="Nivo bar chart for user count"
      />
    </div>
  );
}

export default ReserveUserCount;
