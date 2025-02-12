const Logo = ({ setIsLogoEdit }) => {
  return (
    <div className="photo-area">
      <div className="logo">
        <img src="/images/logo.svg" alt="업체로고" />
      </div>
      <div className="btn-area">
        <button>상품 페이지</button>
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
