import React, { useEffect, useState } from "react";
import { BtnAreaDiv, FormDiv, PaperContDiv, PapersDiv } from "./papers";
import { useRecoilState, useRecoilValue } from "recoil";
import { papersState } from "../../atoms/businessAtom";
import { getCookie } from "../../apis/cookie";
import { loginApi } from "../../apis/login";
import { Popup } from "../ui/Popup";
import LoadingPopup from "../LoadingPopup";
import { useNavigate } from "react-router-dom";

const Estimate = () => {
  // 컨펌 팝업
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("예약취소 요청하였습니다.");
  const [isLoading, setIsLoading] = useState(false);
  const [serviceId, setServiceId] = useState(null);
  const [papers, setPapers] = useRecoilState(papersState);
  const papersInfo = useRecoilValue(papersState);
  const navigate = useNavigate();
  const getEstimate = async serviceId => {
    if (!serviceId) return;
    try {
      // console.log("이게 찍히니????", serviceId);
      const res = await loginApi.get(
        `/api/service/detail?serviceId=${serviceId}`,
      );
      // console.log("견적서 정보", res.data.resultData);
      if (res.data) {
        setPapers(res.data.resultData);
      }
      // console.log(res.data.DataMessage);
    } catch (error) {
      console.error("견적서 조회 중 오류 발생:", error);
    }
  };

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
    patchServiceState(3, serviceId);
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
  const handleClosePopup = () => setIsPopupOpen(false);
  const handleCancelPopup = () => setIsPopupOpen(false);

  const formatPhoneNumber = phone =>
    phone ? phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3") : "-";
  const formatBusinessNumber = number =>
    number
      ? number.replace(/(\d{3})(\d{2})(\d{4})/, "$1-$2-$3")
      : "사업자 번호 없음";

  const handleClickNewPage = async () => {
    if (!serviceId) {
      console.error("serviceId가 없습니다.");
      return;
    }
    setIsLoading(true);
    // console.log("결제 누구야!", serviceId);
    try {
      const width = 480;
      const height = 600;
      const left = (window.innerWidth - width) / 2;
      const top = (window.innerHeight - height) / 2;

      const res = await loginApi.post(
        `/api/payment/ready?serviceId=${serviceId}`,
      );
      if (res.data?.next_redirect_pc_url) {
        const paymentWindow = window.open(
          res.data.next_redirect_pc_url,
          "_blank",
          `width=${width},height=${height},left=${left},top=${top}`,
        );

        const checkWindowClosed = setInterval(() => {
          if (paymentWindow.closed) {
            setIsLoading(false);
            clearInterval(checkWindowClosed);
            navigate("/mypage/usage");
          }
        }, 1000);
      }
    } catch (error) {
      console.error("결제 준비 중 오류 발생:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const storedServiceId = getCookie("serviceId");
    if (storedServiceId) {
      setServiceId(storedServiceId);
    }
  }, []);

  useEffect(() => {
    if (serviceId) {
      getEstimate(serviceId);
    }
  }, [serviceId]);

  return (
    <PapersDiv>
      <div className="inner">
        <div className="logo"></div>
        <PaperContDiv>
          <h2 className="tit">
            요청하신
            <strong>
              견적서가
              <br /> 완료
            </strong>
            되었습니다.
          </h2>
          <span className="description">
            기다려 주셔서 감사합니다. <br />
            예약 내역 및 견적 내용은 <em>마이페이지{">"}예약현황</em>에서
            확인하실 수 있습니다.
            <br /> 수정사항이나 문의 사항이 있으시면, "문의하기"를 통해 연락
            주시기 바랍니다.
            <br />
            <b>
              견적서를 받은 후 결제가 지연될 경우, 해당 견적은 취소될 수
              있습니다.
            </b>
          </span>
          <FormDiv>
            <div className="company-info">
              <h3>예약업체 정보</h3>
              <ul>
                <li>
                  <p>등록번호</p>
                  <span>{formatBusinessNumber(papersInfo.businessNum)}</span>
                </li>
                <li>
                  <p>업체번호</p>
                  <span>{formatPhoneNumber(papersInfo.businessPhone)}</span>
                </li>
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
              <h3>견적 내용</h3>
              <ul>
                <li>
                  <p>견적일</p>
                  <span>{papersInfo.updatedAt}</span>
                </li>
                <li>
                  <p>방문날짜</p>
                  <span>
                    {papersInfo.startDate} ~ {papersInfo.endDate}
                  </span>
                </li>
                <li>
                  <p>예정시간</p>
                  <span>
                    {papersInfo.mstartTime} - {papersInfo.mendTime}
                  </span>
                </li>
                <li>
                  <p>평수</p>
                  <span>{papersInfo.pyeong} 평</span>
                </li>
                {papersInfo.options?.length > 0 && (
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
                            {option.optionDetailPrice.toLocaleString()}원
                          </span>
                        </li>
                      ))}
                    </ul>
                  </li>
                )}
                {papersInfo.etc?.length > 0 && (
                  <li className="option">
                    <p>추가옵션</p>
                    <ul>
                      {papersInfo.etc.map((option, index) => (
                        <li key={index}>
                          <p>
                            {option.etcComment}
                            {/* <em>({option.etcPrice})</em> */}
                          </p>
                          <span>{option.etcPrice.toLocaleString()}원</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                )}
                {/* "etc": [
      {
        "etcId": 0,
        "etcPrice": 0,
        "etcComment": "string"
      }
    ], */}
                <li>
                  <p>견적비용</p>
                  <span>{papersInfo.price.toLocaleString()}원</span>
                </li>
                <li>
                  <p>특이사항</p>
                  <span>{papersInfo.addComment}</span>
                </li>
              </ul>
            </div>
          </FormDiv>
          <BtnAreaDiv>
            <button className="cancel" onClick={handleOpenPopup}>
              예약취소
            </button>
            <button className="confirm" onClick={handleClickNewPage}>
              결제하기
            </button>
          </BtnAreaDiv>
        </PaperContDiv>
      </div>
      <Popup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        onCancel={handleCancelPopup}
        title="예약 취소"
        message={popupMessage}
        confirmLink="/mypage/reservation"
        showConfirmButton
      />
      {isLoading && <LoadingPopup />}
    </PapersDiv>
  );
};

export default Estimate;
