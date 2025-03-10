import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
// styled-components 적용

// icon
import { IoIosArrowDown } from "react-icons/io";
import { SideMenuDiv } from "./adminsidebarD";

const AdminSidebar = () => {
  const [isSubMenuOpen, setSubMenuOpen] = useState(false);
  const [isActiveMenu, setIsActiveMenu] = useState(false);
  // const navigate = useNavigate();

  const location = useLocation();

  // 서브 메뉴 토글
  const toggleSubMenu = () => {
    setSubMenuOpen(prev => !prev);
  };

  // 현재 경로에 따라 활성화 메뉴 설정
  useEffect(() => {
    if (location.pathname === "/admin/businesssearch") {
      setIsActiveMenu(true);
    } else {
      setIsActiveMenu(false);
    }
  }, [location.pathname]);

  return (
    <SideMenuDiv>
      <ul>
        <li>
          <NavLink
            to="/admin"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            메인
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/requestresi"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            업체 등록 요청
          </NavLink>
        </li>
        <li className="menu1">
          <NavLink
            to="/admin/businesssearch"
            onClick={toggleSubMenu}
            className={({ isActive }) =>
              isActive || isActiveMenu ? "active" : ""
            }
          >
            업체 관리
            <IoIosArrowDown
              style={{
                transform: isSubMenuOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </NavLink>
          <ul className={`sub-menu ${isSubMenuOpen ? "open" : ""}`}>
            <li>
              <NavLink
                to="/admin/businesssearch"
                className={({ isActive }) =>
                  isActive && location.pathname !== "/admin/businesssearch"
                    ? "active"
                    : ""
                }
              >
                카테고리 별 조회 | 등록
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/businesssearch/reservesearch"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                예약 별 조회
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/businesssearch/ruesearch"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                매출 별 조회
              </NavLink>
            </li>
          </ul>
        </li>
        <li>
          <NavLink
            to="/admin/userlist"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            유저 관리
          </NavLink>
        </li>
      </ul>
      {/* 사용자 홈으로 이동 */}
      <NavLink to="/" className="userhome">
        <div className="logo"></div>
        <p>사용자 홈 바로가기</p>
      </NavLink>
    </SideMenuDiv>
  );
};

export default AdminSidebar;
