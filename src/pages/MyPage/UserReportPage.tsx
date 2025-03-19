import { Pagination, Modal } from "antd";
import { useEffect, useState } from "react";
import { loginApi } from "../../apis/login";
import MyPageLayout from "../../components/layouts/MyPageLayout";
import { Answer, UserReport } from "../../types/TypeBox";
import { Image } from "@chakra-ui/react";

function UserReportPage() {
  const [reportlist, setReportList] = useState<UserReport[]>([]);
  const [qaId, setQaId] = useState<number>(0);
  const [qaDetail, setQaDetail] = useState<UserReport>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [answers, setAnswers] = useState<Answer>();
  const PIC_URL = "https://job-done.r-e.kr:52340";

  const getReportList = async () => {
    try {
      const res = await loginApi.get("/api/qa");
      setReportList(res.data.resultData);
    } catch (error) {
      console.log(error);
    }
  };

  const reportList = async () => {
    try {
      const res = await loginApi.get("/api/qa/qaBoardDetail", {
        params: {
          qaId: qaId,
        },
      });
      setQaDetail(res.data.resultData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAnswers = async () => {
    try {
      const response = await loginApi.get("/api/qa/answer", {
        params: { qaId: qaId },
      });
      setAnswers(response.data.resultData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getReportList();
  }, []);

  useEffect(() => {
    reportList();
    fetchAnswers();
  }, [qaId]);

  const paginatedData = reportlist.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const handlePageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) {
      setPageSize(pageSize);
    }
  };

  const handleReportClick = async (qaId: number) => {
    setQaId(qaId);
    handleOpen();
  };

  return (
    <MyPageLayout>
      <div className="flex flex-col justify-center items-center gap-y-[20px]">
        <span className="flex justify-center items-center text-[24px] font-normal">
          내 신고
        </span>

        <div className="flex flex-col gap-y-[10px] w-full max-w-[800px]">
          {paginatedData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col gap-y-[10px] p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow  hover:cursor-pointer"
              onClick={() => handleReportClick(item.qaId)}
            >
              <div className="flex items-center gap-x-2">
                <span className="text-[16px] font-semibold text-gray-700">
                  신고 날짜 :{" "}
                </span>
                <span className="text-gray-600">
                  {item.createdAt.split(" ")[0]}
                </span>
              </div>
              <div className="flex items-center gap-x-2">
                <span className="text-[16px] font-semibold text-gray-700">
                  신고 유형 :{" "}
                </span>
                <span className="text-gray-600">{item.qaType}</span>
              </div>
              <div className="flex items-center gap-x-2">
                <span className="text-[16px] font-semibold text-gray-700">
                  제목 :{" "}
                </span>
                <span className="text-gray-600">{item.title}</span>
              </div>
            </div>
          ))}
        </div>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={reportlist.length}
          onChange={handlePageChange}
          showSizeChanger
          pageSizeOptions={["5", "10", "20"]}
          style={{ marginTop: "20px" }}
        />
      </div>

      {/* 모달 영역 */}
      <Modal
        title={`문의 상세 - ${qaDetail?.title || ""}`}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <div className="flex flex-col">
          <span className="text-[16px] font-semibold text-gray-700">
            문의 내용 :
          </span>
          <span className="text-gray-600 p-2">{qaDetail?.contents}</span>

          {/* 이미지 갤러리 */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.isArray(qaDetail?.pics) &&
                qaDetail?.pics.map((imgUrl: string, index: number) => (
                  <div
                    key={index}
                    className="aspect-w-1 aspect-h-1 border border-gray-200 rounded-lg p-2"
                  >
                    <Image
                      src={`${PIC_URL}${imgUrl}`}
                      alt={`첨부 이미지 ${index + 1}`}
                      className="w-full h-auto object-contain rounded-lg max-w-[250px]"
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="h-[2px] w-full bg-gray-200 my-4"></div>

        {/* 답변 영역 */}
        <div className="flex flex-col gap-y-4">
          {answers ? (
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-x-2">
                <span className="font-semibold">답변 날짜:</span>
                <span>{answers?.createdAt.split(" ")[0]}</span>
              </div>
              <div className="flex mt-2">
                <span className="font-semibold">답변 : </span>
                <div className="flex ml-2 text-gray-700">{answers?.answer}</div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center p-4 border rounded-lg">
              <p className="mt-1 text-gray-600">아직 답변이 없습니다.</p>
            </div>
          )}
        </div>
      </Modal>
    </MyPageLayout>
  );
}

export default UserReportPage;
