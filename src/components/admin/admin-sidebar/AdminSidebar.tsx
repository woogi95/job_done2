import { useState } from "react";
import "./adminsidebar.css";
import { GoChevronDown } from "react-icons/go";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const linkStyle = { display: "flex", justifyContent: "!end", width: "100%" };

  // const [requestMenu, setRequestMenu] = useState<boolean>(false);
  const [searchMenu, setSearchMenu] = useState<boolean>(false);
  // const reqOpen = () => {
  //   setRequestMenu(!requestMenu);
  // };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>관리자 패널</h2>
      </div>
      <nav>
        <Link to="/admin">메인</Link>
        <Link to="/admin/requestresi" style={linkStyle}>
          업체 등록 요청
        </Link>
        <button
          onClick={() => setSearchMenu(!searchMenu)}
          style={{ display: "flex", justifyContent: "!end", width: "100%" }}
        >
          업체 관리
          <GoChevronDown />
        </button>
        {searchMenu ? (
          <div>
            <Link to="/admin/businesssearch" style={linkStyle}>
              카테고리 조회
            </Link>
            <Link to="/admin/businesssearch/reservesearch" style={linkStyle}>
              예약 별 조회(후순위)
            </Link>
            <Link to="/admin/businesssearch/ruesearch" style={linkStyle}>
              매출 별 조회(후순위)
            </Link>
          </div>
        ) : (
          ""
        )}

        <Link to="/admin/userlist">유저</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
