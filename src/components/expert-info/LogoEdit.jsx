import { useState } from "react";
// icon
import { IoCamera } from "react-icons/io5";
const LogoEdit = ({ setIsLogoEdit }) => {
  const [LogoPreview, setLogoPreview] = useState(null);

  const handleFileChange = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="photo-area">
      <div className="logo">
        <label htmlFor="exportLogo">
          {LogoPreview ? (
            <img src={LogoPreview} alt="미리보기" />
          ) : (
            <img
              src="/images/logo.svg"
              alt="기본프로필"
              style={{ backgroundColor: "#e8faff" }}
            />
          )}
          <input
            type="file"
            name=""
            id="exportLogo"
            onChange={handleFileChange}
          />
          <div className="file-btn">
            <IoCamera />
          </div>
        </label>
      </div>
      <div className="btn-area">
        <button
          className="cancel"
          onClick={() => {
            setIsLogoEdit(false);
          }}
        >
          취소
        </button>
        <button
          onClick={() => {
            setIsLogoEdit(false);
          }}
        >
          로고 저장
        </button>
      </div>
    </div>
  );
};

export default LogoEdit;
