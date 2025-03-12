import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// recoil
import { businessDetailState } from "../../atoms/businessAtom";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  PortfolioDetailImgState,
  PortfolioDetailInfoState,
} from "../../atoms/portfolioAtom";
// comp
import { Popup } from "../ui/Popup";
// styled
import { PfLayerDiv, PfModalDiv, PhotoAreaDiv } from "./serviceDetail";
// icon
import { CgClose } from "react-icons/cg";
// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
// img_url
import { BASE_URL } from "../../constants/constants";

const PfPopup = ({
  isPfDetailPop,
  setIsPfDetailPop,
  portfolioId,
  isExpertMode,
  onEditClick,
  onDeleteClick,
  onDeleteComplete,
}) => {
  const [pfDetailImgList, setPfDetailImgList] = useRecoilState(
    PortfolioDetailImgState,
  );
  const [pfDetailInfoList, setPfDetailInfoList] = useRecoilState(
    PortfolioDetailInfoState,
  );

  const businessDetail = useRecoilValue(businessDetailState);
  const businessId = businessDetail.businessId;
  const navigate = useNavigate();
  const [isDeleteComplete, setIsDeleteComplete] = useState(false);

  // 이미지리스트
  const getPfDetailImgList = async portfolioId => {
    if (!portfolioId) return;
    try {
      const res = await axios.get(
        `/api/portfolio/pic/%7BportfolioId%7D?portfolioId=${portfolioId}`,
      );
      setPfDetailImgList(res.data.resultData);
    } catch (error) {
      console.log(error);
    }
  };
  // 정보
  const getPfDetailInfoList = async portfolioId => {
    if (!portfolioId) return;
    try {
      // /api/portfolio/%7BportfolioId%7D?portfolioId=3
      const res = await axios.get(
        `/api/portfolio/%7BportfolioId%7D?portfolioId=${portfolioId}`,
      );
      setPfDetailInfoList(res.data.resultData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (portfolioId) {
      getPfDetailImgList(portfolioId);
      getPfDetailInfoList(portfolioId);
    }
  }, [portfolioId]);

  const handleDelete = async () => {
    try {
      await onDeleteClick();
      setIsPfDetailPop(false);
      onDeleteComplete();
    } catch (error) {
      console.error("삭제 실패:", error);
    }
  };

  return (
    <>
      {isPfDetailPop && (
        <PfModalDiv>
          <PfLayerDiv>
            <PhotoAreaDiv>
              <Swiper
                pagination={true}
                modules={[Pagination]}
                className="pfdetail-img"
              >
                {pfDetailImgList.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={`${BASE_URL}${image.pic}`}
                      alt={`portfolio-image-${index}`}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </PhotoAreaDiv>
            <div className="txt-area">
              <h3>{pfDetailInfoList.title}</h3>
              <ul>
                <li>
                  <b>서비스 종류</b>
                  <p>
                    {pfDetailInfoList.category}/{pfDetailInfoList.detailType}
                  </p>
                </li>
                <li>
                  <b>가격대</b>
                  <p>{pfDetailInfoList.price.toLocaleString()}원대</p>
                </li>
                <li>
                  <b>소요시간</b>
                  <p>{pfDetailInfoList.takingTime}시간</p>
                </li>
              </ul>
              <span>{pfDetailInfoList.contents}</span>
              {isExpertMode ? (
                <div className="btn-area">
                  <button
                    className="edit-btn"
                    onClick={() => {
                      onEditClick();
                      setIsPfDetailPop(false);
                    }}
                  >
                    수정하기
                  </button>
                  <button className="delete-btn" onClick={handleDelete}>
                    삭제하기
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    navigate(`/reservation/?businessId=${businessId}`);
                  }}
                >
                  견적 요청하기
                </button>
              )}
            </div>
            <button
              onClick={() => {
                setIsPfDetailPop(false);
              }}
            >
              <CgClose />
            </button>
          </PfLayerDiv>
        </PfModalDiv>
      )}
      {isDeleteComplete ? (
        <Popup
          isOpen={isDeleteComplete}
          onClose={() => setIsDeleteComplete(false)}
          message="포트폴리오 삭제가 완료되었습니다"
          showConfirmButton={true}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default PfPopup;
