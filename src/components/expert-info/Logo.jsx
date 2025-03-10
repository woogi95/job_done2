import { BASE_URL } from "../../constants/constants";
import { useNavigate } from "react-router-dom";

const Logo = ({ setIsLogoEdit, businessState }) => {
  const navigate = useNavigate();

  return (
    <div className="photo-area">
      <div className="logo">
        <img
          src={`${BASE_URL}${businessState.logo}`}
          alt={businessState.businessName}
        />
      </div>
      <div className="btn-area">
        <button
          onClick={() => navigate(`/service/${businessState.businessId}`)}
        >
          상품 페이지
        </button>
        <button
          onClick={() => {
            setIsLogoEdit(true);
          }}
        >
          로고 수정
        </button>
      </div>
    </div>
  );
};

export default Logo;
