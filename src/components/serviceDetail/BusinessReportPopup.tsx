import { useEffect, useState } from "react";
import { ReportPopupDiv } from "./serviceDetail";
import { RxCross1 } from "react-icons/rx";
import { BsCheckCircleFill, BsCircle } from "react-icons/bs";
import { loginApi } from "../../apis/login";
import { FaPlus } from "react-icons/fa";
import { ImageInfoType } from "../../types/WriteQa";
import PopupT from "../ui/PopupT";

interface SirenType {
  qaTypeDetailId: number;
  qaDetailReason: string;
}

interface BusinessReportPopupProps {
  setIsReportPopupOpen: (isOpen: boolean) => void;
}

const BusinessReportPopup: React.FC<BusinessReportPopupProps> = ({
  setIsReportPopupOpen,
}) => {
  const [sirenTypelist, setSirenTypelist] = useState<SirenType[]>([]);
  // ------
  const [qaTypeDetailId, setQaTypeDetailId] = useState<number>(0);
  const [content, setContent] = useState<string>("");
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [imageInfo, setImageInfo] = useState<ImageInfoType[]>([]);
  const businessId = localStorage.getItem("businessId");
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  //------

  const getSirenTypelist = async () => {
    try {
      const res = await loginApi.get(`/api/qa/qaTypeId?qaTypeId=1`);
      setSirenTypelist(res.data.resultData);
    } catch (error) {
      console.error("신고 유형 목록 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    getSirenTypelist();
  }, []);

  const handleClose = () => {
    setIsReportPopupOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      const requestData = {
        qaTypeDetailId,
        contents: content,
        qaReportReason: "BUSINESS",
        qaTargetId: businessId,
      };

      formData.append(
        "p",
        new Blob([JSON.stringify(requestData)], {
          type: "application/json",
        }),
      );

      selectedImages.forEach(file => {
        formData.append("pics", file);
      });

      const res = await loginApi.post("/api/qa", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.resultData) {
        setIsSuccessPopupOpen(true);
      } else {
        setIsReportPopupOpen(false);
      }
    } catch (error) {
      console.error("업체신고 실패:", error);
    }
  };

  // 이미지 업로드
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedImages(prevImages => [...prevImages, ...files]);

    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviewImages(prevPreviews => [...prevPreviews, ...newPreviews]);
  };

  const handleRemoveImage = async (index: number) => {
    if (index < imageInfo.length) {
      const newImageInfo = [...imageInfo];
      const removedImage = newImageInfo[index];

      console.log("삭제된 이미지 PK:", removedImage.pk);

      newImageInfo.splice(index, 1);
      setImageInfo(newImageInfo);

      const newPreviewImages = [...previewImages];
      newPreviewImages.splice(index, 1);
      setPreviewImages(newPreviewImages);
    } else {
      const adjustedIndex = index - imageInfo.length;
      const newSelectedImages = [...selectedImages];
      const newPreviewImages = [...previewImages];

      newSelectedImages.splice(adjustedIndex, 1);
      newPreviewImages.splice(index, 1);

      setSelectedImages(newSelectedImages);
      setPreviewImages(newPreviewImages);
    }
  };
  return (
    <ReportPopupDiv>
      <div className="layer">
        <form onSubmit={handleSubmit}>
          <h1>업체 신고</h1>
          <div className="report-list">
            {sirenTypelist.map(item => (
              <div key={item.qaTypeDetailId}>
                <input
                  type="radio"
                  name="qaTypeDetailId"
                  id={`${item.qaTypeDetailId}`}
                  value={item.qaTypeDetailId}
                  onChange={() => setQaTypeDetailId(item.qaTypeDetailId)}
                />
                <label htmlFor={`${item.qaTypeDetailId}`}>
                  {qaTypeDetailId === item.qaTypeDetailId ? (
                    <BsCheckCircleFill />
                  ) : (
                    <BsCircle style={{ color: "#ccc" }} />
                  )}
                  {item.qaDetailReason}
                </label>
              </div>
            ))}
          </div>
          <div className="text-box">
            <textarea
              placeholder="상세 신고사유 입력해주세요."
              value={content}
              onChange={e => setContent(e.target.value)}
              maxLength={1000}
            />
          </div>
          <div className="photo-area">
            <h4>첨부 사진</h4>
            <div className="img-box">
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                id="img-btn"
              />
              <label htmlFor="img-btn">
                <FaPlus />
              </label>
              {previewImages.map((image, index) => (
                <div key={index} className="slot">
                  <div>
                    <img src={image} alt={`preview ${index}`} />
                  </div>
                  <button
                    className="remove-img-btn"
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                  >
                    <RxCross1 />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <button type="submit" className="report-btn">
            신고하기
          </button>
          <div
            className="close-btn"
            onClick={() => {
              handleClose();
            }}
          >
            <RxCross1 />
          </div>
        </form>
      </div>
      <PopupT
        isOpen={isSuccessPopupOpen}
        message="업체신고가 완료되었습니다"
        showConfirmButton={true}
        handleConfirmClick={() => {
          setIsSuccessPopupOpen(false);
          setIsReportPopupOpen(false);
        }}
      />
    </ReportPopupDiv>
  );
};

export default BusinessReportPopup;
