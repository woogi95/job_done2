import { ResponsiveBar } from "@nivo/bar";
import { useRecoilState } from "recoil";
import {
  dcSixMonthDataAtom,
  yearValueAtom,
} from "../../../../atoms/third-atoms/admin/mainAtom";
import axios from "axios";
import { useEffect, useState } from "react";

const AdminSixMonth = () => {
  // const [serverData] = useRecoilState(dcSixMonthDataAtom);
  const [serverData, setServerData] = useRecoilState(dcSixMonthDataAtom);
  const [yearValue, _setYearValue] = useRecoilState(yearValueAtom);

  const [yearData, setYearData] = useState<
    { [key: string]: string | number }[]
  >([
    {
      month: "",
      totalPrice: 0,
    },
  ]);
  const getSixData = async () => {
    try {
      const res = await axios.get("/api/admin/statsSales");
      if (res) {
        const filterData = res.data.resultData;

        // 데이터 가공 (Nivo 차트에 맞게 변환)
        const nivoData = filterData.map(
          (item: { [key: string]: string | number }) => ({
            month: String(item.month),
            formattedMonth: String(item.month)
              .split("-")
              .map((val, idx) => (idx === 0 ? `${val.slice(2)}년` : `${val}월`)) // "24-01" → "24년 01월"
              .join(" "),
            totalPrice: Number(item.totalPrice),
          }),
        );
        setServerData(nivoData);
      }
    } catch (error) {
      console.error("Error fetching six-month data:", error);
    }
  };
  const getYearData = async () => {
    try {
      const res = await axios.get(
        `/api/admin/statsSalesYear?year=${yearValue}`,
      );
      if (res) {
        const filterData = res.data.resultData;
        // 데이터 가공
        const nivoData = filterData.map(
          (item: { [key: string]: string | number }) => ({
            month: String(item.month),
            formattedMonth: String(item.month)
              .split("-")
              .map((val, idx) => (idx === 0 ? `${val.slice(2)}년` : `${val}월`)) // "24-01" → "24년 01월"
              .join(" "),
            totalPrice: Number(item.totalPrice),
          }),
        );
        setYearData(nivoData);
      }
    } catch (error) {
      console.error("Error fetching six-month data:", error);
    }
  };
  useEffect(() => {
    if (yearValue === 0) {
      console.log(yearValue);
      getSixData();
    } else {
      getYearData();
    }
  }, [yearValue]);

  const grapeData = yearValue == 0 ? serverData : yearData;

  return (
    <div style={{ width: "100%", height: "90%" }}>
      <ResponsiveBar
        data={
          grapeData.length > 0
            ? grapeData
            : [{ month: "데이터 없음", totalPrice: 0 }]
        }
        keys={["totalPrice"]}
        indexBy="formattedMonth"
        margin={{ top: 50, right: 20, bottom: 50, left: 80 }}
        padding={grapeData.length > 6 ? 0.3 : 0.5}
        valueScale={{ type: "linear", min: "auto", max: "auto" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "nivo" }}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
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
          legend: "매출",
          legendPosition: "middle",
          legendOffset: -72,
          format: value =>
            value >= 1000000
              ? `${new Intl.NumberFormat().format(value / 10000)}만원`
              : new Intl.NumberFormat().format(value),
        }}
        enableLabel={false}
        animate={true}
        tooltip={({ value, indexValue, color }) => {
          const formattedAmount =
            value >= 1000000
              ? `${new Intl.NumberFormat().format(value / 10000)}만원`
              : `${new Intl.NumberFormat().format(value)}원`;

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
              <strong style={{ fontSize: "14px" }}>{indexValue}</strong>
              <br />
              <span style={{ color: color, fontWeight: "bold" }}>
                💰 매출: {formattedAmount}
              </span>
            </div>
          );
        }}
      />
    </div>
  );
};
export default AdminSixMonth;
