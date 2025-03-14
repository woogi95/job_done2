import AdminSixMonth from "../../../components/admin/admin-main/six-month-price/AdminSixMonth";
import { ChartContainer } from "./chartD";

const AdMonth = () => {
  return (
    <ChartContainer>
      <div style={{ display: "flex", justifyContent: "left", width: "100%" }}>
        <h2 className="tit"></h2>
      </div>
      <AdminSixMonth />
    </ChartContainer>
  );
};

export default AdMonth;
