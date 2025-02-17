import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HeaderDiv } from "./header";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginUser } from "../../atoms/loginAtom";
import { businessDetailState } from "../../atoms/businessAtom";
import { loginApi } from "../../apis/login";
import { removeCookie } from "../../apis/cookie";

const ExpertHeader = () => {
  const busiId = localStorage.getItem("businessId");
  const [businessInfo, setBusinessInfo] = useRecoilState(businessDetailState);
  const businessState = useRecoilValue(businessDetailState);
  const [userInfo, setUserInfo] = useRecoilState(loginUser);
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

  // 로그아웃 관련
  const handleLogout = () => {
    localStorage.clear();
    removeCookie("accessToken");
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
  useEffect(() => {
    if (busiId) {
      getBusinessInfo(busiId);
    }
  }, [busiId]);
  console.log("businessInfo", businessInfo);
  return (
    <HeaderDiv>
      <Link to={"expert"} className="b-logo">
        <img src="/images/b-logo.svg" alt="비지니스로고" />
      </Link>
      <div className="user-info">
        <ul>
          <li>
            <b>{businessState.businessName}</b>님 환영합니다:)
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
        <button
          onClick={() => {
            navigate("/mypage");
          }}
        >
          <em>로고</em>사용자계정 전환
        </button>
      </div>
    </HeaderDiv>
  );
};

export default ExpertHeader;
