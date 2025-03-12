import React, { useEffect, useState } from "react";
import { BtnAreaDiv, ExportFormDiv, PaperContDiv, PapersDiv } from "./papers";
import { useRecoilState, useRecoilValue } from "recoil";
import { papersState } from "../../atoms/businessAtom";
import { getCookie } from "../../apis/cookie";
import { loginApi } from "../../apis/login";
import { Popup } from "../ui/Popup";
import { CgClose } from "react-icons/cg";
import { useNavigate, useParams } from "react-router-dom";

const ExpertEstimate = () => {
  // 컨펌 팝업
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("예약취소 요청하였습니다.");
  // const [serviceId, setServiceId] = useState(null);
  const [papers, setPapers] = useRecoilState(papersState);
  const papersInfo = useRecoilValue(papersState);
  const navigate = useNavigate();
  const { serviceId } = useParams();

  const getEstimate = async serviceId => {
    if (!serviceId) return;
    try {
      // console.log(serviceId);
      const res = await loginApi.get(
        `/api/service/detail?serviceId=${serviceId}`,
      );
      // console.log("견적서 정보", res.data.resultData);
      if (res.data) {
        setPapers(res.data.resultData);
      }
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
    navigate(`/expert/quote-management/quotation-form?serviceId=${serviceId}`);
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
            {papersInfo.userName}님 <strong>견적 내역</strong>
          </h2>

          <ExportFormDiv>
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
          </ExportFormDiv>
          <BtnAreaDiv>
            <button className="cancel" onClick={handleOpenPopup}>
              예약취소
            </button>
            <button className="confirm" onClick={handleClickNewPage}>
              견적수정
            </button>
          </BtnAreaDiv>
          <button
            className="pop-close-btn"
            onClick={() => {
              navigate(`/expert/quote-management`);
            }}
          >
            <CgClose />
          </button>
        </PaperContDiv>
      </div>
      <Popup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        onCancel={handleClosePopup}
        title="예약 취소"
        message={popupMessage}
        showConfirmButton={true}
        onConfirm={handleClosePopup}
      />
    </PapersDiv>
  );
};

export default ExpertEstimate;
