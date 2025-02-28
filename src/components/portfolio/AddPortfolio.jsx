import { useState, useEffect } from "react";
import { LayerDiv, ModalDiv, PicDiv } from "./portfolio";
import { FaPlus } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRecoilState, useRecoilValue } from "recoil";
import { businessDetailState } from "../../atoms/businessAtom";
import { loginApi } from "../../apis/login";

const AddPortfolio = ({ setIsPopPfAdd }) => {
  // 파일 미리보기 URL을 저장할 배열 상태
  const [filePreviews, setFilePreviews] = useState([]);
  const [businessInfo, setBusinessInfo] = useRecoilState(businessDetailState);
  const [portfolioId, setPortfolioId] = useState(0);
  const businessState = useRecoilValue(businessDetailState);
  console.log("businessInfo", businessInfo);
  console.log("businessId", businessState.businessId);
  const [formData, setFormData] = useState({
    businessId: 0,
    price: 0,
    takingTime: "",
    title: "",
    contents: "",
  });

  // Yup 스키마 정의
  const schema = yup.object().shape({
    title: yup.string().required("타이틀을 입력해주세요"),
    takingTime: yup
      .number()
      .required("소요시간을 입력해주세요")
      .min(0, "0 이상의 숫자를 입력해주세요"),
    price: yup
      .number()
      .required("가격을 입력해주세요")
      .min(0, "0 이상의 숫자를 입력해주세요"),
    contents: yup
      .string()
      .required("설명을 입력해주세요")
      .max(100, "100자 이내로 입력해주세요"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const handleChange = (fieldName, value) => {
    setFormData(prev => {
      const newData = {
        ...prev,
        [fieldName]: value,
      };
      console.log("=== onChange 이벤트 발생 ===");
      console.log("전체 formData:", newData);
      return newData;
    });
  };

  const onSubmit = async data => {
    try {
      console.log("data:", data);

      const res = await loginApi.post("/api/portfolio/post", null, {
        params: {
          businessId: Number(data.businessId),
          price: Number(data.price),
          takingTime: data.takingTime,
          title: data.title,
          contents: data.contents,
        },
      });

      if (res.data) {
        console.log("Success:", res.data);
        // setIsPopPfAdd(false);
        setPortfolioId(res.data.resultData);
      }
    } catch (error) {
      console.log("API 에러:", error);
      alert("포트폴리오 등록 중 오류가 발생했습니다.");
    }
  };
  console.log("portfolioId", portfolioId);
  useEffect(() => {
    if (
      formData.price !== 0 &&
      formData.takingTime !== "" &&
      formData.title !== "" &&
      formData.contents !== ""
    ) {
      const portfolioData = {
        ...formData,
        businessId: Number(businessState.businessId),
        price: Number(formData.price),
      };

      console.log("portfolioData with numbers:", portfolioData);
      onSubmit(portfolioData);
    }
  }, [formData]);

  // 파일 선택 후 미리보기 처리
  const handleFileChange = e => {
    const selectedFiles = Array.from(e.target.files); // 선택된 파일들을 배열로 변환

    // 최대 5개까지 파일만 추가
    if (selectedFiles.length + filePreviews.length > 5) {
      alert("최대 5개의 파일만 업로드할 수 있습니다.");
      return;
    }

    // 새로운 미리보기 URL 생성
    const newFilePreviews = selectedFiles.map(file =>
      URL.createObjectURL(file),
    );

    // 기존 파일과 합쳐서 새로운 상태로 업데이트
    setFilePreviews(prev => [...prev, ...newFilePreviews]);
  };

  // 파일 삭제
  const handleRemoveFile = index => {
    setFilePreviews(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <ModalDiv>
      <LayerDiv>
        <div className="tit">포트폴리오 등록</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            <h2>타이틀</h2>
            <input
              type="text"
              {...register("title")}
              onChange={e => handleChange("title", e.target.value)}
            />
            {errors.title && <p className="error">{errors.title.message}</p>}
          </label>
          <div className="time-price">
            <label>
              <h2>소요시간</h2>
              <input
                type="number"
                min="0"
                step="1"
                {...register("takingTime")}
                onChange={e => handleChange("takingTime", e.target.value)}
              />
              {errors.takingTime && (
                <p className="error">{errors.takingTime.message}</p>
              )}
            </label>
            <label>
              <h2>가격대</h2>
              <input
                type="number"
                min="0"
                step="1"
                {...register("price")}
                onChange={e => handleChange("price", e.target.value)}
              />
              {errors.price && <p className="error">{errors.price.message}</p>}
            </label>
          </div>

          <div className="text-area">
            <h2>간단설명</h2>
            <textarea
              placeholder="100자 이내로 입력하세요."
              maxLength={100}
              {...register("contents")}
              onChange={e => handleChange("contents", e.target.value)}
            ></textarea>
            {errors.contents && (
              <p className="error">{errors.contents.message}</p>
            )}
          </div>
        </form>

        {/* 사진 업로드  */}
        <form>
          <PicDiv>
            <h2>작업물</h2>
            <ul
              className="pic-list"
              style={{ display: "flex", flexWrap: "wrap" }}
            >
              {/* 파일 선택 버튼 */}
              <li>
                <label htmlFor="files">
                  <input
                    type="file"
                    id="files"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                  <FaPlus />
                </label>
                <button
                  onClick={() => document.getElementById("files").click()}
                >
                  파일 선택
                </button>
              </li>

              {/* 5개의 이미지 슬롯 */}
              {[...Array(5)].map((_, index) => (
                <li key={index}>
                  <div
                    className="slot"
                    style={{
                      backgroundImage: filePreviews[index]
                        ? `url(${filePreviews[index]})`
                        : "none",
                    }}
                  >
                    {filePreviews[index] && (
                      <button
                        className="del-preview"
                        onClick={() => handleRemoveFile(index)}
                      >
                        <IoCloseCircleOutline />
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </PicDiv>
          <div className="btn-area">
            <button className="cancel" onClick={() => setIsPopPfAdd(false)}>
              취소
            </button>
            <button className="okay" type="submit">
              등록하기
            </button>
          </div>
        </form>
      </LayerDiv>
    </ModalDiv>
  );
};

export default AddPortfolio;
