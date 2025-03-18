type BusinessStateType = {
  logo: string;
  businessName: string;
};

const AdminBusiLogo = ({
  businessState,
}: {
  businessState: BusinessStateType;
}) => {
  const BASE_URL = "https://job-done.r-e.kr";
  return (
    <div className="photo-area">
      <div className="logo">
        <img
          src={`${BASE_URL}${businessState.logo}`}
          alt={businessState.businessName}
        />
      </div>
      <div className="btn-area">
        <button>상품 페이지</button>
      </div>
    </div>
  );
};

export default AdminBusiLogo;
