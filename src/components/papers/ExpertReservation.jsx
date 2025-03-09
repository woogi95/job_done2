import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { Popup } from "../ui/Popup";
import { loginApi } from "../../apis/login";

const ExpertReservation = ({ setIsReservationPop, serviceId }) => {
  const [papersInfo, setPapersInfo] = useRecoilState(papersState);
  // const papersInfo = useRecoilValue(papersState);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("예약취소 요청하였습니다.");
  const [isSuccess, setIsSuccess] = useState(true);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const navigate = useNavigate(); // useNavigate 훅 사용

  // 컨펌팝업
  const handleOpenPopup = () => {
    patchServiceState(4, serviceId);
    setIsPopupOpen(true);
  };
  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };
  const handleCancelPopup = () => {
    setIsPopupOpen(false);
  };

  const patchServiceState = async (completed, serviceId) => {
    try {
      // console.log(completed, serviceId);
      const res = await loginApi.patch(`/api/service`, {
        completed,
        serviceId,
      });
      // console.log(res.data.resultData);

      if (res.data) {
        setIsSuccess(true);
        setPopupMessage("예약취소 요청하였습니다.");
        setIsPopupOpen(false);
      } else {
        setIsSuccess(false);
        setPopupMessage(
          "예약취소 요청에 실패하셨습니다. 잠시후 다시 시도해주세요.",
        );
      }
    } catch (error) {
      console.log(error);
      setIsSuccess(false);
      setPopupMessage(
        "예약취소 요청에 실패하셨습니다. 잠시후 다시 시도해주세요.",
      );
    }
  };

  const getEstimate = async serviceId => {
    try {
      const res = await axios.get(`/api/service/detail?serviceId=${serviceId}`);
      console.log("API 응답 데이터:", res.data); // API 응답 데이터 로그
      if (res.data && res.data.resultData) {
        setPapersInfo(res.data.resultData); // papersInfo 상태 업데이트
        console.log("papersInfo 상태 업데이트:", res.data.resultData); // papersInfo 상태 로그
      } else {
        console.error("API 응답 데이터가 올바르지 않습니다:", res.data);
      }
      setLoading(false); // 데이터 로딩 완료
    } catch (error) {
      console.error("API 호출 중 오류 발생:", error);
      setLoading(false); // 에러 발생 시 로딩 종료
    }
  };

  const formatPhoneNumber = phone => {
    if (!phone) return "-";
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  };

  useEffect(() => {
    if (serviceId) {
      setLoading(true); // 데이터 로딩 시작
      getEstimate(serviceId);
    }
  }, [serviceId]);

  // papersInfo 상태 로그
  console.log("papersInfo 상태:", papersInfo);

  if (loading) {
    return <div>Loading...</div>; // 로딩 중일 때 표시
  }

  if (!papersInfo) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>; // 데이터가 없을 때 표시
  }

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
                  <p>문이사항</p>
                  <span>{papersInfo.comment}</span>
                </li>
              </ul>
            </div>
          </FormDiv>
          <BtnAreaDiv>
            <button
              className="cancel"
              onClick={() => {
                handleOpenPopup();
              }}
            >
              예약취소
            </button>
            <button
              className="okay"
              onClick={() => {
                patchServiceState(1, serviceId);
                navigate(
                  `/expert/quote-management/quotation-form?serviceId=${serviceId}`,
                );
              }}
            >
              견적서작성
            </button>
          </BtnAreaDiv>
          <button
            className="pop-close-btn"
            onClick={() => {
              setIsReservationPop(false);
            }}
          >
            <CgClose />
          </button>
        </ReservationPaperContDiv>
      </div>
      <Popup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        onCancel={handleCancelPopup}
        title="예약 취소"
        message={popupMessage}
        showConfirmButton={true}
        onConfirm={handleClosePopup}
      />
    </PapersDiv>
  );
};

export default ExpertReservation;
