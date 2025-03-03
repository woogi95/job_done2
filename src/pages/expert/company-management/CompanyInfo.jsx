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

function CompanyInfo() {
  const busiId = localStorage.getItem("businessId");
  const [isLogoEdit, setIsLogoEdit] = useState(false);
  const [isExpertInfoEdit, setIsExpertInfoEdit] = useState(false);
  const [businessInfo, setBusinessInfo] = useRecoilState(businessDetailState);
  const businessState = useRecoilValue(businessDetailState);
  const [optionList, setOptionList] = useRecoilState(ProductState);
  // const BASE_URL = "http://112.222.157.157:5234";
  const navigate = useNavigate();
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
        <ContBoxDiv>
          <div className="option-list">
            {optionList.optionList.map(option => (
              <div className="option-box" key={option.optionId}>
                <h3>{option.optionName}</h3>
                <ul className="op-detail-list">
                  {option.optionDetailList.map(item => (
                    <li className="op-item" key={item.optionDetailId}>
                      <p>
                        <span>{item.optionDetailName}</span>
                        <em>{item.optionDetailPrice.toLocaleString()}</em>
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </ContBoxDiv>
      </ExpertOptionInfoDiv>
    </ExportPageDiv>
  );
}

export default CompanyInfo;
