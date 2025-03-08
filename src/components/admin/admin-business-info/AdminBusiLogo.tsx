const AdminBusiLogo = ({ businessState }) => {
  const BASE_URL = "http://112.222.157.157:5234";
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
