import { useState } from "react";

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
import { Line, Bar, Doughnut } from "react-chartjs-2";

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

const TestPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // 라인 차트 데이터
  const lineChartData = {
    labels: ["1월", "2월", "3월", "4월", "5월", "6월"],
    datasets: [
      {
        label: "월별 매출",
        data: [3000000, 3500000, 2800000, 4200000, 4800000, 4100000],
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  // 바 차트 데이터
  const barChartData = {
    labels: ["월", "화", "수", "목", "금", "토", "일"],
    datasets: [
      {
        label: "일별 방문자",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };

  // 도넛 차트 데이터
  const doughnutChartData = {
    labels: ["청소", "이사", "수리", "기타"],
    datasets: [
      {
        data: [40, 30, 20, 10],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
        ],
      },
    ],
  };

  // 최근 매물 데이터 예시
  const recentProperties = [
    {
      id: 1,
      name: "강남 역삼동 오피스텔",
      price: "3.5억",
      type: "매매",
      date: "2024-03-15",
    },
    {
      id: 2,
      name: "서초동 투룸",
      price: "월 150만원",
      type: "전세",
      date: "2024-03-14",
    },
    {
      id: 3,
      name: "잠실동 아파트",
      price: "6.2억",
      type: "매매",
      date: "2024-03-14",
    },
    {
      id: 4,
      name: "송파동 상가",
      price: "월 300만원",
      type: "임대",
      date: "2024-03-13",
    },
  ];

  // 공지사항 데이터 예시
  const notifications = [
    { id: 1, title: "시스템 점검 안내", type: "공지", date: "2024-03-15" },
    {
      id: 2,
      title: "부동산 중개 수수료 개정 안내",
      type: "중요",
      date: "2024-03-14",
    },
    {
      id: 3,
      title: "신규 기능 업데이트 안내",
      type: "안내",
      date: "2024-03-13",
    },
    {
      id: 4,
      title: "개인정보 처리방침 변경",
      type: "중요",
      date: "2024-03-12",
    },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white w-64 min-h-screen ${sidebarOpen ? "block" : "hidden"} md:block`}
      >
        <div className="p-4">
          <h2 className="text-2xl font-semibold">관리자 패널</h2>
        </div>
        <nav className="mt-4">
          <a
            href="#"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          >
            대시보드
          </a>
          <a
            href="#"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          >
            사용자 관리
          </a>
          <a
            href="#"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          >
            콘텐츠 관리
          </a>
          <a
            href="#"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          >
            설정
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white shadow-md">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              className="md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div className="flex items-center">
              <span className="text-gray-800">관리자님 환영합니다</span>
              <button className="ml-4 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700">
                로그아웃
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <h1 className="text-2xl font-semibold mb-4">대시보드</h1>

          {/* 전체 현황 요약 - 새로운 통계 카드 추가 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-gray-500 text-sm">오늘의 거래 수</h3>
              <p className="text-2xl font-bold">38건</p>
              <p className="text-sm text-green-500">+12% 증가</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-gray-500 text-sm">신규 가입자</h3>
              <p className="text-2xl font-bold">127명</p>
              <p className="text-sm text-green-500">+5% 증가</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-gray-500 text-sm">미처리 문의</h3>
              <p className="text-2xl font-bold">15건</p>
              <p className="text-sm text-red-500">+3건</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-gray-500 text-sm">신규 매물</h3>
              <p className="text-2xl font-bold">56건</p>
              <p className="text-sm text-green-500">+8건</p>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Line Chart */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold mb-4">월별 매출 추이</h2>
              <Line data={lineChartData} options={{ responsive: true }} />
            </div>

            {/* Bar Chart */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold mb-4">일별 방문자 현황</h2>
              <Bar data={barChartData} options={{ responsive: true }} />
            </div>

            {/* Doughnut Chart */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold mb-4">
                서비스 카테고리 분포
              </h2>
              <div className="w-full max-w-[300px] mx-auto">
                <Doughnut
                  data={doughnutChartData}
                  options={{ responsive: true }}
                />
              </div>
            </div>

            {/* Additional Stats or Info */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold mb-4">주요 통계</h2>
              <div className="space-y-4">
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
            </div>
          </div>

          {/* 최근 등록 매물 및 공지사항 섹션 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* 최근 등록 매물 */}
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-lg font-semibold">최근 등록 매물</h2>
                <button className="text-blue-500 hover:text-blue-700">
                  전체보기
                </button>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {recentProperties.map(property => (
                    <div
                      key={property.id}
                      className="flex justify-between items-center border-b pb-2"
                    >
                      <div>
                        <h3 className="font-medium">{property.name}</h3>
                        <p className="text-sm text-gray-500">
                          {property.type} · {property.price}
                        </p>
                      </div>
                      <span className="text-sm text-gray-500">
                        {property.date}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 공지사항 및 알림 */}
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-lg font-semibold">공지사항 및 알림</h2>
                <button className="text-blue-500 hover:text-blue-700">
                  전체보기
                </button>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {notifications.map(notice => (
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
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity Table */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">최근 활동</h2>
            </div>
            <div className="p-4">
              <table className="w-full">
                <thead>
                  <tr className="text-left">
                    <th className="pb-3 text-gray-600">사용자</th>
                    <th className="pb-3 text-gray-600">활동</th>
                    <th className="pb-3 text-gray-600">시간</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="py-3">홍길동</td>
                    <td className="py-3">로그인</td>
                    <td className="py-3">5분 전</td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-3">김철수</td>
                    <td className="py-3">주문 완료</td>
                    <td className="py-3">15분 전</td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-3">이영희</td>
                    <td className="py-3">회원가입</td>
                    <td className="py-3">30분 전</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TestPage;
