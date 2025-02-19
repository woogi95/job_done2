import { FaChevronRight } from "react-icons/fa";
import { businessDetailState } from "../../atoms/businessAtom";
import { useRecoilValue } from "recoil";

const ExpertInfo = () => {
  const businessState = useRecoilValue(businessDetailState);
  const formatPhoneNumber = phone =>
    phone ? phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3") : "-";
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
