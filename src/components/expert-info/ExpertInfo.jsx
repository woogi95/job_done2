import { FaChevronRight } from "react-icons/fa";
import { businessDetailState } from "../../atoms/businessAtom";
import { useRecoilValue } from "recoil";

const ExpertInfo = () => {
  const businessState = useRecoilValue(businessDetailState);
  const formatPhoneNumber = phone => {
    if (!phone) return "-"; // null 또는 undefined 처리
    const cleaned = String(phone).replace(/\D/g, ""); // 숫자만 남기기
    if (cleaned.length === 11) {
      return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"); // 11자리: 3-4-4
    }
    if (cleaned.length === 10) {
      return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"); // 10자리: 3-3-4
    }
    return phone; // 형식이 맞지 않으면 원본 값 반환
  };
  const formatBusinessNumber = number =>
    number
      ? number.replace(/(\d{3})(\d{2})(\d{4})/, "$1-$2-$3")
      : "사업자 번호 없음";
  // console.log("businessState", businessState);
  return (
    <div className="info-area">
      <h2>{businessState.businessName}</h2>
      <span>{businessState.address}</span>
      <div>
        <p>
          <FaChevronRight /> 카테고리 :{" "}
          <em>
            청소 {"_"} {businessState.detailTypeName}
          </em>
        </p>
        <p>
          <FaChevronRight /> 영업시간 :{" "}
          <em>
            {businessState.openingTime}~{businessState.closingTime}
          </em>
        </p>
        <p>
          <FaChevronRight />
          사업자번호 :{" "}
          <em>{formatBusinessNumber(businessState.businessNum)}</em>
        </p>
        <p>
          <FaChevronRight /> 대표번호 :{" "}
          <em>{formatPhoneNumber(businessState.tel)}</em>
        </p>
      </div>
    </div>
  );
};

export default ExpertInfo;
