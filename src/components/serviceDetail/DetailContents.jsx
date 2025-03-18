import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// scroll
import { Link } from "react-scroll";
// parser
import parse from "html-react-parser";
// comp
import ContPortfolioList from "./ContPortfolioList";
import PfPopup from "./PfPopup";
//styled
import {
  CountStarCustomDiv,
  DContsDiv,
  DetailContentsDiv,
  DetailLayout,
  SummaryDiv,
} from "./serviceDetail";
// icon
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
// recoil
import { useRecoilState, useRecoilValue } from "recoil";
import { loginApi } from "../../apis/login";
import { businessDetailState } from "../../atoms/businessAtom";
import { checkRoom } from "../../atoms/chechroom";
import { likeStatusState } from "../../atoms/like";
import { getCookie } from "../../utils/Cookie";
import { Popup } from "../ui/Popup";

import { useCookies } from "react-cookie";
import { PiSirenFill } from "react-icons/pi";
import BusinessReportPopup from "./BusinessReportPopup";
import ContReview from "./ContReview";

// import { BASE_URL } from "../../constants/constants";

const DetailContents = () => {
  const [isFixed, setIsFixed] = useState(false); //nav 스크롤고정
  // const { id } = useParams();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("about"); //링크 active
  const [isPfDetailPop, setIsPfDetailPop] = useState(false);
  const [selectedPortfolioId, setSelectedPortfolioId] = useState(null);
  const businessDetail = useRecoilValue(businessDetailState);
  const businessId = businessDetail.businessId;

  const [likeStatus, setLikeStatus] = useRecoilState(likeStatusState);
  // 팝업
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupTitle, setPopupTitle] = useState("");
  const [popupLink, setPopupLink] = useState("");
  const [isCheckRoom, setIsCheckRoom] = useRecoilState(checkRoom);
  const [isReportPopupOpen, setIsReportPopupOpen] = useState(false);
  const currentLikeStatus = likeStatus[businessId] || {
    isLiked: false,
  };
  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };
  const handleClickBusiness = async e => {
    e.preventDefault();
    const accessToken = getCookie("accessToken");
    if (!accessToken) {
      setPopupTitle("로그인 필요");
      setPopupMessage("좋아요를 위해 로그인 후 이용해 주세요.");
      setPopupLink("/login");
      setIsPopupOpen(true);
      return;
    }

    try {
      // POST 요청 보내기
      const res = await loginApi.post("/api/like", { businessId });
      const currentLikeStatus = likeStatus[businessId] || { isLiked: false };
      const newLikeStatus = !currentLikeStatus.isLiked;
      // 상태 업데이트
      setLikeStatus(prevState => {
        const updatedState = { ...prevState };
        updatedState[businessId] = { isLiked: newLikeStatus };
        return updatedState;
      });
    } catch (error) {
      console.error(error);
    }
  };

  // 상세설명 사진들
  // const [detailPicList, setDetailPicList] = useState([]);

  // const getDetailPagePic = async businessId => {
  //   try {
  //     // `/api/business/${businessId}?businessId=${businessId}`,
  //     const res = await axios.get(
  //       `/api/business/pic/${businessId}?businessId=${businessId}`,
  //     );
  //     // console.log(res.data.resultData);
  //     setDetailPicList(res.data.resultData);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getDetailPagePic(id);
  // }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 243 && !isFixed) {
        setIsFixed(true);
        // console.log(window.scrollY);
      } else if (scrollY <= 243 && isFixed) {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isFixed]);

  useEffect(() => {
    console.log("businessDetail.contents:", businessDetail.contents);
  }, [businessDetail.contents]);

  const handleLinkClick = id => {
    setActiveLink(id);
  };
  const handleImageClick = portfolioId => {
    // console.log("portfolioId", portfolioId);
    setSelectedPortfolioId(portfolioId);
    setIsPfDetailPop(true);
  };

  const handleReservation = () => {
    const accessToken = getCookie("accessToken");
    // console.log(accessToken);
    if (!accessToken) {
      setPopupTitle("로그인 필요");
      setPopupMessage("예약을 위해 로그인 후 이용해 주세요.");
      setPopupLink("/login");
      setIsPopupOpen(true);
    } else {
      navigate(`/reservation/?businessId=${businessId}`);
    }
  };
  const handleReport = () => {
    const accessToken = getCookie("accessToken");
    if (!accessToken) {
      setPopupTitle("로그인 필요");
      setPopupMessage("로그인 후 이용해 주세요.");
      setPopupLink("/login");
      setIsPopupOpen(true);
    } else {
      setIsReportPopupOpen(true);
    }
  };
  // ---- 채팅 ----

  const [cookies, setCookie, removeCookie] = useCookies(["roomId"]);

  const handleContactUs = async () => {
    try {
      const res = await loginApi.post("/api/room", {
        businessId: businessId,
      });
      const roomId = res.data.resultData;
      setIsCheckRoom(roomId);

      // setCookie 함수 사용
      setCookie("roomId", roomId, {
        path: "/",
        expires: new Date(Date.now() + 6 * 60 * 60 * 1000),
      });

      const accessToken = getCookie("accessToken");
      if (!accessToken) {
        setPopupTitle("로그인 필요");
        setPopupMessage("문의하기를 위해 로그인 후 이용해 주세요.");
        setPopupLink("/login");
        setIsPopupOpen(true);
      } else {
        const width = 500;
        const height = 805;
        const left = (window.screen.width - width) / 2;
        const top = (window.screen.height - height) / 2;

        window.open(
          `/contactus?businessId=${businessId}&roomId=${roomId}`, // URL에 roomId 추가
          "ContactUs",
          `width=${width},height=${height},left=${left},top=${top}`,
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DetailLayout>
      {/* 오른쪽 */}
      <DetailContentsDiv>
        {/* 메뉴 */}
        <nav style={{ position: isFixed ? "fixed" : "static" }}>
          <ul>
            <li>
              <Link
                to="about"
                smooth={true}
                duration={1000}
                offset={-150}
                className={activeLink === "about" ? "active" : ""}
                onClick={() => handleLinkClick("about")}
              >
                업체소개
              </Link>
            </li>
            <li>
              <Link
                to="portfolio"
                smooth={true}
                duration={1000}
                offset={-150}
                className={activeLink === "portfolio" ? "active" : ""}
                onClick={() => handleLinkClick("portfolio")}
              >
                포트폴리오
              </Link>
            </li>
            <li>
              <Link
                to="reviews"
                smooth={true}
                duration={1000}
                offset={-150}
                className={activeLink === "reviews" ? "active" : ""}
                onClick={() => handleLinkClick("reviews")}
              >
                리뷰 {businessDetail.reviewCount}
              </Link>
            </li>
          </ul>
        </nav>

        {/* 컨텐츠 */}
        <DContsDiv>
          <div className="box" id="about">
            <h2>업체소개</h2>
            <p className="title-b">
              {businessDetail.contents ? parse(businessDetail.contents) : ""}
            </p>
            {/* {detailPicList.map((item, index) => (
              <img
                key={businessDetail.businessId}
                src={`${BASE_URL}${detailPicList[index].pic}`}
                alt="상품디테일사진"
              />
            ))} */}
          </div>
          <div className="box" id="portfolio">
            <h2>포트폴리오</h2>
            <ContPortfolioList handleImageClick={handleImageClick} />
          </div>
          <div className="box" id="reviews">
            <h2>리뷰</h2>
            <ContReview />
          </div>
        </DContsDiv>
      </DetailContentsDiv>
      {/* 왼쪽 */}
      <SummaryDiv
        style={{
          position: isFixed ? "fixed" : "absolute",
          top: isFixed ? "180px" : "60px",
        }}
      >
        <div className="inner">
          <div className="top">
            <h2>{businessDetail.businessName}</h2>
            <div className="btn-box">
              <div
                className="like"
                onClick={e => {
                  handleClickBusiness(e);
                }}
              >
                {currentLikeStatus.isLiked ? (
                  <BsHeartFill />
                ) : (
                  <BsHeart style={{ color: "gray" }} />
                )}
              </div>
              <div
                className="siren"
                onClick={() => {
                  console.log("Siren clicked");
                  handleReport();
                }}
              >
                <PiSirenFill />
              </div>
            </div>
          </div>
          <CountStarCustomDiv>
            <FaStar />
            <em>{businessDetail.scoreAvg} </em>
            <span>({businessDetail.reviewCount})</span>
          </CountStarCustomDiv>
          <h3 className="tit">{businessDetail.title}</h3>
          <div className="desc">
            <div className="box">
              <b>Job_Done 횟수</b>
              <div>{businessDetail.serviceCount}회</div>
            </div>
            <div className="box">
              <b>경력</b>
              <div>{businessDetail.years} 년</div>
            </div>
          </div>
          <div className="btn-area">
            <button
              onClick={() => {
                handleReservation();
              }}
            >
              예약하기
            </button>
            <button onClick={handleContactUs}>문의하기</button>
          </div>
        </div>
      </SummaryDiv>
      <PfPopup
        portfolioId={selectedPortfolioId}
        setIsPfDetailPop={setIsPfDetailPop}
        isPfDetailPop={isPfDetailPop}
      />
      <Popup
        isOpen={isPopupOpen}
        onClose={handlePopupClose}
        title={popupTitle}
        message={popupMessage}
        onCancel={handlePopupClose}
        showCancelButton={true}
        showConfirmButton={true}
        confirmLink={popupLink}
      />
      {isReportPopupOpen && (
        <BusinessReportPopup setIsReportPopupOpen={setIsReportPopupOpen} />
      )}
    </DetailLayout>
  );
};

export default DetailContents;
