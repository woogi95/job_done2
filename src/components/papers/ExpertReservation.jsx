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
import { useRecoilState } from "recoil";
import { papersState } from "../../atoms/businessAtom";
import { useNavigate } from "react-router-dom";
import { Popup } from "../ui/Popup";
import { loginApi } from "../../apis/login";

const ExpertReservation = ({ setIsReservationPop, serviceId }) => {
  const [papersInfo, setPapersInfo] = useRecoilState(papersState);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("예약취소 요청하였습니다.");
  const [isSuccess, setIsSuccess] = useState(true);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const businessId = Number(localStorage.getItem("businessId"));
  // ---- //

  const completed = papersInfo.completed;

  // 컨펌팝업
  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleConfirmClick = async () => {
    await patchServiceState(5, serviceId, businessId);
    setIsReservationPop(false);
    setIsPopupOpen(false);
    window.location.reload();
  };

  const handleCancelClick = () => {
    setIsPopupOpen(false);
  };

  const patchServiceState = async (completed, serviceId, businessId) => {
    try {
      const res = await loginApi.patch(`/api/service`, {
        completed,
        serviceId,
        businessId,
      });

      if (res.data) {
        setIsSuccess(true);
        setPopupMessage("예약 취소하시겠습니까?");
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
      const res = await loginApi.get(
        `/api/service/detail?serviceId=${serviceId}&businessId=${businessId}`,
      );

      if (res.data && res.data.resultData) {
        setPapersInfo(res.data.resultData);
      }
      setLoading(false);
    } catch (error) {
      console.error("API 호출 중 오류 발생:", error);
      setLoading(false);
    }
  };

  const formatPhoneNumber = phone => {
    if (!phone) return "-";
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  };

  useEffect(() => {
    if (serviceId) {
      setLoading(true);
      getEstimate(serviceId);
    }
  }, [serviceId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!papersInfo) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
  }

  return (
    <PapersDiv>
      <div className="inner">
        <div className="logo"></div>
        <ReservationPaperContDiv>
          <h2 className="tit">
            {papersInfo.userName}님이
            <br />
            <strong>견적·예약 신청</strong>을 하였습니다.
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
                  <span>{papersInfo.startDate}</span>
                </li>
                <li>
                  <p>평수</p>
                  <span>{papersInfo.pyeong} 평</span>
                </li>
                <li>
                  <p>문의사항</p>
                  <span>{papersInfo.comment}</span>
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
                            {option.optionDetailPrice.toLocaleString()} 원
                          </span>
                        </li>
                      ))}
                    </ul>
                  </li>
                )}

                <li style={{ backgroundColor: "#0084ff13" }}>
                  <p>예상비용</p>
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    {papersInfo.price.toLocaleString()} 원
                  </span>
                </li>
              </ul>
            </div>
          </FormDiv>
          <BtnAreaDiv>
            {completed === 0 ? (
              <button
                className="cancel"
                onClick={() => {
                  handleOpenPopup();
                }}
              >
                예약취소
              </button>
            ) : (
              <button className="cancel inactive" disabled>
                예약취소
              </button>
            )}
            {completed === 0 ? (
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
            ) : (
              <button className="okay inactive" disabled>
                견적서작성
              </button>
            )}
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
        onCancel={handleCancelClick}
        title="예약 취소"
        message={popupMessage}
        showCancelButton={isSuccess}
        showConfirmButton={isSuccess}
        onConfirm={handleConfirmClick}
      />
    </PapersDiv>
  );
};

export default ExpertReservation;
