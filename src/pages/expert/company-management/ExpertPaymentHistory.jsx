import React from "react";

import { useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginApi } from "../../../apis/login";
import { papersState } from "../../../atoms/businessAtom";
import {
  BtnAreaDiv,
  FormDiv,
  PaperContDiv,
  PapersDiv,
} from "../../../components/papers/papers";

const ExpertPaymentHistory = () => {
  // const [serviceId, setServiceId] = useState(null);
  const papersInfo = useRecoilValue(papersState);
  const [papers, setPapers] = useRecoilState(papersState);
  const navigate = useNavigate();
  const businessId = Number(localStorage.getItem("businessId"));
  const { serviceId } = useParams();

  useEffect(() => {
    if (serviceId) {
      getEstimate(serviceId);
    }
  }, [serviceId]);
  const getEstimate = async serviceId => {
    if (!serviceId) return;
    try {
      const res = await loginApi.get(
        `/api/service/detail?serviceId=${serviceId}&businessId=${businessId}`,
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

  const formatPhoneNumber = phone =>
    phone ? phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3") : "-";
  const formatBusinessNumber = number =>
    number
      ? number.replace(/(\d{3})(\d{2})(\d{4})/, "$1-$2-$3")
      : "사업자 번호 없음";

  const handleConfirm = () => {
    navigate("/expert/payment-management");
  };

  return (
    <PapersDiv>
      <div className="inner">
        <div className="logo"></div>
        <PaperContDiv>
          <h2 className="tit">
            {papersInfo.userName}님의
            <strong className="!text-[#FF3044]">
              <br />
              결제가 완료
            </strong>
            되었습니다.
          </h2>
          {/* <span className="description">
            예약 내역 및 견적 내용은 <em>마이페이지{">"}예약현황</em>에서
            확인하실 수 있습니다.
            <br /> 수정사항이나 문의 사항이 있으시면, "문의하기"를 통해 연락
            주시기 바랍니다.
            <br />
          </span> */}
          <FormDiv>
            <div className="company-info">
              <h3>결제 내역</h3>
              <ul>
                <li>
                  <p>결제 금액</p>
                  <span className="font-semibold">
                    {papersInfo.price.toLocaleString()}원
                  </span>
                </li>
                <li>
                  <p>결제 날짜</p>
                  <span>{papersInfo.paidAt}</span>
                </li>
              </ul>
            </div>
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
                <li style={{ backgroundColor: "#0084ff13" }}>
                  <p>견적비용</p>
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    {papersInfo.price.toLocaleString()}원
                  </span>
                </li>
                <li style={{ backgroundColor: "#41414113" }}>
                  <p>특이사항</p>
                  <span>{papersInfo.addComment}</span>
                </li>
              </ul>
            </div>
          </FormDiv>
          <BtnAreaDiv>
            <button className="confirm !bg-[#3887FF]" onClick={handleConfirm}>
              확인
            </button>
          </BtnAreaDiv>
        </PaperContDiv>
      </div>
    </PapersDiv>
  );
};

export default ExpertPaymentHistory;
