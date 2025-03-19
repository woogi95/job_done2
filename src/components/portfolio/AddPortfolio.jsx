import { useState } from "react";
import { LayerDiv, ModalDiv, PicDiv } from "./portfolio";
import { FaPlus } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRecoilState, useRecoilValue } from "recoil";
import { businessDetailState } from "../../atoms/businessAtom";
import { loginApi } from "../../apis/login";

const AddPortfolio = ({ setIsPopPfAdd, getPortfolioList }) => {
  const { categoryId, detailTypeId, businessId } =
    useRecoilValue(businessDetailState);
  // 파일 객체와 미리보기 URL을 함께 저장
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
    youtubeUrl: "",
  });
  const [previewImage, setPreviewImage] = useState(null);

  // Yup 스키마 정의
  const schema = yup.object().shape({
    title: yup.string().required("타이틀을 입력해주세요"),
    takingTime: yup
      .string()
      .required("소요시간을 입력해주세요")
      .min(0, "0 이상의 숫자를 입력해주세요"),
    price: yup
      .number("가격을 숫자로 입력해주세요")
      .typeError("가격은 숫자로 입력해주세요")
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
      console.log("전체 formData:", newData);
      return newData;
    });
  };

  const onSubmit = async data => {
    try {
      const formData = new FormData();

      // JSON 데이터 생성
      const requestData = {
        businessId: Number(businessState.businessId),
        price: Number(data.price),
        takingTime: data.takingTime,
        title: data.title,
        contents: data.contents,
        youtubeUrl: data.youtubeUrl,
      };

      formData.append(
        "p",
        new Blob([JSON.stringify(requestData)], {
          type: "application/json",
        }),
      );

      // 파일 데이터 추가
      filePreviews.forEach(file => {
        formData.append("pics", file.file);
      });

      // 썸네일 추가 (단일 파일로 처리)
      if (previewImage && previewImage.file) {
        formData.append("thumb", previewImage.file);
      }

      // API 요청
      const res = await loginApi.post("/api/portfolio", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data) {
        console.log("Success:", res.data);
        setPortfolioId(res.data.resultData);
        // 포트폴리오 목록 갱신
        await getPortfolioList(categoryId, detailTypeId, businessId);
        // 모달 닫기
        setIsPopPfAdd(false);
      }
    } catch (error) {
      console.log("API 에러:", error);
      alert("포트폴리오 등록 중 오류가 발생했습니다.");
    }
  };
  console.log("portfolioId", portfolioId);

  // 파일 선택 후 미리보기 처리
  const handleFileChange = e => {
    const selectedFiles = Array.from(e.target.files);

    // 최대 5개까지 파일만 추가
    if (selectedFiles.length + filePreviews.length > 5) {
      alert("최대 5개의 파일만 업로드할 수 있습니다.");
      return;
    }

    // 파일 객체와 미리보기 URL을 함께 저장
    const newFilesWithPreviews = selectedFiles.map(file => ({
      file, // 파일 객체
      preview: URL.createObjectURL(file), // 미리보기 URL
    }));

    setFilePreviews(prev => [...prev, ...newFilesWithPreviews]);
  };

  // 파일 삭제
  const handleRemoveFile = index => {
    // 미리보기 URL 해제
    URL.revokeObjectURL(filePreviews[index].preview);
    setFilePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage({
        file,
        preview: URL.createObjectURL(file),
      });
    }
  };

  return (
    <ModalDiv>
      <LayerDiv>
        <div className="tit">포트폴리오 등록</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="tit-area">
            <label>
              <h2>
                타이틀<b>*</b>
              </h2>
              <input
                type="text"
                {...register("title")}
                onChange={e => handleChange("title", e.target.value)}
              />
            </label>
            {errors.title && (
              <p className="error tit-error">{errors.title.message}</p>
            )}
          </div>
          <div className="thum-price">
            {/* 썸네일 */}
            <div className="thum">
              <label htmlFor="file">
                <input
                  type="file"
                  id="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
                {previewImage ? (
                  <img
                    src={previewImage.preview}
                    alt="미리보기"
                    style={{
                      width: "85px",
                      height: "85px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <>
                    <FaPlus />
                    <em>
                      대표이미지<b>*</b>
                    </em>
                  </>
                )}
              </label>
            </div>
            <div className="time-price">
              <label>
                <h2>
                  소요시간<b>*</b>
                </h2>
                <input
                  type="number"
                  min="0"
                  step="1"
                  {...register("takingTime")}
                  onChange={e => handleChange("takingTime", e.target.value)}
                />
                <strong>시간</strong>
                {errors.takingTime && (
                  <p className="error">{errors.takingTime.message}</p>
                )}
              </label>
              <label>
                <h2>
                  가격대<b>*</b>
                </h2>
                <input
                  type="text"
                  min="0"
                  step="1"
                  {...register("price", {
                    setValueAs: value =>
                      value ? Number(value.replace(/,/g, "")) : null,
                  })}
                  onChange={e => {
                    const rawValue = e.target.value.replace(/,/g, "");
                    const formattedValue = Number(rawValue).toLocaleString();
                    e.target.value = formattedValue;
                  }}
                />
                <strong>원대</strong>
                {errors.price && (
                  <p className="error">{errors.price.message}</p>
                )}
              </label>
            </div>
          </div>

          {/* 사진 업로드  */}
          <PicDiv>
            <h2>
              작업물<b>*</b>
            </h2>
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

              {/* 4개의 이미지 슬롯 */}
              {[...Array(5)].map((_, index) => (
                <li key={index}>
                  <div
                    className="slot"
                    style={{
                      backgroundImage: filePreviews[index]
                        ? `url(${filePreviews[index].preview})`
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

          <label className="youtube-url">
            <h2>유튜브 URL</h2>
            <input
              type="text"
              {...register("youtubeUrl")}
              onChange={e => handleChange("youtubeUrl", e.target.value)}
            />
            {/* {errors.title && (
              <p className="error">{errors.youtubeUrl.message}</p>
            )} */}
          </label>

          <div className="text-area">
            <h2>
              간단설명<b>*</b>
            </h2>
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
