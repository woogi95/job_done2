import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// comp
import LogoEdit from "../../../components/expert-info/LogoEdit";
import Logo from "../../../components/expert-info/Logo";
// styled
import {
  ContBoxDiv,
  ExpertInfoDiv,
  ExpertOptionInfoDiv,
  ExpertProductDiv,
  ExportPageDiv,
  OpContBoxDiv,
  TitleAreaDiv,
} from "./companyManagement";
// icon
import { MdModeEdit } from "react-icons/md";

import ExpertInfo from "../../../components/expert-info/ExpertInfo";
import ExpertInfoEdit from "../../../components/expert-info/ExpertInfoEdit";
import { businessDetailState } from "../../../atoms/businessAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginApi } from "../../../apis/login";
import { ProductState } from "../../../atoms/productAtom";
import { Popup } from "../../../components/ui/Popup";

function CompanyInfo() {
  const busiId = localStorage.getItem("businessId");
  const [isLogoEdit, setIsLogoEdit] = useState(false);
  const [isExpertInfoEdit, setIsExpertInfoEdit] = useState(false);
  const [businessInfo, setBusinessInfo] = useRecoilState(businessDetailState);
  const businessState = useRecoilValue(businessDetailState);
  const [optionList, setOptionList] = useRecoilState(ProductState);

  // 팝업 관련 상태 추가
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const navigate = useNavigate();

  // 로고 수정 완료 콜백 함수
  const handleLogoEditComplete = () => {
    setIsLogoEdit(false);
  };

  const getBusinessInfo = async busiId => {
    try {
      const res = await loginApi.get(
        `/api/business/%7BbusinessId%7D?businessId=${busiId}`,
      );
      setBusinessInfo(res.data.resultData);
      console.log(res.data.resultData);
    } catch (error) {
      console.log(error);
    }
  };

  const getOptionList = async busiId => {
    try {
      // /api/portfolio/post?businessId=2&price=50000&takingTime=5&title=ddd&contents=ddd
      const res = await loginApi.get(`/api/product?businessId=${busiId}`);
      console.log("여기제발", res.data.resultData);
      setOptionList(res.data.resultData);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log("businessState@@", businessState);
  useEffect(() => {
    if (busiId) {
      getBusinessInfo(busiId);
    }
    if (!isLogoEdit) {
      getBusinessInfo(busiId);
    }
  }, [busiId, isLogoEdit]);

  useEffect(() => {
    getOptionList(busiId);
  }, [busiId]);
  return (
    <ExportPageDiv>
      {/* <h2 className="tit">업체 관리</h2> */}
      <ExpertInfoDiv>
        <TitleAreaDiv>
          <h2 className="tit">업체정보</h2>
          <button
            onClick={() => {
              setIsExpertInfoEdit(true);
            }}
            style={{ display: isExpertInfoEdit ? "none" : "flex" }}
          >
            <p>업체정보수정</p> <MdModeEdit />
          </button>
        </TitleAreaDiv>
        <ContBoxDiv>
          {/* 로고 & 로고수정 */}
          {isLogoEdit ? (
            <LogoEdit
              businessState={businessState}
              setIsLogoEdit={setIsLogoEdit}
              busiId={busiId}
              setIsPopupOpen={setIsPopupOpen}
              setPopupMessage={setPopupMessage}
              onLogoEditComplete={handleLogoEditComplete}
            />
          ) : (
            <Logo businessState={businessState} setIsLogoEdit={setIsLogoEdit} />
          )}
          {/* 업체정보 업체정보수정 */}
          {isExpertInfoEdit ? (
            <ExpertInfoEdit
              busiId={busiId}
              setIsExpertInfoEdit={setIsExpertInfoEdit}
              isExpertInfoEdit={isExpertInfoEdit}
            />
          ) : (
            <ExpertInfo setIsExpertInfoEdit={setIsExpertInfoEdit} />
          )}
        </ContBoxDiv>
      </ExpertInfoDiv>
      {/* 업체 디테일*/}
      <ExpertProductDiv>
        <TitleAreaDiv>
          <h2 className="tit">상품 정보</h2>
          <button
            onClick={() => {
              navigate("/expert/company-management/editdetail");
            }}
          >
            <p>상품소개 수정</p> <MdModeEdit />
          </button>
        </TitleAreaDiv>
        <ContBoxDiv>
          <div className="product-info">
            <div>
              <p>타이틀</p> <h2>{businessState.title}</h2>
            </div>
            <Link to={"/expert/company-management/detail"}>내용보기</Link>
          </div>
        </ContBoxDiv>
      </ExpertProductDiv>
      {/* 옵션 정보*/}
      <ExpertOptionInfoDiv>
        <TitleAreaDiv>
          <h2 className="tit">서비스 옵션</h2>
          <button
            onClick={() => {
              navigate("/expert/company-management/editoption");
            }}
          >
            <p>옵션 설정</p> <MdModeEdit />
          </button>
        </TitleAreaDiv>
        <OpContBoxDiv>
          {/* 옵션정보 */}

          <div className="option-info">
            <h4 className="tit">상품기본 정보</h4>
            <label>
              <b>카테고리 </b>
              <span>
                <p>음식점청소</p>
              </span>
            </label>
            <label>
              <b>기본금액 </b>
              <div className="basic-price">
                {businessInfo?.price ? businessInfo.price.toLocaleString() : 0}{" "}
                원
              </div>
            </label>
          </div>
          {/* 옵션등록 */}
          <div className="option-list">
            {optionList.optionList.map((option, optionIndex) => (
              <div className="option-box" key={option.optionId}>
                <h3>
                  옵션 {optionIndex + 1} : {option.optionName}
                </h3>
                <ul className="op-detail-list">
                  {option.optionDetailList.map(item => (
                    <li className="op-item" key={item.optionDetailId}>
                      <p>
                        <span>{item.optionDetailName}</span>
                        <em>{item.optionDetailPrice.toLocaleString()} 원</em>
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </OpContBoxDiv>
      </ExpertOptionInfoDiv>

      {/* 팝업 컴포넌트 */}
      <Popup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        message={popupMessage}
        showConfirmButton={true}
        onConfirm={() => {
          console.log("onConfirm triggered"); // 디버깅용 로그
          if (popupMessage === "로고가 수정되었습니다.") {
            console.log("Closing LogoEdit mode"); // 디버깅용 로그
            handleLogoEditComplete(); // 로고 수정 완료 콜백 호출
          }
          setIsPopupOpen(false);
        }}
      />
    </ExportPageDiv>
  );
}

export default CompanyInfo;
