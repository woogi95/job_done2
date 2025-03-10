import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../apis/login";
import { QaListType } from "../../types/WriteQa";

function Forum() {
  const navigate = useNavigate();
  const [qaList, setQaList] = useState<QaListType[]>([]);
  const [isQaId, setIsQaId] = useState<number>();

  const letQaList = async () => {
    try {
      const res = await loginApi.get("/api/qa/qaBoard");
      setQaList(res.data.resultData);
    } catch (error) {
      console.log("API 호출 에러:", error);
      setQaList([]);
    }
  };

  const qaBoardDetail = async (id: number) => {
    try {
      const res = await loginApi.get(`/api/qa/qaBoardDetail`, {
        params: {
          qaId: qaId,
        },
      });
      console.log("게시물 상세 정보:", res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    letQaList();
  }, []);

  useEffect(() => {
    console.log("qaList 업데이트:", qaList);
  }, [qaList]);

  return (
    <div className="flex">
      {/* 왼쪽 배너 */}
      <div className="w-64 bg-gray-100 p-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-2">광고 배너</h3>
          <p className="text-sm text-gray-600">
            <img src={`./images/fastblack2.jpg`} alt="광고 배너" />
          </p>
        </div>
      </div>

      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">커뮤니티 게시판</h1>
          <p className="text-gray-600 mt-2">
            문의사항과 의견을 자유롭게 나눠보세요
          </p>
        </div>

        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            className="px-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => navigate("/forum/write")}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            글쓰기
          </button>
        </div>

        <div className="bg-white rounded-lg shadow">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  번호
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  제목
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  작성자
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  작성일
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  조회
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {qaList.map((post: QaListType, index) => (
                <tr
                  key={post.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => setIsQaId(post.id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {post.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {post.userName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {post.createdAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {post.qaView}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-center">
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"></nav>
        </div>
      </div>

      {/* 오른쪽 배너 */}
      <div className="w-64 bg-gray-100 p-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-2">광고 배너</h3>
          <p className="text-sm text-gray-600">
            <img src={`./images/fastblack2.jpg`} alt="광고 배너" />
          </p>
        </div>
      </div>
    </div>
  );
}

export default Forum;
