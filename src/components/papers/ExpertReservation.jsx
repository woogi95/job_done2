import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  BtnAreaDiv,
  FormDiv,
  PapersDiv,
  ReservationPaperContDiv,
} from "./papers";
// icon
import { CgClose } from "react-icons/cg";
import { useRecoilState, useRecoilValue } from "recoil";
import { papersState } from "../../atoms/businessAtom";

const ExpertReservation = ({ setIsReservationPop }) => {
  const [papers, setPapers] = useRecoilState(papersState);
  const papersInfo = useRecoilValue(papersState);
  const serviceId = papers.serviceId;
  const getEstimate = async serviceId => {
    try {
      ///api/service/detail?serviceId=28
      const res = await axios.get(`/api/service/detail?serviceId=${serviceId}`);
      // console.log(res.data.resultData);
      setPapers(res.data.resultData);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(papers);
  const formatPhoneNumber = phone => {
    if (!phone) return "-";
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  };

  useEffect(() => {
    getEstimate(serviceId);
  }, [serviceId]);
  // console.log(estimateInfo);
  return (
    <PapersDiv>
      <div className="inner">
        <div className="logo"></div>
        <ReservationPaperContDiv>
          <h2 className="tit">
            {papersInfo.userName}님이
            <strong>
              견적·예약 신청
              <br />
            </strong>
            접수 하였습니다.
          </h2>
          <FormDiv>
            <div className="company-info">
              <h3>예약업체 정보</h3>
              <ul>
                <li>
                  <p>상호명</p>
                  <span>{papersInfo.businessName}</span>
                </li>
                <li>
                  <p>분류</p>
                  <span>
                    {papersInfo.categoryName} {">"} {papersInfo.detailTypeName}
                  </span>
                </li>
                <li>
                  <p>주소</p>
                  <span>{papersInfo.businessAddress}</span>
                </li>
              </ul>
            </div>
            <div className="user-info">
              <h3>예약자 정보</h3>
              <ul>
                <li>
                  <p>예약자</p>
                  <span>{papersInfo.userName}</span>
                </li>
                <li>
                  <p>연락처</p>
                  <span>{formatPhoneNumber(papersInfo.userPhone)}</span>
                </li>
                <li>
                  <p>주소</p>
                  <span>{papersInfo.address}</span>
                </li>
              </ul>
            </div>
            <div className="estimate-info">
              <h3>예약신청 내용</h3>
              <ul>
                <li>
                  <p>신청일</p>
                  <span>{papersInfo.createdAt}</span>
                </li>
                <li>
                  <p>예약방문날짜</p>
                  <span>
                    {papersInfo.startDate} ~ {papersInfo.endDate}
                  </span>
                </li>
                <li>
                  <p>평수</p>
                  <span>{papersInfo.pyeong}</span>
                </li>
                {papersInfo.options && papersInfo.options.length > 0 && (
                  <li className="option">
                    <p>옵션</p>
                    <ul>
                      {papersInfo.options.map((option, index) => (
                        <li key={index}>
                          <p>
                            {option.optionName}{" "}
                            <em>({option.optionDetailName})</em>
                          </p>
                          <span>
                            {option.optionDetailPrice.toLocaleString()}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </li>
                )}

                <li>
                  <p>예상비용</p>
                  <span>{papersInfo.price.toLocaleString()}</span>
                </li>
                <li>
                  <p>문의사항</p>
                  <span>{papersInfo.comment}</span>
                </li>
              </ul>
            </div>
          </FormDiv>
          <BtnAreaDiv>
            <button className="cancel">예약취소</button>
            <button
              className="okay"
              onClick={() => {
                navigate("/expert/quote-management/quotation-form");
              }}
            >
              견적서작성
            </button>
          </BtnAreaDiv>
          <button
            className="pop-close-btn"
            onClick={() => setIsReservationPop(false)}
          >
            <CgClose />
          </button>
        </ReservationPaperContDiv>
      </div>
    </PapersDiv>
  );
};

export default ExpertReservation;
