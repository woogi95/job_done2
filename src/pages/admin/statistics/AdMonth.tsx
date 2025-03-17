import AdminSixMonth from "../../../components/admin/admin-main/six-month-price/AdminSixMonth";
import { ChartContainer } from "./chartD";

const AdMonth = () => {
  return (
    <ChartContainer>
      <div style={{ display: "flex", justifyContent: "left", width: "100%" }}>
        <h2 className="tit">매출</h2>

        <select style={{ backgroundColor: "#f8f9fa" }}>
          <option value="all">전체보기</option>
          <option value="low">평점 낮은 순</option>
        </select>
      </div>
      <AdminSixMonth />
    </ChartContainer>
  );
};

export default AdMonth;
