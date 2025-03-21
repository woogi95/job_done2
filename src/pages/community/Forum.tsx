import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QaListType } from "../../types/WriteQa";
import { Pagination, Modal } from "antd";
import { loginApi } from "../../apis/login";
import { Cookies } from "react-cookie";

function Forum() {
  const navigate = useNavigate();

  const [isQaId, setIsQaId] = useState<number>();
  const [allQaList, setAllQaList] = useState<QaListType[]>([]);
  const [currentPageData, setCurrentPageData] = useState<QaListType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const cookies = new Cookies();

  const letQaList = async () => {
    try {
      const res = await loginApi.get("/api/qa/qaBoard");
      setAllQaList(res.data.resultData);
      setTotalItems(res.data.resultData.length);
      updateCurrentPageData();
    } catch (error) {
      console.log("API 호출 에러:", error);
      setAllQaList([]);
      setTotalItems(0);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredQaList = allQaList.filter(
    post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.userName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const updateCurrentPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setCurrentPageData(filteredQaList.slice(startIndex, endIndex));
    setTotalItems(filteredQaList.length);
  };

  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const qaBoardDetail = async () => {
    try {
      const res = await loginApi.get(`/api/qa/qaBoardDetail`, {
        params: {
          qaId: isQaId,
        },
      });
      if (res.status === 200) {
        navigate(`/forum/detail/${isQaId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDetail = (qaId: number) => {
    setIsQaId(qaId);
  };

  const handleWriteClick = () => {
    const accessToken = cookies.get("accessToken");
    if (!accessToken) {
      setIsModalVisible(true);
    } else {
      navigate("/forum/write");
    }
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
    navigate("/login");
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (isQaId) {
      qaBoardDetail();
    }
  }, [isQaId]);

  useEffect(() => {
    letQaList();
  }, []);

  useEffect(() => {
    updateCurrentPageData();
  }, [currentPage, pageSize, allQaList]);

  return (
    <div className="flex-1 container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">커뮤니티 게시판</h1>
        <p className="text-gray-600 mt-2">
          문의사항과 의견을 자유롭게 나눠보세요
        </p>
      </div>

      <div className="flex gap-8">
        <div className="flex-1">
          <div className="flex justify-between mb-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="검색어를 입력하세요"
                className="px-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={handleSearch}
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    updateCurrentPageData();
                  }
                }}
              />
              <button
                onClick={() => updateCurrentPageData()}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                검색
              </button>
            </div>
            <button
              onClick={handleWriteClick}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              글쓰기
            </button>
          </div>

          <div className="flex flex-col bg-white rounded-lg shadow">
            <div className="grid grid-cols-[40px_1fr_130px_110px_100px_50px] gap-4 px-6 py-3 border-b">
              <div className="text-[14px] font-medium text-gray-500">번호</div>
              <div className="text-[14px] font-medium text-gray-500">제목</div>
              <div className="text-[14px] font-medium text-gray-500">분류</div>
              <div className="text-[14px] font-medium text-gray-500">
                작성자
              </div>
              <div className="text-[14px] font-medium text-gray-500">
                작성일
              </div>
              <div className="text-[14px] font-medium text-gray-500">조회</div>
            </div>
            <div className="flex flex-col">
              {currentPageData.map((post: QaListType, index) => (
                <div
                  key={post.qaId}
                  className="grid grid-cols-[40px_1fr_180px_100px_120px_40px] gap-4 items-center hover:bg-gray-50 cursor-pointer px-6 py-2"
                  onClick={() => {
                    handleDetail(post.qaId);
                  }}
                >
                  <div className="pl-2 text-sm text-gray-500">
                    {(currentPage - 1) * pageSize + index + 1}
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {post.title}
                  </div>
                  <div>{post.reason}</div>
                  <div className="text-sm text-gray-500">{post.userName}</div>
                  <div className="text-sm text-gray-500">{post.createdAt}</div>
                  <div className="text-sm text-gray-500">{post.qaView}</div>
                </div>
              ))}
            </div>
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
        </div>

        {/* 오른쪽 배너 */}
        <div className="w-[250px] p-2">
          <div className="bg-white p-3 rounded-lg shadow">
            <p className="text-gray-600">
              <img src={`./images/fastblack2.jpg`} alt="광고 배너" />
            </p>
          </div>
        </div>
      </div>

      <Modal
        title="로그인 필요합니다."
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="로그인"
        cancelText="취소"
      >
        <p>로그인이 필요합니다. 이동하시겠습니까?</p>
      </Modal>
    </div>
  );
}

export default Forum;
