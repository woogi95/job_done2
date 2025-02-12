import { useEffect, useState } from "react";
import { loginApi } from "../../apis/login";
import MyPageLayout from "../../components/MyPageLayout";
import { statusText } from "../../components/ServiceIcon";

function UsageDetails() {
  const [usage, setUsage] = useState([]);

  const fetchUsageData = async () => {
    try {
      const res = await loginApi.get("/api/service", {
        params: {
          status: 3,
          page: 1,
          size: 10,
        },
      });
      const filterData = res.data.resultData.filter(
        item =>
          item.completed === 6 || (item.completed >= 3 && item.completed <= 5),
      );
      setUsage(filterData);
    } catch (error) {
      console.error("Error fetching usage data:", error);
    }
  };

  useEffect(() => {
    fetchUsageData();
  }, []);

  return (
    <MyPageLayout>
      <div className=" flex justify-center items-center pb-[30px]">
        <span className="text-[24px] font-normal">이용내역</span>
      </div>
      <div className="grid grid-cols-5 border-[1px] border-solid border-[#E0E0E0] rounded-lg py-[15px] px-[20px]">
        <div className="text-center">날짜</div>
        <div className="text-center">업체명</div>
        <div className="text-center">이용한 서비스</div>
        <div className="text-center">금액</div>
        <div className="text-center">진행상황</div>
      </div>
      {usage &&
        usage.length > 0 &&
        usage.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-5 py-[15px] px-[25px] pt-[30px]"
          >
            <div className="text-center">
              {item.createdAt ? item.createdAt.slice(0, 10) : ""}
            </div>
            <div className="text-center">{item.businessName || ""}</div>
            <div className="text-center">
              {item.detailTypeName || "찾을 수 없음"}
            </div>
            <div className="text-center">
              {item.price ? `${item.price.toLocaleString()}원` : "150,000원"}
            </div>
            <div className="text-center">
              {statusText[item.completed] || "확인중..."}
            </div>
          </div>
        ))}
    </MyPageLayout>
  );
}

export default UsageDetails;
