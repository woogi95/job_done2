import { useState } from "react";
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

function CompanyInfo() {
  const [isLogoEdit, setIsLogoEdit] = useState(false);
  const [isExpertInfoEdit, setIsExpertInfoEdit] = useState(false);
  return (
    <ExportPageDiv>
      {/* <h2 className="tit">업체 관리</h2> */}
      <ExpertInfoDiv>
        <TitleAreaDiv>
          <h2 className="tit">업체정보</h2>
          <button>
            <p>업체정보수정</p> <MdModeEdit />
          </button>
        </TitleAreaDiv>
        <ContBoxDiv>
          {/* 로고 & 로고수정 */}
          {isLogoEdit ? (
            <LogoEdit setIsLogoEdit={setIsLogoEdit} />
          ) : (
            <Logo setIsLogoEdit={setIsLogoEdit} />
          )}
          {/* 업체정보 업체정보수정 */}
          {isExpertInfoEdit ? (
            <ExpertInfoEdit setIsExpertInfoEdit={setIsExpertInfoEdit} />
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
