import { FaChevronRight } from "react-icons/fa";
const ExpertInfo = () => {
  return (
    <div className="info-area">
      <h2>클린지구</h2>
      <span>대구 중구 중앙대로 394 제일빌딩 5F</span>
      <div>
        <p>
          <FaChevronRight /> 카테고리 : <em>청소 {"_"} 사무실 청소</em>
        </p>
        <p>
          <FaChevronRight /> 영업시간 : <em>09:00 - 18:00</em>
        </p>
        <p>
          <FaChevronRight />
          사업자번호 : <em>504-85-25999</em>
        </p>
        <p>
          <FaChevronRight /> 대표번호 : <em>053-1111-1111</em>
          <b>
            추가번호 : <em>053-1111-1111</em>,<em>053-2222-2222</em>
          </b>
        </p>
        {/* <p>
      <FaChevronRight /> 추가번호 : <em>053-1111-1111</em>,
      <em>053-2222-2222</em>
    </p> */}
      </div>
    </div>
  );
};

export default ExpertInfo;
