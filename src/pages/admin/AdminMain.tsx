import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

import AdminSixMonth from "../../components/admin/admin-main/six-month-price/AdminSixMonth";
import DaysUser from "../../components/admin/admin-main/days-user/DaysUser";
import { useRecoilState } from "recoil";
import { mainDashBoardAtom } from "../../atoms/third-atoms/admin/mainAtom";
import { StatesDashType } from "../../types/type";
import CategoryPercent from "../../components/admin/admin-main/category-percent/CategoryPercent";

// Chart.js 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

const AdminMain = () => {
  // 최근일주일 방문자 수
  const [dashBoardData] = useRecoilState<StatesDashType>(mainDashBoardAtom);

  return (
    <div className="min-h-screen flex overflow-auto">
      {/* Main Content */}
      <div className="flex-1">
        {/* Page Content */}
        <main className="p-6">
          <h1 className="text-2xl font-semibold mb-4">대시보드</h1>
          {/* 전체 현황 요약 - 새로운 통계 카드 추가 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-gray-500 text-sm">오늘의 거래 수</h3>
              <p className="text-2xl font-bold">
                {dashBoardData.newServiceCount} 건
              </p>
              <p className="text-sm text-green-500">
                {dashBoardData.newServicePercent}% 증가
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-gray-500 text-sm">신규 가입자</h3>
              <p className="text-2xl font-bold">
                {dashBoardData.newUserCount}명
              </p>
              <p className="text-sm text-green-500">
                {dashBoardData.newUserPercent}% 증가
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-gray-500 text-sm">미처리 문의</h3>
              <p className="text-2xl font-bold">
                {dashBoardData.unprocessedInquiries}건
              </p>
              <p className="text-sm text-red-500">
                {dashBoardData.increaseUnprocessedInquiries}건
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-gray-500 text-sm">신규 업체</h3>
              <p className="text-2xl font-bold">
                {dashBoardData.newBusinessCount}건
              </p>
              <p className="text-sm text-green-500">
                {dashBoardData.newBusinessCountThenYesterday}건
              </p>
            </div>
          </div>
          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Line Chart */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold mb-4">월별 매출 추이</h2>
              <AdminSixMonth />
            </div>

            {/* Bar Chart */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold mb-4">일별 방문자 현황</h2>
              <DaysUser />
            </div>

            {/* Doughnut Chart */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold mb-4">
                서비스 카테고리 분포
              </h2>
              <CategoryPercent />
            </div>

            {/* Additional Stats or Info */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold mb-4">주요 통계</h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">전월 대비 성장률</span>
                  <span className="text-green-500 font-semibold">+15.8%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">신규 고객 수</span>
                  <span className="font-semibold">127명</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">평균 만족도</span>
                  <span className="text-yellow-500 font-semibold">4.8/5.0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">완료된 서비스</span>
                  <span className="font-semibold">892건</span>
                </div>
              </div>
              {/* <div className="bg-white rounded-lg shadow-md"> */}
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">공지사항 및 알림</h2>
                <button className="text-blue-500 hover:text-blue-700">
                  전체보기
                </button>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  <span>공지</span>
                  {/* {notifications.map(notice => (
                    <div
                      key={notice.id}
                      className="flex justify-between items-center border-b pb-2"
                    >
                      <div className="flex items-center">
                        <span
                          className={`px-2 py-1 rounded text-xs mr-2 ${
                            notice.type === "중요"
                              ? "bg-red-100 text-red-800"
                              : notice.type === "공지"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {notice.type}
                        </span>
                        <span className="font-medium">{notice.title}</span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {notice.date}
                      </span>
                    </div>
                  ))} */}
                </div>
              </div>
              {/* </div> */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminMain;
