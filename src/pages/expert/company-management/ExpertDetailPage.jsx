import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// apis
import axios from "axios";
import { useRecoilState } from "recoil";
import { businessDetailState } from "../../../atoms/businessAtom";
// comp

import { PreviewDetailDiv, PreviewDiv } from "./companyManagement";
import {
  DetailTopDiv,
  CountStarDiv,
} from "../../../components/serviceDetail/serviceDetail";

import { FaStar } from "react-icons/fa";

import { useRecoilValue } from "recoil";

import { BASE_URL } from "../../../constants/constants";

import "react-quill/dist/quill.snow.css";

// parser
import parse from "html-react-parser";

function ExpertDetailPage() {
  const { id } = useParams();
  const [setBusinessDetail] = useRecoilState(businessDetailState);
  const businessDetail = useRecoilValue(businessDetailState);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getBusinessDetail(id);
    }
  }, [id]);
  useEffect(() => {}, []);
  if (!businessDetail) {
    return <p>업체 정보를 불러오는 중입니다...</p>;
  }

  const getBusinessDetail = async businessId => {
    try {
      const res = await axios.get(
        `/api/business/${businessId}?businessId=${businessId}`,
      );

      setBusinessDetail(res.data.resultData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PreviewDiv>
      <DetailTopDiv>
        <div className="inner">
          <em>
            카테고리 {">"} {businessDetail.detailTypeName}
          </em>
          <h1>{businessDetail.title}</h1>
          <div className="companyInfo">
            <div className="logo">
              <img src={`${BASE_URL}${businessDetail.logo}`} alt="로고" />
            </div>
            <div className="txt">
              <h3>
                {businessDetail.businessName}
                <em>
                  {businessDetail.openingTime} - {businessDetail.closingTime}
                </em>
              </h3>
              <strong>
                <b>안심번호</b>
                {businessDetail.safeTel}
                {/* <b>안심번호</b>053-0000-0000 */}
              </strong>
              <b>{businessDetail.address}</b>
            </div>
          </div>
          <div className="desc">
            <div className="box">
              <b>Job_Done 횟수</b>
              <div>{businessDetail.serviceCount}회</div>
            </div>
            <div className="box">
              <b>리뷰</b>
              <CountStarDiv>
                <FaStar />
                <em>{businessDetail.scoreAvg}</em>
                <span>({businessDetail.reviewCount})</span>
              </CountStarDiv>
            </div>
            <div className="box">
              <b>경력</b>
              <div>{businessDetail.years}</div>
            </div>
          </div>
        </div>
      </DetailTopDiv>
      <PreviewDetailDiv>
        <div className="box">
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
      </PreviewDetailDiv>
      <div className="btn-area">
        <div>
          <button
            type="button"
            className="edit-btn"
            onClick={() => navigate("/expert/company-management/editdetail")}
          >
            수정하기
          </button>
          {/* <button
            type="button"
            className="close-btn"
            onClick={() => navigate("/expert/company-management")}
          >
            닫기
          </button> */}
        </div>
      </div>
    </PreviewDiv>
  );
}

export default ExpertDetailPage;
