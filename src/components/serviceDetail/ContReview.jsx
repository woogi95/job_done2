import { useEffect, useState } from "react";
import { reviewListState } from "../../atoms/reviewAtom";
import { reviewListStateT } from "../../atoms/reviewAtomT";
import {
  PreviewImgDiv,
  ReviewDiv,
  ReviewFilterDiv,
  StarTotalDiv,
} from "./serviceDetail";
import { useRecoilState, useRecoilValue } from "recoil";
import { businessDetailState } from "../../atoms/businessAtom";
import { FaStar, FaStarHalf } from "react-icons/fa";
import axios from "axios";

// parser
import parse from "html-react-parser";
import { IoIosArrowDown } from "react-icons/io";
import { BASE_URL } from "../../constants/constants";
import ReviewReportPopup from "./ReviewReportPopup";
import { Popup } from "../ui/Popup";
import { getCookie } from "../../utils/Cookie";

const ContReview = () => {
  const [reviewList, setReviewList] = useRecoilState(reviewListState);
  const [reviewListT, setReviewListT] = useRecoilState(reviewListStateT);
  const businessDetail = useRecoilValue(businessDetailState);
  const options = ["최신순", "높은별점순", "낮은별점순"];
  const [optionOpen, setOptionOpen] = useState(false);
  const [status, setStatus] = useState(0); // 리뷰 정렬 상태
  const [selectedOption, setSelectedOption] = useState("최신순");
  const businessId = businessDetail.businessId;
  const page = 1;
  const size = 10;

  // 모달 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열기/닫기 상태
  const [selectedImage, setSelectedImage] = useState(null); // 선택된 이미지
  const [isReportPopupOpen, setIsReportPopupOpen] = useState(false);
  //팝업
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupTitle, setPopupTitle] = useState("");
  const [popupLink, setPopupLink] = useState("");
  const [selectedReviewId, setSelectedReviewId] = useState(null);

  // 정렬 방식에 따른 API 호출
  const handleSortTypeClick = (businessId, option, state) => {
    console.log("businessId, status!!!", businessId, option, state);
    setOptionOpen(!optionOpen);
    setStatus(option);
    setSelectedOption(option);
    getReviewList(businessId, state);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    console.log("reviewListT 맞음?", reviewListT);
  }, [reviewListT]);

  // 리뷰 목록 가져오기
  const getReviewList = async (businessId, state) => {
    try {
      const res = await axios.get(
        `/api/review?businessId=${businessId}&state=${state}&page=${page}&size=${size}`,
      );
      setReviewList(res.data.resultData);
      setReviewListT(res.data.resultData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReviewList(businessId, status);
  }, [businessId, status]);

  // 별점 렌더링
  const renderStars = score => {
    if (score === 0) {
      return (
        <>
          {Array.from({ length: 5 }, (_, i) => (
            <FaStar key={`empty-${i}`} color="#E0E2E7" />
          ))}
        </>
      );
    }

    const fullStars = Math.floor(score); // 채워진 별 개수
    const halfStar = score % 1 >= 0.5; // 반쪽 별 여부
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // 비어 있는 별 개수

    return (
      <>
        {Array.from({ length: fullStars }, (_, i) => (
          <FaStar key={`full-${i}`} color="#EAB838" />
        ))}
        {halfStar && <FaStarHalf key="half" color="#EAB838" />}
        {Array.from({ length: emptyStars }, (_, i) => (
          <FaStar key={`empty-${i}`} color="#E0E2E7" />
        ))}
      </>
    );
  };

  // 이미지 클릭 시 모달 열기
  const handleImageClick = image => {
    setSelectedImage(image); // 클릭한 이미지 저장
    setIsModalOpen(true); // 모달 열기
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false); // 모달 닫기
    setSelectedImage(null); // 선택된 이미지 초기화
  };

  const handleReport = reviewId => {
    const accessToken = getCookie("accessToken");
    if (!accessToken) {
      setPopupTitle("로그인 필요");
      setPopupMessage("로그인 후 이용해 주세요.");
      setPopupLink("/login");
      setIsPopupOpen(true);
    } else {
      setIsReportPopupOpen(true);
      setSelectedReviewId(reviewId);
    }
  };

  return (
    <>
      <StarTotalDiv>
        <h4>{businessDetail.businessName}</h4>
        <div className="star-container">
          <p className="star-bg">
            {Array.from({ length: 5 }, (_, index) => (
              <FaStar key={index} color="#E0E2E7" />
            ))}
          </p>
          <p className="star">
            {" "}
            {renderStars(reviewList[0]?.averageScore || 0)}
          </p>

          <span className="star-grade">
            {(reviewList[0]?.averageScore || 0).toFixed(1)}
          </span>
        </div>
      </StarTotalDiv>
      <ReviewDiv>
        <div className="rv-top">
          <h3>서비스 리뷰 {businessDetail.reviewCount}</h3>
          <ReviewFilterDiv>
            <div className="select" onClick={() => setOptionOpen(!optionOpen)}>
              <p>{selectedOption}</p>
              <IoIosArrowDown />
            </div>
            {optionOpen && (
              <div className="options">
                {options.map((item, index) => (
                  <div
                    key={item}
                    onClick={() =>
                      handleSortTypeClick(
                        businessDetail.businessId,
                        item,
                        index,
                      )
                    }
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </ReviewFilterDiv>
        </div>
        <div className="rv-list">
          {reviewList?.map((item, index) => (
            <div className="rv-item" key={index}>
              {/* 유저리뷰 */}
              <div className="user-rv">
                <div className="user-info-box">
                  <div className="user-info">
                    <div
                      className="user-photo"
                      style={{ display: item.writerPic ? "block" : "none" }}
                    >
                      {item.writerPic ? (
                        <img
                          src={`${BASE_URL}${item.writerPic}`}
                          alt={item.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: "50px",
                            height: "50px",
                            backgroundColor: "#34c5f0",
                            borderRadius: "100%",
                          }}
                        />
                      )}
                    </div>
                    <div className="desc">
                      <div>
                        {renderStars(item.score)}
                        <span className="star-grade">
                          {item.score.toFixed(1)}
                        </span>
                        <b>{item.createdAt.slice(0, 10)}</b>
                      </div>
                      <h4>{item.name.slice(0, 1)}**</h4>
                    </div>
                  </div>
                  <div className="siren">
                    <button
                      onClick={() => {
                        console.log("Siren clicked");
                        handleReport(item.reviewId);
                      }}
                    >
                      신고하기
                    </button>
                  </div>
                </div>

                <div className="comment">
                  <span>{item.contents}</span>
                  <div className="photo">
                    {item.pics &&
                      item.pics.length > 0 &&
                      item.pics
                        .filter(
                          pic =>
                            typeof pic === "string" &&
                            pic.match(/\.(jpg|jpeg|png|gif)$/i),
                        )
                        .slice(0, 2)
                        .map((pic, index) => (
                          <div
                            key={index}
                            onClick={() => handleImageClick(pic)}
                          >
                            <img src={`${BASE_URL}${pic}`} alt="review-img" />
                          </div>
                        ))}
                  </div>
                </div>
              </div>
              {/* 사장님댓글 */}
              <div
                className="reply"
                style={{ background: item.comment ? "" : "#fff" }}
              >
                <div className="info">
                  <div className="logo-container">
                    {/* 로고 */}
                    {item.comment && item.comment.logo ? (
                      <img
                        src={`${BASE_URL}${item.comment.logo}`}
                        alt="logo"
                        className="logo"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  {/* 업체이름 , 작성일 */}
                  {item.comment && item.comment.name ? (
                    <h4>{item.comment.name}</h4>
                  ) : (
                    ""
                  )}
                  <b>
                    {item.comment ? item.comment.createdAt.slice(0, 10) : ""}
                  </b>
                </div>
                <div className="comment">
                  {/* 업체 댓글 내용 */}
                  <span>
                    {item.comment ? parse(item.comment.contents) : <></>}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ReviewDiv>
      <Popup
        isOpen={isPopupOpen}
        onClose={handlePopupClose}
        title={popupTitle}
        message={popupMessage}
        onCancel={handlePopupClose}
        confirmLink={popupLink}
        showCancelButton={true}
        showConfirmButton={true}
      />
      {/* 이미지 팝업 */}
      {isModalOpen && (
        <PreviewImgDiv onClick={closeModal}>
          <div className="layer">
            <div className="img-box">
              <img src={`${BASE_URL}${selectedImage}`} alt="review-img" />
            </div>
            <button onClick={closeModal}>닫기</button>
          </div>
        </PreviewImgDiv>
      )}
      {/* 리뷰 신고 모달 */}
      {isReportPopupOpen && (
        <ReviewReportPopup
          setIsReportPopupOpen={setIsReportPopupOpen}
          reviewId={selectedReviewId}
        />
      )}
    </>
  );
};

export default ContReview;
