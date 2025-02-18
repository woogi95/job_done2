import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  TitleAreaDiv,
} from "./companyManagement";
// icon
import { MdModeEdit } from "react-icons/md";

import ExpertInfo from "../../../components/expert-info/ExpertInfo";
import ExpertInfoEdit from "../../../components/expert-info/ExpertInfoEdit";
import { businessDetailState } from "../../../atoms/businessAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginApi } from "../../../apis/login";

function CompanyInfo() {
  const busiId = localStorage.getItem("businessId");
  const [isLogoEdit, setIsLogoEdit] = useState(false);
  const [isExpertInfoEdit, setIsExpertInfoEdit] = useState(false);
  const [businessInfo, setBusinessInfo] = useRecoilState(businessDetailState);
  const businessState = useRecoilValue(businessDetailState);
  const BASE_URL = "http://112.222.157.157:5224";
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
  // console.log("businessState@@", businessState);
  useEffect(() => {
    if (busiId) {
      getBusinessInfo(busiId);
    }
    if (!isLogoEdit) {
      getBusinessInfo(busiId);
    }
  }, [busiId, isLogoEdit]);
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
          <button>
            <p>상품소개 수정</p> <MdModeEdit />
          </button>
        </TitleAreaDiv>
        <ContBoxDiv>
          <div className="product-info">
            <div>
              <p>타이틀</p> <h2>3년 연속 1위! 사무실청소 전문업체입니다.</h2>
            </div>
            <Link to={"/"}>내용보기</Link>
          </div>
        </ContBoxDiv>
      </ExpertProductDiv>
      {/* 옵션 정보*/}
      <ExpertOptionInfoDiv>
        <TitleAreaDiv>
          <h2 className="tit">서비스 옵션</h2>
          <button>
            <p>옵션 수정</p> <MdModeEdit />
          </button>
        </TitleAreaDiv>
        <ContBoxDiv>
          <div className="option-list">
            <div className="option-box">
              <h3>옵션명 1</h3>
              <ul className="op-detail-list">
                <li className="op-item">
                  <p>
                    <span>선택옵션1</span>
                    <em>0</em>
                  </p>
                  {/* <button>-</button> */}
                </li>
                <li className="op-item">
                  <p>
                    <span>선택옵션2</span>
                    <em>10,000</em>
                  </p>
                  {/* <button>-</button> */}
                </li>
              </ul>
            </div>
            <div className="option-box">
              <h3>옵션명 2</h3>
              <ul className="op-detail-list">
                <li className="op-item">
                  <p>
                    <span>선택옵션2-1</span>
                    <em>0</em>
                  </p>
                  {/* <button>-</button> */}
                </li>
                <li className="op-item">
                  <p>
                    <span>선택옵션2-2</span>
                    <em>10,000</em>
                  </p>
                  {/* <button>-</button> */}
                </li>
              </ul>
            </div>
          </div>
        </ContBoxDiv>
      </ExpertOptionInfoDiv>
    </ExportPageDiv>
  );
}

export default CompanyInfo;
