import { Pagination, Select } from "antd";
import { useEffect, useState } from "react";
import { loginApi } from "../../../../apis/login";
import { QaListType } from "../../../../types/WriteQa";
import { Image, useDisclosure } from "@chakra-ui/react";

const UserOneByOne = () => {
  const [isQaId, setIsQaId] = useState<number>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questionList, setQuestionList] = useState<QaListType[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<QaListType | null>(
    null,
  );
  const [currentPageData, setCurrentPageData] = useState<QaListType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [answer, setAnswer] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedState, setSelectedState] = useState<string>("all");

  const PIC_URL = "https://job-done.r-e.kr";

  const getAllQuestion = async () => {
    try {
      const res = await loginApi.get("/api/qa");
      setQuestionList(res.data.resultData);
      setTotalItems(res.data.resultData.length);
      console.log("문의 리스트", res.data.resultData);
    } catch (error) {
      console.log(error);
    }
  };

  const getQaDetail = async () => {
    try {
      const res = await loginApi.get("/api/qa/detail", {
        params: {
          qaId: isQaId,
        },
      });
      setSelectedQuestion(res.data.resultData);
      console.log("문의 상세", res.data.resultData);
    } catch (error) {
      console.log(error);
    }
  };

  const qaAnswer = async (answer: string) => {
    try {
      const res = await loginApi.post("/api/qa/answer", {
        qaId: isQaId,
        answer: answer,
      });

      console.log(answer);
      console.log("답변? : ", res.data.resultData);
      if (res.status === 200) {
        setQuestionList(prevList =>
          prevList.map(item =>
            item.qaId === isQaId ? { ...item, qaState: "00103" } : item,
          ),
        );
        closeModal();
        onOpen();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateCurrentPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const filteredList =
      selectedState === "all"
        ? questionList
        : questionList.filter(item => item.qaState === selectedState);
    setCurrentPageData(filteredList.slice(startIndex, endIndex));
    setTotalItems(filteredList.length);
  };

  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const handleDetail = async (qaId: number) => {
    setIsQaId(qaId);
    await getQaDetail();
    openModal();
  };

  useEffect(() => {
    getAllQuestion();
  }, []);

  useEffect(() => {
    updateCurrentPageData();
  }, [currentPage, pageSize, questionList, selectedState]);

  useEffect(() => {
    if (isQaId) {
      getQaDetail();
    }
  }, [isQaId]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">1:1 문의 관리</h1>

        <div className="flex justify-end mb-2">
          <Select
            defaultValue="all"
            onChange={value => {
              setSelectedState(value);
              setCurrentPage(1);
            }}
            className="w-[90px]"
          >
            <Select.Option value="all">전체</Select.Option>
            <Select.Option value="00101">미답변</Select.Option>
            <Select.Option value="00102">검토중</Select.Option>
            <Select.Option value="00103">답변완료</Select.Option>
          </Select>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* 문의 리스트 헤더 */}
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-100">
            <div className="grid grid-cols-[100px_150px_1fr_1fr_1fr_100px] gap-4 text-sm font-medium text-gray-600">
              <div>번호</div>
              <div>작성일</div>
              <div>작성자</div>
              <div>유저타입</div>
              <div>문의사유</div>
              <div>진행상태</div>
            </div>
          </div>

          {/* 문의 리스트 */}
          <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
            {currentPageData.map((item: QaListType, index: number) => (
              <div
                key={item.qaId}
                className="grid grid-cols-[40px_155px_115px_115px_50px_1fr] gap-11 p-4 text-sm text-gray-600 border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                onClick={() => handleDetail(item.qaId)}
              >
                <div className="flex items-center justify-center">
                  {index + 1}
                </div>
                <div className="flex items-center">
                  {new Date(item.createdAt).toLocaleDateString()}{" "}
                  {new Date(item.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </div>
                <div className="flex items-center">{item.userName}</div>
                <div className="flex items-center">{item.userType}</div>
                <div className="flex items-center">{item.qaType}</div>
                <div className="flex items-center justify-center">
                  <span
                    className={`px-2 py-1 rounded-full ${
                      item.qaState === "00103"
                        ? "bg-green-100 text-green-700"
                        : item.qaState === "00102"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.qaState === "00101" && "미답변"}
                    {item.qaState === "00102" && "검토중"}
                    {item.qaState === "00103" && "답변완료"}
                  </span>
                </div>
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

        {/* 문의 상세 보기 모달 */}
        {isModalOpen && selectedQuestion && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="px-6 py-4">
                <h2 className="text-xl font-bold text-gray-800">
                  문의 상세 보기
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <div className="my-2 text-gray-900 font-bold text-[24px]">
                    {selectedQuestion.title}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    내용
                  </label>
                  <div className="mt-1 text-gray-900 whitespace-pre-line">
                    {selectedQuestion.contents}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    사진
                  </label>
                  <div className="mt-1 text-gray-900">
                    {selectedQuestion.pics.map(
                      (imgUrl: string, index: number) => (
                        <div key={index} className="aspect-w-1 aspect-h-1">
                          <Image
                            src={`${PIC_URL}${imgUrl}`}
                            alt={`첨부 이미지 ${index + 1}`}
                            className="w-full h-auto object-contain rounded-lg max-w-[250px]"
                          />
                        </div>
                      ),
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    답변
                  </label>
                  <textarea
                    className="p-2 block w-full rounded-md border-gray-500 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                    rows={5}
                    onChange={e => setAnswer(e.target.value)}
                    placeholder="답변을 입력해주세요"
                  />
                </div>
              </div>
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end space-x-2">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  닫기
                </button>
                <button
                  className="px-4 py-2 text-sm font-medium text-white bg-sky-500 rounded-md hover:bg-sky-600"
                  onClick={() => qaAnswer(answer)}
                >
                  답변 저장
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 답변완료 보기 모달 */}
        {isModalOpen && selectedQuestion && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="px-6 py-4">
                <h2 className="text-xl font-bold text-gray-800">
                  문의 상세 보기
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <div className="my-2 text-gray-900 font-bold text-[24px]">
                    {selectedQuestion.title}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    내용
                  </label>
                  <div className="mt-1 text-gray-900 whitespace-pre-line">
                    {selectedQuestion.contents}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    사진
                  </label>
                  <div className="mt-1 text-gray-900">
                    {selectedQuestion.pics.map(
                      (imgUrl: string, index: number) => (
                        <div key={index} className="aspect-w-1 aspect-h-1">
                          <Image
                            src={`${PIC_URL}${imgUrl}`}
                            alt={`첨부 이미지 ${index + 1}`}
                            className="w-full h-auto object-contain rounded-lg max-w-[250px]"
                          />
                        </div>
                      ),
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    답변
                  </label>
                  <textarea
                    className="p-2 block w-full rounded-md border-gray-500 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                    rows={5}
                    onChange={e => setAnswer(e.target.value)}
                    placeholder="답변을 입력해주세요"
                  />
                </div>
              </div>
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end space-x-2">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  닫기
                </button>
                <button
                  className="px-4 py-2 text-sm font-medium text-white bg-sky-500 rounded-md hover:bg-sky-600"
                  onClick={() => qaAnswer(answer)}
                >
                  답변 저장
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 답변 완료 모달 */}
        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-lg font-bold">답변 완료</h2>
              <p className="mt-2">답변이 성공적으로 저장되었습니다.</p>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-white bg-sky-500 rounded-md hover:bg-sky-600"
                >
                  확인
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserOneByOne;
