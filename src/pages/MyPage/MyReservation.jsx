import { Pagination, Select } from "antd";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../apis/login";
import MyPageLayout from "../../components/MyPageLayout";
import UserReservation from "../../components/papers/UserReservation";
import { statusText } from "../../components/ServiceIcon";

function MyReservation() {
  const [reservation, setReservation] = useState([]);
  const [resState, setResState] = useState([]);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [rating, setRating] = useState(5);
  const [previewImages, setPreviewImages] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [reviewContent, setReviewContent] = useState("");
  const [qnaModal, setQnaModal] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);
  const [cancelStatus, setCancelStatus] = useState({
    show: false,
    success: false,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();
  const [isReservationDetailOpen, setIsReservationDetailOpen] = useState(false);
  const [reviewCompleteModal, setReviewCompleteModal] = useState({
    show: false,
    success: false,
  });

  const serviceChange = async serviceId => {
    try {
      const res = await loginApi.patch("/api/service", {
        params: {
          completed: 3,
          serviceId: serviceId,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleServiceChange = serviceId => {
    serviceChange(serviceId);
  };

  const handleReviewModalOpen = serviceId => {
    setSelectedServiceId(serviceId);
    setReviewModalOpen(true);
  };

  const handleInquiryModalOpen = serviceId => {
    setSelectedServiceId(serviceId);
    setQnaModal(true);
  };
  const handleInquiryModalClose = () => {
    setQnaModal(false);
  };

  const handleReviewModalClose = () => {
    setReviewModalOpen(false);
  };

  const handleImageUpload = e => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setPreviewImages(prev => [...prev, ...imageUrls]);
    setUploadedFiles(prev => [...prev, ...files]);
    e.target.value = "";
  };

  const handleRemoveImage = index => {
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const reservationData = async () => {
    try {
      const res = await loginApi.get("/api/service", {
        params: {
          status: 3,
          page: 1,
          size: 10,
        },
      });
      setReservation(res.data.resultData);
      setResState(res.data.resultData);
    } catch (error) {
      console.log(error);
    }
  };

  const reviewWrite = async serviceId => {
    try {
      if (!serviceId || !reviewContent.trim()) {
        setReviewCompleteModal({
          show: true,
          success: false,
          message: "서비스 ID와 리뷰 내용은 필수입니다.",
        });
        return;
      }

      const formData = new FormData();

      const reviewData = {
        serviceId: serviceId,
        contents: reviewContent.trim(),
        score: rating,
      };

      formData.append(
        "p",
        new Blob([JSON.stringify(reviewData)], {
          type: "application/json",
        }),
      );

      uploadedFiles.forEach((file, index) => {
        formData.append("pics", file);
      });

      const res = await loginApi.post("/api/review", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        await loginApi.patch("/api/service", {
          completed: 8,
          serviceId: serviceId,
        });

        setReviewCompleteModal({
          show: true,
          success: true,
          message: "리뷰가 성공적으로 등록되었습니다.",
        });
        setReviewContent("");
        setPreviewImages([]);
        setUploadedFiles([]);
        setRating(5);
        handleReviewModalClose();
        handleInquiryModalClose();
        reservationData();
      }
    } catch (error) {
      console.error("리뷰 등록 실패:", error);
      setReviewCompleteModal({
        show: true,
        success: false,
        message: "리뷰 등록에 실패했습니다. 다시 시도해주세요.",
      });
    }
  };

  const handleReservationCancel = async serviceId => {
    try {
      await loginApi.patch(`/api/service`, {
        completed: 3,
        serviceId: serviceId,
      });

      setCancelStatus({ show: true, success: true });
      reservationData();
    } catch (error) {
      console.error("예약 취소 실패:", error);
      setCancelStatus({ show: true, success: false });
    }
  };

  const handleCancelStatusClose = () => {
    setCancelStatus({ show: false, success: false });
  };

  useEffect(() => {
    reservationData();
  }, []);

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return reservation.slice(startIndex, endIndex);
  };

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const handleDetailClick = serviceId => {
    const currentReservation = reservation.find(
      item => item.serviceId === serviceId,
    );
    if (currentReservation) {
      if ([0, 1].includes(currentReservation.completed)) {
        document.cookie = `serviceId=${serviceId}; path=/`;
        navigate(`/UserReservLook/${serviceId}`);
      } else if (currentReservation.completed === 2) {
        document.cookie = `serviceId=${serviceId}; path=/`;
        navigate(`/estimate/${serviceId}`);
      }
    }
  };

  const handleReviewCompleteModalClose = () => {
    setReviewCompleteModal({ show: false, success: false, message: "" });
  };

  return (
    <MyPageLayout>
      <div className="flex flex-col justify-center items-center gap-y-[20px]">
        <span className="flex justify-center items-center text-[24px] font-normal">
          예약현황
        </span>
        <div className="w-full max-w-[800px]">
          {getCurrentPageData().map(item => (
            <div key={item.id} className="mb-[15px]">
              <div className="flex flex-col gap-[10px] px-[55px]">
                <div className="flex justify-between">
                  <span>예약일 : {item.createdAt.split(" ")[0]}</span>
                  <button
                    onClick={() => handleDetailClick(item.serviceId)}
                    className="hover:text-[#3887FF]"
                  >
                    상세보기
                  </button>
                </div>
                <div className="flex">{item.businessName}</div>
                <div className="flex">{item.productName}</div>
                <div className="flex justify-between">
                  <span>{item.price.toLocaleString()}원</span>
                  <span className="text-[#FF3044]">
                    {statusText[item.completed] || "알 수 없음"}
                  </span>
                </div>
                <div className="flex justify-center items-center gap-[15px]">
                  <button
                    disabled={[0, 1, 3, 4, 5, 6, 8].includes(item.completed)}
                    onClick={() => {
                      if (
                        ![0, 1, 3, 4, 5, 6, 8].includes(item.completed) &&
                        [7, 9].includes(item.completed)
                      ) {
                        setSelectedServiceId(item.serviceId);
                        handleReviewModalOpen(item.serviceId);
                      } else if ([0, 1, 6].includes(item.completed)) {
                        handleInquiryModalOpen(item.serviceId);
                      }
                    }}
                    className={`flex justify-center items-center max-w-[340px] w-full h-[40px] rounded-lg border-[#ABABAB] border-[1px]
                      ${
                        [0, 1, 3, 4, 5, 6, 8].includes(item.completed)
                          ? "bg-[#D9D9D9] cursor-not-allowed text-[#C3C3C3]"
                          : "bg-[#3887FF] hover:bg-[#2d6cd9] text-[#FFFFFF]"
                      }`}
                  >
                    {item.completed === 8
                      ? "리뷰작성완료"
                      : [7, 9].includes(item.completed)
                        ? "리뷰쓰기"
                        : "결제하기"}
                  </button>
                  <button
                    disabled={[3, 4, 5].includes(item.completed)}
                    onClick={() => {
                      if ([7, 8, 9].includes(item.completed)) {
                        handleInquiryModalOpen(item.serviceId);
                      } else {
                        handleReservationCancel(item.serviceId);
                      }
                    }}
                    className={`flex justify-center items-center max-w-[340px] w-full h-[40px] text-[#1e1e1e] rounded-lg border-[#ABABAB] border-[1px]
                      ${
                        [3, 4, 5].includes(item.completed)
                          ? "bg-[#D9D9D9] cursor-not-allowed text-[#C3C3C3]"
                          : "bg-[#ffffff]"
                      }`}
                  >
                    {[7, 8, 9].includes(item.completed)
                      ? "문의하기"
                      : "예약취소"}
                  </button>
                </div>
              </div>
              <div className="h-[1px] bg-slate-900 mx-auto my-[20px] w-[85%] flex justify-center items-center"></div>
            </div>
          ))}

          {/* 페이지네이션 */}
          <div className="flex justify-center my-4">
            <Pagination
              current={currentPage}
              total={reservation.length}
              pageSize={itemsPerPage}
              onChange={handlePageChange}
              showSizeChanger={false}
            />
          </div>
        </div>

        {isReservationDetailOpen && (
          <div className="fixed inset-0 z-50">
            <UserReservation />
          </div>
        )}

        {/* 리뷰 모달 */}
        {reviewModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000] overflow-y-auto">
            <div className="flex flex-col justify-center bg-white p-6 rounded-lg w-[500px] my-8">
              <span className="flex justify-center items-center text-[20px]">
                리뷰 작성
              </span>
              <div className="h-[1px] my-[20px] bg-[#DBDBDB] max-w-[300px] w-full mx-auto"></div>
              <div className="flex justify-center items-center">
                <span className="flex justify-center items-center">
                  솔직한 후기를 남겨보세요!
                </span>
              </div>
              <div className="flex justify-center items-center mt-[10px]">
                <div className="flex justify-between items-center gap-2 w-full max-w-[300px]">
                  <Select
                    className="w-[150px]"
                    value={rating}
                    onChange={value => setRating(value)}
                    options={[
                      { value: 1, label: "⭐" },
                      { value: 2, label: "⭐⭐" },
                      { value: 3, label: "⭐⭐⭐" },
                      { value: 4, label: "⭐⭐⭐⭐" },
                      { value: 5, label: "⭐⭐⭐⭐⭐" },
                    ]}
                  />
                  <label className="flex items-center justify-center px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer">
                    이미지 추가
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
              </div>
              <div className="flex justify-center items-center mt-[10px]">
                <textarea
                  placeholder="리뷰를 작성해주세요"
                  value={reviewContent}
                  onChange={e => setReviewContent(e.target.value)}
                  className="flex justify-center items-center w-full max-w-[400px] h-[150px] rounded-[10px] border-[1px] border-[#DBDBDB] p-[10px] resize-none"
                />
              </div>
              <div className="flex justify-center items-center w-full max-w-[420px] min-h-[100px] rounded-[10px] border-[1px] border-[#DBDBDB] p-[10px] mx-auto">
                <div className="flex flex-wrap gap-2 w-full min-h-[100px] border-2 border-dashed border-gray-300 rounded-lg p-2">
                  {previewImages.map((image, index) => (
                    <div key={index} className="relative w-[80px] h-[80px]">
                      <div className="w-full h-full border border-gray-200 rounded-lg overflow-hidden">
                        <img
                          src={image}
                          alt={`preview ${index}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <button
                        onClick={() => handleRemoveImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm"
                      >
                        <RxCross2 className="text-[16px]" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center items-center gap-[10px]">
                <button
                  onClick={() => {
                    reviewWrite(selectedServiceId);
                  }}
                  className="mt-4 px-4 py-2 bg-[#3887FF] rounded text-white gap-[10px]"
                >
                  보내기
                </button>
                <button
                  onClick={handleReviewModalClose}
                  className="mt-4 px-4 py-2 bg-gray-200 rounded"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 문의하기 모달*/}
        {qnaModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg max-w-md w-full mx-4">
              <h2 className="flex justify-center items-center text-xl font-bold mb-4">
                안내
              </h2>
              <p className="text-gray-600 mb-6">
                죄송합니다. 1:1 문의하기 서비스는 현재 준비 중입니다. 빠른 시일
                내에 서비스를 제공해 드리도록 하겠습니다.
              </p>
              <div className="flex justify-center items-center">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                  onClick={handleInquiryModalClose}
                >
                  확인
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 취소 상태 모달 */}
        {cancelStatus.show && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg max-w-md w-full mx-4">
              <h2 className="flex justify-center items-center text-xl font-bold mb-4">
                {cancelStatus.success ? "예약 취소 완료" : "예약 취소 실패"}
              </h2>
              <p className="text-gray-600 mb-6 text-center">
                {cancelStatus.success
                  ? "예약이 성공적으로 취소되었습니다."
                  : "예약 취소 처리 중 오류가 발생했습니다. 다시 시도해 주세요."}
              </p>
              <div className="flex justify-center items-center">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                  onClick={handleCancelStatusClose}
                >
                  확인
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 리뷰 완료 모달 */}
        {reviewCompleteModal.show && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
            <div className="bg-white p-8 rounded-lg max-w-md w-full mx-4">
              <h2 className="flex justify-center items-center text-xl font-bold mb-4">
                {reviewCompleteModal.success
                  ? "리뷰 등록 완료"
                  : "리뷰 등록 실패"}
              </h2>
              <p className="text-gray-600 mb-6 text-center">
                {reviewCompleteModal.message}
              </p>
              <div className="flex justify-center items-center">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                  onClick={handleReviewCompleteModalClose}
                >
                  확인
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MyPageLayout>
  );
}

export default MyReservation;
