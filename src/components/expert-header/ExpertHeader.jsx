import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HeaderDiv } from "./header";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginUser } from "../../atoms/loginAtom";
import { businessDetailState } from "../../atoms/businessAtom";
import { loginApi } from "../../apis/login";
import { removeCookie } from "../../apis/cookie";
import { reserveCountAtom, reserveList } from "../../atoms/reservationAtom";

const ExpertHeader = () => {
  const busiId = localStorage.getItem("businessId");
  const [businessInfo, setBusinessInfo] = useRecoilState(businessDetailState);
  const businessState = useRecoilValue(businessDetailState);
  const [reserveInfo, setReserveInfo] = useRecoilState(reserveList);
  const [userInfo, setUserInfo] = useRecoilState(loginUser);
  const [reserveCount, setReserveCount] = useRecoilState(reserveCountAtom);
  const iscontent = businessState.contents;
  const navigate = useNavigate();
  // 캘린더
  const getBusinessInfo = async busiId => {
    try {
      const res = await loginApi.get(
        `/api/business/%7BbusinessId%7D?businessId=${busiId}`,
      );
      const response = await loginApi.get(
        `/api/service?business_id=${busiId}&status=4&page=1&size=100`,
      );
      const countRes = await loginApi.get(
        `/api/service?business_id=${busiId}&status=3&page=1&size=99999`,
      );

      // 예약건수 셋팅
      const countData = countRes.data.resultData.map(item => ({
        title: item.userName,
        completed: item.completed,
      }));
      setReserveCount(countData);
      if (response && response.data.resultData) {
        // ✅ 필요한 데이터만 추출 (userName, serviceId, startDate)
        const filteredData = response.data.resultData.map(item => ({
          title: item.userName,
          serviceId: item.serviceId,
          start: item.startDate,
          completed: item.completed,
        }));

        setReserveInfo(filteredData);
      }
      setBusinessInfo(res.data.resultData);
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

  return (
    <HeaderDiv>
      <Link to={"expert"} className="b-logo">
        <img src="/images/b-logo.svg" alt="비지니스로고" />
      </Link>
      <div className="user-info">
        <ul>
          <li style={{ display: iscontent ? "none" : "block" }}>
            <Link to={"expert/company-management/createdetail"}>
              <em>신규등록</em>
            </Link>
          </li>
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
