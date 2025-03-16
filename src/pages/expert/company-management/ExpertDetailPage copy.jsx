import "react-quill/dist/quill.snow.css";
import { PreviewAreaDiv, PreviewDetailDiv } from "./companyManagement";

import { businessDetailState } from "../../../atoms/businessAtom";
import { useRecoilValue } from "recoil";
// parser
import parse from "html-react-parser";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function ExpertDetailPage() {
  const navigate = useNavigate();

  const businessDetail = useRecoilValue(businessDetailState);
  console.log("businessDetail", businessDetail.contents);

  return (
    <PreviewAreaDiv>
      <div className="inner">
        <h1>상세페이지 미리보기</h1>
        <div style={{ width: "80%", margin: "0 auto" }}>
          <div className="btn-area">
            <button
              type="button"
              onClick={() => navigate("/expert/company-management/editdetail")}
            >
              수정하기
            </button>
            <button
              type="button"
              onClick={() => navigate("/expert/company-management")}
            >
              닫기
            </button>
          </div>
          <label>
            <span>타이틀</span>
            <input type="text" value={businessDetail.title} />
          </label>
        </div>
        <PreviewDetailDiv>
          <div className="box">
            <h2>업체소개</h2>
            <p className="title-b">
              {businessDetail.contents ? parse(businessDetail.contents) : ""}
            </p>
            {/* {detailPicList.map((item, index) => (
              <img
                key={businessDetail.businessId}
                src={`${BASE_URL}${detailPicList[index].pic}`}
                alt="상품디테일사진"
              />
            ))} */}
          </div>
        </PreviewDetailDiv>
      </div>
    </PreviewAreaDiv>
  );
}

export default ExpertDetailPage;
