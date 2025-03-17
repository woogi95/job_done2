import { useRecoilState } from "recoil";
import AdminSixMonth from "../../../components/admin/admin-main/six-month-price/AdminSixMonth";
import { ChartContainer, RequestBusiContainer } from "./chartD";
import { yearValueAtom } from "../../../atoms/third-atoms/admin/mainAtom";

const AdMonth = () => {
  const [yearValue, setYearValue] = useRecoilState(yearValueAtom);
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2023 + 1 },
    (_, i) => 2023 + i,
  );

  return (
    <RequestBusiContainer>
      <div
        style={{
          display: "flex",
          justifyContent: "left",
          width: "100%",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <h2 className="tit">매출 : </h2>
        <select onChange={e => setYearValue(e.target.value)} value={yearValue}>
          <option value="0">최근 6개월 매출</option>
          {years.map(year => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <ChartContainer>
        <AdminSixMonth />
      </ChartContainer>
    </RequestBusiContainer>
  );
};

export default AdMonth;
