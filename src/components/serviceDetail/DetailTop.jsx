import { FaStar } from "react-icons/fa";
import { CountStarDiv, DetailTopDiv } from "./serviceDetail";
import { useRecoilValue } from "recoil";
import { businessDetailState } from "../../atoms/businessAtom";

const DetailTop = () => {
  const BASE_URL = "http://112.222.157.156:5224";
  const businessDetail = useRecoilValue(businessDetailState);
  // console.log(businessDetail);
  if (!businessDetail) {
    return <p>업체 정보를 불러오는 중입니다...</p>;
  }
  return (
    <DetailTopDiv>
      <div className="inner">
        <em>
          카테고리 {">"} {businessDetail.detailTypeName}
        </em>
        <h1>{businessDetail.title}</h1>
        <div className="companyInfo">
          <div className="logo">
            <img src={`${BASE_URL}${businessDetail.logo}`} alt="로고" />
          </div>
          <div className="txt">
            <h3>
              {businessDetail.businessName}
              <em>
                {businessDetail.openingTime} -{businessDetail.closingTime}
              </em>
            </h3>
            <b>{businessDetail.address}</b>
          </div>
        </div>
        <div className="desc">
          <div className="box">
            <b>Job_Done 횟수</b>
            <div>{businessDetail.serviceCount}회</div>
          </div>
          <div className="box">
            <b>리뷰</b>
            <CountStarDiv>
              <FaStar />
              <em>{businessDetail.scoreAvg}</em>
              <span>({businessDetail.reviewCount})</span>
            </CountStarDiv>
          </div>
          <div className="box">
            <b>경력</b>
            <div>{businessDetail.years}</div>
          </div>
        </div>
      </div>
    </DetailTopDiv>
  );
};

export default DetailTop;
