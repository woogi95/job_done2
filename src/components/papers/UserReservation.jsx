import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginApi } from "../../apis/login";
import { papersState } from "../../atoms/businessAtom";
import {
  BtnAreaDiv,
  FormDiv,
  PapersDiv,
  ReservationPaperContDiv,
} from "./papers";
import { getCookie } from "../../apis/cookie";
import { Popup } from "../ui/Popup";

const UserReservation = () => {
  const navigate = useNavigate();
  const [papers, setPapers] = useRecoilState(papersState);
  const papersInfo = useRecoilValue(papersState);
  const serviceId = getCookie("serviceId");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("예약취소 요청하였습니다.");
  const [isSuccess, setIsSuccess] = useState(true);
  // 컨펌팝업
  const handleOpenPopup = () => {
    setIsPopupOpen(true);
    patchServiceState(3, serviceId);
  };
  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };
  const handleCancelPopup = () => {
    setIsPopupOpen(false);
  };

  const getEstimate = async serviceId => {
    try {
      ///api/service/detail?serviceId=28
      // console.log("이게 찍히니????", serviceId);

      const res = await loginApi.get(
        `/api/service/detail?serviceId=${serviceId}`,
      );
      // console.log("견적서 정보", res);
      if (res.data) {
        setPapers(res.data.resultData);
      }
      // console.log(res.data.DataMessage);
    } catch (error) {
      console.log(error);
    }
  };

  const formatPhoneNumber = phone => {
    if (!phone) return "-";
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  };
  useEffect(() => {
    getEstimate(serviceId);
    // console.log(papers);
  }, [serviceId]);

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

  return (
    <PapersDiv>
      <div className="inner">
        <div className="logo"></div>
        <ReservationPaperContDiv>
          <h2 className="tit">
            {papersInfo?.businessName || "업체이름"} 에서
            <strong>
              &nbsp;견적·예약 신청이
              <br />
            </strong>
            접수되었습니다.
          </h2>
          <span className="description">
            잡던에서 예약 신청해 주셔서 감사 드립니다. <br />
            업체에서 고객님께서 신청하신 예약신청서를 확인후 상세 견적을 내어
            드립니다. <br />
            예약 내역 및 견적 내용은 <em>마이페이지{">"}예약현황</em>에서
            확인하실 수 있습니다.
            <br /> 문의 사항이 있을시, "문의하기"를 통해 연락 주시길 바랍니다.
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
                  <span>{papersInfo.pyeong} 평</span>
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

                <li>
                  <p>예상비용</p>
                  <span>{papersInfo.price.toLocaleString()} 원</span>
                </li>
                <li>
                  <p>문의사항</p>
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
                navigate("/mypage/reservation");
              }}
            >
              예약현황 보기
            </button>
          </BtnAreaDiv>
        </ReservationPaperContDiv>
      </div>
      <Popup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        onCancel={handleCancelPopup}
        title="예약 취소"
        message={popupMessage}
        // showCancelButton={true}
        // cancelLink="/cancel"
        confirmLink="/mypage/reservation"
        showConfirmButton={true}
      />
    </PapersDiv>
  );
};

export default UserReservation;
