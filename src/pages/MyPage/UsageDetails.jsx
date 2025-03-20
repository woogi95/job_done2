import { useEffect, useState } from "react";
import { loginApi } from "../../apis/login";
import MyPageLayout from "../../components/layouts/MyPageLayout";
import { statusText } from "../../components/ServiceIcon";
import { Pagination } from "antd";

function UsageDetails() {
  const [usage, setUsage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPageData, setCurrentPageData] = useState([]);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

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
      setTotalItems(res.data.resultData.length);
    } catch (error) {
      console.error("Error fetching usage data:", error);
    }
  };

  const updateCurrentPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setCurrentPageData(usage.slice(startIndex, endIndex));
    setTotalItems(usage.length);
  };

  useEffect(() => {
    fetchUsageData();
  }, []);

  useEffect(() => {
    updateCurrentPageData();
  }, [currentPage, pageSize, usage]);

  return (
    <MyPageLayout>
      <div className="m-auto h-[720px]">
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
        {currentPageData &&
          currentPageData.length > 0 &&
          currentPageData.map((item, index) => (
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
      </div>

      <div className="mt-6 flex justify-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={totalItems}
          onChange={handlePageChange}
          showSizeChanger
          pageSizeOptions={["10", "20", "50"]}
        />
      </div>
    </MyPageLayout>
  );
}

export default UsageDetails;
