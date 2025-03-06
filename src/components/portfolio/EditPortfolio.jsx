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

const BASE_URL = "112.222.157.157:5234";

const AddPortfolio = ({ setIsPopPfEdit, portfolioDetailInfo, portfolioId }) => {
  const [filePreviews, setFilePreviews] = useState([]);
  const [businessInfo, setBusinessInfo] = useRecoilState(businessDetailState);
  const businessState = useRecoilValue(businessDetailState);
  console.log("businessInfo", businessInfo);
  console.log("businessId", businessState.businessId);
  const [formData, setFormData] = useState({
    businessId: Number(businessState.businessId),
    price: 0,
    takingTime: 0,
    title: "",
    contents: "",
  });

  // Yup 스키마
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
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
    defaultValues: formData,
  });

  // portfolioDetailInfo가 변경될 때 formData 업데이트 및 reset 호출
  useEffect(() => {
    if (portfolioDetailInfo) {
      const updatedFormData = {
        businessId: Number(businessState.businessId),
        price: portfolioDetailInfo.price || 0,
        takingTime: portfolioDetailInfo.takingTime || 0,
        title: portfolioDetailInfo.title || "",
        contents: portfolioDetailInfo.contents || "",
      };
      setFormData(updatedFormData);
      reset(updatedFormData);
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

      const requestData = {
        businessId: Number(businessState.businessId),
        portfolioId: portfolioId,
        price: Number(data.price),
        takingTime: data.takingTime,
        title: data.title,
        contents: data.contents,
      };

      console.log("Request Data:", requestData);

      formData.append(
        "p",
        new Blob([JSON.stringify(requestData)], {
          type: "application/json",
        }),
      );

      filePreviews.forEach(file => {
        formData.append("pics", file.file);
      });

      const res = await loginApi.put("/api/portfolio", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data) {
        console.log("Success:", res.data);

        setIsPopPfEdit(false);
      }
    } catch (error) {
      console.log("API 에러:", error);
      alert("포트폴리오 등록 중 오류가 발생했습니다.");
    }
  };
  console.log("portfolioId", portfolioId);

  const getPortfolioPics = async () => {
    try {
      const res = await loginApi.get(
        `/api/portfolio/pic/%7BportfolioId%7D?portfolioId=${portfolioId}`,
      );
      if (res.status === 200) {
        console.log("포트폴리오 이미지 리스트", res.data.resultData);
        // API에서 받은 이미지 URL을 filePreviews에 추가 (BASE_URL 포함)
        const initialFiles = res.data.resultData.map(pic => ({
          file: null, // 파일 객체는 없으므로 null로 설정
          preview: `http://${BASE_URL}${pic.pic}`, // BASE_URL과 pic 경로를 결합
          portfolioPicId: pic.portfolioPicId, // portfolioPicId 추가
          isInitial: true, // 초기 이미지임을 표시
        }));
        setFilePreviews(initialFiles); // 초기값으로 설정
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = e => {
    const selectedFiles = Array.from(e.target.files);
    // 최대 5개까지 파일만 추가
    if (selectedFiles.length + filePreviews.length > 5) {
      alert("최대 5개의 파일만 업로드할 수 있습니다.");
      return;
    }

    // 파일 객체와 미리보기 URL을 함께 저장 (BASE_URL 없음)
    const newFilesWithPreviews = selectedFiles.map(file => ({
      file, // 파일 객체
      preview: URL.createObjectURL(file), // 미리보기 URL (BASE_URL 없음)
    }));

    setFilePreviews(prev => [...prev, ...newFilesWithPreviews]);
  };

  const handleRemoveFile = async index => {
    const fileToRemove = filePreviews[index];
    if (fileToRemove) {
      // 초기 이미지인 경우 (API에서 받은 이미지)
      if (fileToRemove.isInitial) {
        try {
          // DELETE 요청 보내기
          const res = await loginApi.delete(
            `/api/portfolio/portfolioPic?businessId=${businessState.businessId}&portfolioId=${portfolioId}&portfolioPicId=${fileToRemove.portfolioPicId}`,
          );
          if (res.status === 200) {
            console.log("이미지 삭제 성공:", res.data);
            // 미리보기 URL 해제
            URL.revokeObjectURL(fileToRemove.preview);
            // filePreviews에서 해당 이미지 제거
            setFilePreviews(prev => prev.filter((_, i) => i !== index));
          }
        } catch (error) {
          console.log("이미지 삭제 실패:", error);
          alert("이미지 삭제 중 오류가 발생했습니다.");
        }
      } else {
        // 사용자가 추가한 이미지인 경우
        // 미리보기 URL 해제
        URL.revokeObjectURL(fileToRemove.preview);
        // filePreviews에서 해당 이미지 제거
        setFilePreviews(prev => prev.filter((_, i) => i !== index));
      }
    }
  };

  useEffect(() => {
    getPortfolioPics();
  }, [portfolioId]);

  return (
    <ModalDiv>
      <LayerDiv>
        <div className="tit">포트폴리오 수정</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            <h2>타이틀</h2>
            <input
              type="text"
              {...register("title")}
              value={formData.title}
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
                value={formData.takingTime}
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
                value={formData.price}
                onChange={e => handleChange("price", e.target.value)}
              />
              {errors.price && <p className="error">{errors.price.message}</p>}
            </label>
          </div>

          {/* 사진 업로드  */}
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

          <div className="text-area">
            <h2>간단설명</h2>
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
              등록하기
            </button>
          </div>
        </form>
      </LayerDiv>
    </ModalDiv>
  );
};

export default AddPortfolio;
