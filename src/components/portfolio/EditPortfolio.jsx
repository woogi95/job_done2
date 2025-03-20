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
import { BASE_URL } from "../../constants/constants";
import {
  PortfolioDetailImgState,
  PortfolioDetailInfoState,
} from "../../atoms/portfolioAtom";

const EditPortfolio = ({
  setIsPopPfEdit,
  portfolioId,
  getPortfolioList,
  setIsEditComplete,
}) => {
  const [filePreviews, setFilePreviews] = useState([]);
  const [businessInfo, setBusinessInfo] = useRecoilState(businessDetailState);
  const businessState = useRecoilValue(businessDetailState);
  const [pfDetailImgList, setPfDetailImgList] = useRecoilState(
    PortfolioDetailImgState,
  );

  const [portfolioDetailInfo, setPortfolioDetailInfoState] = useRecoilState(
    PortfolioDetailInfoState,
  );
  console.log("businessInfo", businessInfo);
  console.log("businessId", businessState.businessId);
  const [formData, setFormData] = useState({
    businessId: Number(businessState.businessId),
    price: 0,
    takingTime: "",
    title: "",
    contents: "",
    youtubeUrl: "",
    thumbnail: "",
  });
  const [previewImage, setPreviewImage] = useState(null);
  // Yup 스키마
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
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
    defaultValues: formData,
  });

  useEffect(() => {
    if (portfolioDetailInfo) {
      const updatedFormData = {
        businessId: Number(businessState.businessId),
        price: portfolioDetailInfo.price || 0,
        takingTime: portfolioDetailInfo.takingTime || 0,
        title: portfolioDetailInfo.title || "",
        contents: portfolioDetailInfo.contents || "",
        youtubeUrl: portfolioDetailInfo.youtubeUrl || "",
        thumbnail: portfolioDetailInfo.thumbnail || "",
      };
      setFormData(updatedFormData);
      reset(updatedFormData);

      // 썸네일 초기값 설정
      if (portfolioDetailInfo.thumbnail) {
        setPreviewImage({
          file: null,
          preview: `${BASE_URL}${portfolioDetailInfo.thumbnail}`,
        });
      }
    }
  }, [portfolioDetailInfo, businessState.businessId, reset]);

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
      const formData = new FormData();

      // JSON 데이터를 Blob으로 변환
      const jsonData = {
        businessId: Number(businessState.businessId),
        portfolioId: portfolioId,
        price: Number(data.price),
        takingTime: data.takingTime,
        title: data.title,
        contents: data.contents,
        youtubeUrl: data.youtubeUrl,
      };
      const jsonBlob = new Blob([JSON.stringify(jsonData)], {
        type: "application/json",
      });
      formData.append("p", jsonBlob);

      // 썸네일 파일 추가
      if (previewImage && previewImage.file) {
        formData.append("thumbnail ", previewImage.file);
      }

      // 작업물 이미지 파일 추가
      filePreviews
        .filter(file => file.file)
        .forEach(file => {
          console.log("Adding pic:", file.file);
          formData.append("pics", file.file); // 동일한 필드 이름으로 파일 추가
        });

      // FormData 내용 확인
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const res = await loginApi.put("/api/portfolio", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data) {
        console.log("Success:", res.data);
        // pfDetailImgList 업데이트 (blob URL 제외하고 서버 URL만 반영)
        const updatedPfDetailImgList = filePreviews
          .filter(file => file.preview && !file.preview.startsWith("blob:")) // blob URL 제외
          .map(file => file.preview); // preview URL 추출
        setPfDetailImgList(prev => [
          ...prev,
          ...res.data.resultData.pics.map(pic => ({
            ...pic,
            pic: pic.picPath,
          })),
        ]);

        // portfolioDetailInfo 업데이트
        setPortfolioDetailInfoState(prev => ({
          ...prev,
          ...data,
        }));

        getPortfolioList(
          businessState.categoryId,
          businessState.detailTypeId,
          businessState.businessId,
        );
        setIsPopPfEdit(false);
        setIsEditComplete(true);
      }
    } catch (error) {
      console.log("API 에러:", error);
      alert("포트폴리오 등록 중 오류가 발생했습니다.");
    }
  };
  console.log("portfolioId", portfolioId);

  const getPortfolioPics = async portfolioId => {
    try {
      const res = await loginApi.get(
        `/api/portfolio/pic/%7BportfolioId%7D?portfolioId=${portfolioId}`,
      );
      if (res.status === 200) {
        console.log("포트폴리오 이미지 리스트", res.data.resultData);
        // API에서 받은 이미지 URL을 filePreviews에 추가 (BASE_URL 포함)
        const initialFiles = res.data.resultData.map(pic => ({
          file: null,
          preview: `${BASE_URL}${pic.pic}`,
          portfolioPicId: pic.portfolioPicId,
          isInitial: true,
        }));
        setFilePreviews(initialFiles);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = e => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length + filePreviews.length > 5) {
      alert("최대 5개의 파일만 업로드할 수 있습니다.");
      return;
    }

    // 파일 객체와 미리보기 URL을 함께 저장
    const newFilesWithPreviews = selectedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setFilePreviews(prev => [...prev, ...newFilesWithPreviews]);
  };

  const handleRemoveFile = async index => {
    const fileToRemove = filePreviews[index];
    if (fileToRemove) {
      // 초기 이미지인 경우 (API에서 받은 이미지)
      if (fileToRemove.isInitial) {
        try {
          // 포폴삭제 상태 바꾸는 요청 보내기
          const res = await loginApi.put(`/api/portfolio/state`, {
            portfolioPicId: fileToRemove.portfolioPicId,
            // portfolioId: portfolioId,
          });
          if (res.status === 200) {
            console.log("이미지 삭제 성공:", res.data);

            URL.revokeObjectURL(fileToRemove.preview);

            setFilePreviews(prev => prev.filter((_, i) => i !== index));
            setPfDetailImgList(prev => prev.filter((_, i) => i !== index));
          }
        } catch (error) {
          console.log("이미지 삭제 실패:", error);
          alert("이미지 삭제 중 오류가 발생했습니다.");
        }
      } else {
        // 사용자가 추가한 이미지인 경우
        URL.revokeObjectURL(fileToRemove.preview);
        setFilePreviews(prev => prev.filter((_, i) => i !== index));
        setPfDetailImgList(prev => prev.filter((_, i) => i !== index));
      }
    }
  };

  useEffect(() => {
    getPortfolioPics(portfolioId);
  }, [portfolioId]);

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
        <div className="tit">포트폴리오 수정</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="tit-area">
            <label>
              <h2>
                타이틀<b>*</b>
              </h2>
              <input
                type="text"
                {...register("title")}
                value={formData.title}
                onChange={e => handleChange("title", e.target.value)}
              />
            </label>
            {errors.title && (
              <p className="error tit-error">{errors.title.message}</p>
            )}
          </div>

          <div className="thum-price">
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
                  value={formData.takingTime}
                  onChange={e => handleChange("takingTime", e.target.value)}
                />{" "}
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
                  type="number"
                  min="0"
                  step="1"
                  {...register("price")}
                  value={formData.price}
                  onChange={e => handleChange("price", e.target.value)}
                />{" "}
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
                  type="button"
                  onClick={() => document.getElementById("files").click()}
                >
                  파일 선택
                </button>
              </li>

              {/* 5개의 이미지 슬롯 */}
              {[...Array(5)].map((item, index) => (
                // <li key={item.portfolioPicId}>
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
                        type="button"
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
              value={formData.contents}
              onChange={e => handleChange("contents", e.target.value)}
            ></textarea>
            {errors.contents && (
              <p className="error">{errors.contents.message}</p>
            )}
          </div>
          <div className="btn-area">
            <button
              type="button"
              className="cancel"
              onClick={() => setIsPopPfEdit(false)}
            >
              취소
            </button>
            <button className="okay" type="submit">
              수정하기
            </button>
          </div>
        </form>
      </LayerDiv>
    </ModalDiv>
  );
};

export default EditPortfolio;
