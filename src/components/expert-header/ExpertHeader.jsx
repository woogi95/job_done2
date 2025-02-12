import { Link, useNavigate } from "react-router-dom";
import { HeaderDiv } from "./header";
import { useRecoilState } from "recoil";
import { loginUser } from "../../atoms/loginAtom";
import { businessDetailState } from "../../atoms/businessAtom";
import { loginApi } from "../../apis/login";
import { reserveList } from "../../atoms/reservationAtom";
import { useEffect } from "react";

const ExpertHeader = () => {
  const [businessInfo, setBusinessInfo] = useRecoilState(businessDetailState);
  const [userInfo, setUserInfo] = useRecoilState(loginUser);
  const [reserveInfo, setReserveInfo] = useRecoilState(reserveList);
  const navigate = useNavigate();
  const businessPage = async () => {
    try {
      const busiId = localStorage.getItem("businessId");
      const res = await loginApi.get(
        `/api/service?business_id=${busiId}&status=4&page=1&size=100`,
      );
      const response = await loginApi.get(
        `/api/business?business_id=${busiId}`,
      );
      // console.log("캘린더 데이터", res);
      // console.log("업체 데이터", response); // API 응답 확인
      const {
        logo,
        detailTypeId,
        detailTypeName,
        businessId,
        businessName,
        title,
        scoreAvg,
        price,
        like,
        address,
        serviceCount,
        openingTime,
        closingTime,
        years,
        contents,
        reviewCount,
        tel,
        tel2,
        tel3,
      } = response.data.resultData;
      let filteredData = []; // ✅ if 블록 바깥에서 선언 (초기값 빈 배열)

      if (res && res.data.resultData) {
        // ✅ 필요한 데이터만 추출 (userName, serviceId, startDate)
        filteredData = res.data.resultData.map(item => ({
          title: item.userName,
          servicId: item.serviceId,
          start: item.startDate,
        }));
      }
      // console.log(filteredData);
      setBusinessInfo({
        logo: logo,
        detailTypeId: detailTypeId,
        detailTypeName: detailTypeName,
        businessId: businessId,
        businessName: businessName,
        title: title,
        scoreAvg: scoreAvg,
        price: price,
        like: like,
        address: address,
        serviceCount: serviceCount,
        openingTime: openingTime,
        closingTime: closingTime,
        years: years,
        contents: contents,
        reviewCount: reviewCount,
        tel: tel,
        tel2: tel2,
        tel3: tel3,
      });
      setReserveInfo(filteredData);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(businessInfo);
  useEffect(() => {
    businessPage();
  }, []);
  // 로그아웃 관련
  const handleLogout = () => {
    localStorage.clear();

    document.cookie.split(";").forEach(cookie => {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    });

    setUserInfo({
      accessToken: "",
      isLogind: false,
    });
    navigate("/");
  };
  return (
    <HeaderDiv>
      <Link to={"expert"} className="b-logo">
        <img src="/images/b-logo.svg" alt="비지니스로고" />
      </Link>
      <div className="user-info">
        <ul>
          <li>
            <b>{businessInfo.businessName}</b>님 환영합니다:)
          </li>
          <li>
            <button
              onClick={() => {
                handleLogout();
              }}
            >
              로그아웃
            </button>
          </li>
        </ul>
        <button>
          <em>로고</em>사용자계정 전환
        </button>
      </div>
    </HeaderDiv>
  );
};

export default ExpertHeader;
