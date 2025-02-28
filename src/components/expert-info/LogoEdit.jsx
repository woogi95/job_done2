import { useState } from "react";
// icon
import { IoCamera } from "react-icons/io5";
import { loginApi } from "../../apis/login";

const LogoEdit = ({ setIsLogoEdit, businessState, busiId }) => {
  const [LogoPreview, setLogoPreview] = useState(null);
  const [LogoFile, setLogoFile] = useState(null);
  const BASE_URL = "http://112.222.157.157:5234";

  const handleFileChange = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setLogoFile(file); // 파일을 상태에 저장
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (LogoFile) {
      try {
        const requestData = {
          p: {
            businessId: busiId,
          },
        };
        console.log("requestData:", requestData);

        const formData = new FormData();

        formData.append(
          "p",
          new Blob([JSON.stringify(requestData.p)], {
            type: "application/json",
          }),
        );

        // 파일이 존재하면 FormData에 추가
        formData.append("logo", LogoFile);
        console.log("formData!!!!!:", formData);
        // 요청 보내기
        const response = await loginApi.patch("/api/business/logo", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200) {
          console.log("성공!!");
          setIsLogoEdit(false);
        }
      } catch (error) {
        console.error("회원정보 수정 실패:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="photo-area">
        <div className="logo">
          <label htmlFor="exportLogo">
            {LogoPreview ? (
              <img src={LogoPreview} alt="미리보기" />
            ) : (
              <img
                src={`${BASE_URL}${businessState.logo}`}
                alt={businessState.businessName}
                style={{ backgroundColor: "#e8faff" }}
              />
            )}
            <input type="file" id="exportLogo" onChange={handleFileChange} />
            <div className="file-btn">
              <IoCamera />
            </div>
          </label>
        </div>
        <div className="btn-area">
          <button
            className="cancel"
            type="button"
            onClick={() => {
              setIsLogoEdit(false);
            }}
          >
            취소
          </button>
          <button type="submit">로고 저장</button>
        </div>
      </div>
    </form>
  );
};

export default LogoEdit;
