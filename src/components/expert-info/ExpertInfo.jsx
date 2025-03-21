import { FaChevronRight } from "react-icons/fa";
import { businessDetailState } from "../../atoms/businessAtom";
import { useRecoilValue } from "recoil";

const ExpertInfo = () => {
  const businessState = useRecoilValue(businessDetailState);

  const formatPhoneNumber = phone => {
    if (!phone) return "-";
    const cleaned = String(phone).replace(/\D/g, "");
    if (cleaned.length === 11) {
      return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"); // 11자리: 3-4-4
    }
    if (cleaned.length === 10) {
      return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"); // 10자리: 3-3-4
    }
    return phone;
  };

  const formatTime = time => {
    if (!time) return "-";
    const [hour, minute] = time.split(":");
    const period = hour < 12 ? "오전" : "오후";
    const formattedHour = hour % 12 || 12;
    return `${period} ${formattedHour}:${minute}`;
  };

  const formatBusinessNumber = number =>
    number
      ? number.replace(/(\d{3})(\d{2})(\d{4})/, "$1-$2-$3")
      : "사업자 번호 없음";

  let serviceType;
  switch (businessState.categoryId) {
    case 1:
      serviceType = "청소";
      break;
    case 2:
      serviceType = "이사";
      break;
    case 3:
      serviceType = "세차";
      break;
    default:
      serviceType = "서비스";
  }

  return (
    <div className="info-area">
      <h2>{businessState.businessName}</h2>
      <span>{businessState.address}</span>
      <div>
        <p>
          <FaChevronRight /> 카테고리 :{" "}
          <em>{`${serviceType} ${"_"} ${businessState.detailTypeName}`}</em>
        </p>
        <p>
          <FaChevronRight /> 영업시간 :{" "}
          <em>
            {formatTime(businessState.openingTime)} ~{" "}
            {formatTime(businessState.closingTime)}
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
