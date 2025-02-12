import { PfLayerDiv, PfModalDiv, PhotoAreaDiv } from "./serviceDetail";
// icon
import { CgClose } from "react-icons/cg";
// swiper
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  PortfolioDetailImgState,
  PortfolioDetailInfoState,
} from "../../atoms/portfolioAtom";
import { useEffect } from "react";
import { businessDetailState } from "../../atoms/businessAtom";
import { useNavigate } from "react-router-dom";

const PfPopup = ({ isPfDetailPop, setIsPfDetailPop, portfolioId }) => {
  const [pfDetailImgList, setPfDetailImgList] = useRecoilState(
    PortfolioDetailImgState,
  );
  const [pfDetailInfoList, setPfDetailInfoList] = useRecoilState(
    PortfolioDetailInfoState,
  );
  const BASE_URL = "http://112.222.157.156:5224";
  const businessDetail = useRecoilValue(businessDetailState);
  const businessId = businessDetail.businessId;
  const navigate = useNavigate();
  // 이미지리스트
  const getPfDetailImgList = async portfolioId => {
    try {
      const res = await axios.get(
        `/api/portfolio/pic/%7BportfolioId%7D?portfolioId=${portfolioId}`,
      );
      // console.log("깡총", res.data.resultData);
      setPfDetailImgList(res.data.resultData);
    } catch (error) {
      console.log(error);
    }
  };
  // 정보
  const getPfDetailInfoList = async portfolioId => {
    try {
      // /api/portfolio/%7BportfolioId%7D?portfolioId=3
      const res = await axios.get(
        `/api/portfolio/%7BportfolioId%7D?portfolioId=${portfolioId}`,
      );
      // console.log("깡총22", res.data.resultData);
      setPfDetailInfoList(res.data.resultData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPfDetailImgList(portfolioId);
    getPfDetailInfoList(portfolioId);
  }, [portfolioId]);

  return isPfDetailPop ? (
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
          <button
            onClick={() => {
              navigate(`/reservation/?businessId=${businessId}`);
            }}
          >
            견적 요청하기
          </button>
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
  ) : (
    <></>
  );
};

export default PfPopup;
