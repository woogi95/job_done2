import { useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
// comp
// styled
import {
  ContBoxDiv,
  ExpertInfoDiv,
  ExpertOptionInfoDiv,
  ExpertProductDiv,
  ExportPageDiv,
  OpContBoxDiv,
  TitleAreaDiv,
} from "./adminbusinessinfod";
// icon

import ExpertInfo from "../../../components/expert-info/ExpertInfo";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginApi } from "../../../apis/login";
import { ProductState } from "../../../atoms/productAtom";
import { businessDetailAtom } from "../../../atoms/third-atoms/business/adbusinessAtom";
import AdminBusiLogo from "./AdminBusiLogo";

export interface BusinessInfoType {
  logo: string;
  detailTypeId: number;
  detailTypeName: string;
  businessId?: number;
  businessName: string;
  title: string;
  scoreAvg: number;
  price: number;
  like: number;
  address: string;
  serviceCount: number;
  openingTime?: string;
  closingTime?: string;
  years: number;
  contents: string;
  reviewCount: number;
  tel: string;
  safeTel: string;
  businessNum: string;
}

function AdminBusinessInfo() {
  const { businessId } = useParams();
  const busiId = Number(businessId);
  const [businessInfo, setBusinessInfo] =
    useRecoilState<BusinessInfoType>(businessDetailAtom);
  const businessState = useRecoilValue<BusinessInfoType>(businessDetailAtom);
  const [optionList, setOptionList] = useRecoilState(ProductState);

  //   const navigate = useNavigate();
  const getBusinessInfo = async (busiId: number) => {
    try {
      const res = await loginApi.get(
        `/api/business/business?businessId=${busiId}`,
      );
      setBusinessInfo(res.data.resultData);
      console.log(res.data.resultData);
    } catch (error) {
      console.log(error);
    }
  };

  const getOptionList = async (busiId: number) => {
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
  }, [busiId]);

  useEffect(() => {
    getOptionList(busiId);
  }, [busiId]);
  return (
    <ExportPageDiv>
      {/* <h2 className="tit">업체 관리</h2> */}
      <ExpertInfoDiv>
        <TitleAreaDiv>
          <h2 className="tit">업체정보</h2>
          <button>목록으로</button>
        </TitleAreaDiv>
        <ContBoxDiv>
          {/* 로고 & 로고수정 */}
          <AdminBusiLogo businessState={businessState} />
          <ExpertInfo />
        </ContBoxDiv>
      </ExpertInfoDiv>
      {/* 업체 디테일*/}
      <ExpertProductDiv>
        <TitleAreaDiv>
          <h2 className="tit">상품 정보</h2>
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
                {businessInfo.price.toLocaleString()} 원
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
    </ExportPageDiv>
  );
}

export default AdminBusinessInfo;
