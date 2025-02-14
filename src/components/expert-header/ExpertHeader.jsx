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
