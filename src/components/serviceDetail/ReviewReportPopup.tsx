import { useEffect, useState } from "react";
import { ReportReviewPopupDiv } from "./serviceDetail";
import { RxCross1 } from "react-icons/rx";
import { BsCheckCircleFill, BsCircle } from "react-icons/bs";
import { loginApi } from "../../apis/login";
import PopupT from "../ui/PopupT";
import { useRecoilValue } from "recoil";
import { ReviewListState, reviewListStateT } from "../../atoms/reviewAtomT";

interface SirenType {
  qaTypeDetailId: number;
  qaDetailReason: string;
}

interface ReviewReportPopupProps {
  setIsReportPopupOpen: (isOpen: boolean) => void;
  reviewId: number | null;
}

const ReviewReportPopup: React.FC<ReviewReportPopupProps> = ({
  setIsReportPopupOpen,
  reviewId,
}) => {
  const [sirenTypelist, setSirenTypelist] = useState<SirenType[]>([]);
  // ------
  const [qaTypeDetailId, setQaTypeDetailId] = useState<number>(0);
  const [content, setContent] = useState<string>("");
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);

  // reviewId 가져오기

  const reviewIdFromRecoil = useRecoilValue<ReviewListState[]>(
    reviewListStateT,
  ).find(review => review.reviewId === reviewId)?.reviewId;

  console.log("리뷰 아이디:", reviewIdFromRecoil);
  const getSirenTypelist = async () => {
    try {
      const res = await loginApi.get(`/api/qa/qaTypeId?qaTypeId=2`);
      setSirenTypelist(res.data.resultData);
    } catch (error) {
      console.error("신고 유형 목록 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    getSirenTypelist();
  }, []);

  const handleClose = () => {
    setIsReportPopupOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      const requestData = {
        qaTypeDetailId,
        contents: content,
        qaReportReason: "REVIEW",
        qaTargetId: reviewId,
      };

      formData.append(
        "p",
        new Blob([JSON.stringify(requestData)], {
          type: "application/json",
        }),
      );

      const res = await loginApi.post("/api/qa", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.resultData) {
        setIsSuccessPopupOpen(true);
      } else {
        setIsReportPopupOpen(false);
      }
    } catch (error) {
      console.error("리뷰신고 실패:", error);
    }
  };

  return (
    <ReportReviewPopupDiv>
      <div className="layer">
        <form onSubmit={handleSubmit}>
          <h1>리뷰 신고</h1>
          <div className="report-list">
            {sirenTypelist.map(item => (
              <div key={item.qaTypeDetailId}>
                <input
                  type="radio"
                  name="qaTypeDetailId"
                  id={`${item.qaTypeDetailId}`}
                  value={item.qaTypeDetailId}
                  onChange={() => setQaTypeDetailId(item.qaTypeDetailId)}
                />
                <label htmlFor={`${item.qaTypeDetailId}`}>
                  {qaTypeDetailId === item.qaTypeDetailId ? (
                    <BsCheckCircleFill />
                  ) : (
                    <BsCircle style={{ color: "#ccc" }} />
                  )}
                  {item.qaDetailReason}
                </label>
              </div>
            ))}
          </div>
          <div className="text-box">
            <textarea
              placeholder="상세 신고사유 입력해주세요."
              value={content}
              onChange={e => setContent(e.target.value)}
              maxLength={1000}
            />
          </div>

          <button type="submit" className="report-btn">
            신고하기
          </button>
          <div
            className="close-btn"
            onClick={() => {
              handleClose();
            }}
          >
            <RxCross1 />
          </div>
        </form>
      </div>
      <PopupT
        isOpen={isSuccessPopupOpen}
        message="리뷰신고가 완료되었습니다."
        showConfirmButton={true}
        handleConfirmClick={() => {
          setIsSuccessPopupOpen(false);
          setIsReportPopupOpen(false);
        }}
      />
    </ReportReviewPopupDiv>
  );
};

export default ReviewReportPopup;
