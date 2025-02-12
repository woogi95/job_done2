import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
// styled
import { SideMenuDiv } from "./sideMenu";
// icon
import { IoIosArrowDown } from "react-icons/io";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { statusAtom } from "../../atoms/statusAtom";

const ExpertSideMenu = () => {
  const [isSubMenuOpen, setSubMenuOpen] = useState(false);
  const [isActiveMenu, setIsActiveMenu] = useState(false);
  const navigate = useNavigate();
  const setStatus = useSetRecoilState(statusAtom);

  const toggleSubMenu = () => {
    setSubMenuOpen(prev => !prev);
  };
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/expert/company-management/portfolio") {
      setIsActiveMenu(true);
    } else {
      setIsActiveMenu(false);
    }
  }, [location.pathname]);

  // 메뉴 클릭 시 상태 변경 및 URL 변경
  const handleMenuClick = (newState, menuName) => {
    setStatus(newState); // Recoil 상태에 상태 값 저장
    navigate(`/expert/${menuName}`);
    // console.log(navigate);
  };

  return (
    <SideMenuDiv>
      <ul>
        <li className="menu1">
          <NavLink
            to={"/expert/company-management"}
            onClick={toggleSubMenu}
            className={({ isActive }) =>
              isActive || isActiveMenu ? "active" : ""
            }
          >
            업체관리
            <IoIosArrowDown
              style={{
                transform: isSubMenuOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </NavLink>
          <ul className={`sub-menu ${isSubMenuOpen ? "open" : ""}`}>
            <li>
              <NavLink
                to={"/expert/company-management"}
                className={({ isActive }) =>
                  isActive &&
                  location.pathname !== "/expert/company-management/portfolio"
                    ? "active"
                    : ""
                }
              >
                업체정보
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/expert/company-management/portfolio"}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                포트폴리오
              </NavLink>
            </li>
          </ul>
        </li>
        <li>
          <NavLink
            to={`/expert/reservation-management`}
            onClick={() => handleMenuClick(0, "reservation-management")}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            예약관리
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/expert/quote-management"}
            onClick={() => handleMenuClick(1, "quote-management")}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            견적관리
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/expert/payment-management"}
            onClick={() => handleMenuClick(2, "payment-management")}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            결제관리
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/expert/schedule-management"}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            일정관리
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/expert/message-center"}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            고객문의
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/expert/review-center"}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            리뷰관리
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/expert/statistics"}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            통계
          </NavLink>
        </li>
      </ul>
      <NavLink to={"/"} className="userhome">
        <div className="logo"></div>
        <p>사용자 홈 바로가기</p>
      </NavLink>
    </SideMenuDiv>
  );
};

export default ExpertSideMenu;
