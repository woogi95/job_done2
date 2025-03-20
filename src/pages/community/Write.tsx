import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../apis/login";
import { ImageInfoType, QaType } from "../../types/WriteQa";

function Write() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imageInfo, setImageInfo] = useState<ImageInfoType[]>([]);
  const [qaTypes, setQaTypes] = useState<QaType[]>([]);
  const [qaSelectTypeId, setQaSelectTypeId] = useState<number>(0);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      setShowErrorAlert(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    navigate("/forum");
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedImages(prevImages => [...prevImages, ...files]);

    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviewImages(prevPreviews => [...prevPreviews, ...newPreviews]);
  };

  const correctQa = async () => {
    try {
      if (!title.trim() || !content.trim()) {
        setShowErrorAlert(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      const formData = new FormData();

      const requestData = {
        qaTypeDetailId: qaSelectTypeId,
        title: title,
        contents: content,
        qaReportReason: "USERREPORT",
      };
      console.log("보내는 데이터:", requestData);

      formData.append(
        "p",
        new Blob([JSON.stringify(requestData)], {
          type: "application/json",
        }),
      );

      selectedImages.forEach(file => {
        formData.append("pics", file);
      });

      for (const pair of formData.entries()) {
        console.log("FormData Entry:", pair[0], pair[1]);
      }

      const res = await loginApi.post("/api/qa", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("데이터 업데이트?:", res.data);

      if (res.data.resultData === 1) {
        setIsSuccessModalOpen(true);
      } else {
        setShowErrorAlert(true);
      }
    } catch (error) {
      console.error("리뷰 수정 실패:", error);
    }
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

      console.log("기존 이미지 삭제 완료:", {
        삭제된_이미지_PK: removedImage.pk,
        남은_이미지_수: newImageInfo.length,
      });
    } else {
      const adjustedIndex = index - imageInfo.length;
      const newSelectedImages = [...selectedImages];
      const newPreviewImages = [...previewImages];

      newSelectedImages.splice(adjustedIndex, 1);
      newPreviewImages.splice(index, 1);

      setSelectedImages(newSelectedImages);
      setPreviewImages(newPreviewImages);

      console.log("새로 추가된 이미지 삭제 완료");
    }
  };

  const qaTypeList = async () => {
    try {
      const res = await loginApi.get("/api/qa/qaTypeId", {
        params: { qaTypeId: 5 },
      });
      setQaTypes(res.data.resultData);
      if (res.data.resultData.length > 0) {
        setQaSelectTypeId(res.data.resultData[0].qaTypeDetailId);
      }
    } catch (error) {
      console.error("게시글 작성 실패:", error);
    }
  };

  const handleModalClose = () => {
    setIsSuccessModalOpen(false);
    navigate("/forum");
    window.location.reload();
  };

  useEffect(() => {
    qaTypeList();
  }, []);

  return (
    <div className="container max-w-[600px] mx-auto px-4 py-8">
      {showErrorAlert && (
        <Alert status="error" mb={4} className="animate-shake">
          <AlertIcon />
          <AlertTitle>입력 오류</AlertTitle>
          <AlertDescription>제목과 내용을 모두 작성해주세요.</AlertDescription>
        </Alert>
      )}
      <div className="max-w-3xl mx-auto">
        <h1 className="flex justify-center items-center min-w-[150px] mb-10 text-2xl font-bold text-gray-800">
          게시글 작성
        </h1>
        <div className="flex justify-center items-center mb-6">
          <span className="flex justify-end items-center min-w-[100px] font-thin w-full">
            사유 선택
          </span>
          <Select
            className="flex !w-[275px] !h-[30px] text-[16px] font-thin ml-auto"
            onChange={e => setQaSelectTypeId(Number(e.target.value))}
          >
            {qaTypes.map(item => (
              <option key={item.qaTypeDetailId} value={item.qaTypeDetailId}>
                {item.qaDetailReason}
              </option>
            ))}
          </Select>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="제목을 입력하세요"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3887FF]"
            />
          </div>

          <div className="mb-4">
            <textarea
              placeholder="내용을 입력하세요"
              value={content}
              onChange={e => setContent(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg h-64 resize-none focus:outline-none focus:ring-2 focus:ring-[#3887FF]"
            />
          </div>
          <div className="flex justify-center items-center">
            <label className="flex w-[120px] text-[16px] font-thin items-center justify-center px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer">
              이미지 추가
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>

          <div className="flex justify-center items-center w-full max-w-[630px] min-h-[100px] rounded-[10px] border-[1px] border-[#DBDBDB] p-[10px] mx-auto">
            <div className="flex flex-wrap gap-2 w-full min-h-[160px] border-2 border-dashed border-gray-300 rounded-lg p-2">
              {previewImages.map((image, index) => (
                <div key={index} className="relative w-[125px] h-[125px]">
                  <div className="w-full h-full border border-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={image}
                      alt={`preview ${index}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute -top-2 -right-2 bg-[#F53A3A] text-white rounded-full w-5 h-5 flex items-center justify-center text-sm"
                  >
                    <RxCross2 className="text-[16px]" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-2">
            <button
              type="button"
              onClick={() => navigate("/forum")}
              className="flex justify-center items-center px-10 py-2 border rounded-lg hover:bg-gray-100 text-[18px] font-thin"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex justify-center items-center px-10 py-2 bg-[#3887FF] text-white border rounded-lg hover:bg-[#3887FF] text-[18px] font-thin"
              onClick={correctQa}
            >
              등록
            </button>
          </div>
        </form>
      </div>

      {/* Success Modal */}
      <Modal isOpen={isSuccessModalOpen} onClose={handleModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>작성 완료</ModalHeader>
          <ModalBody>게시글이 성공적으로 등록되었습니다.</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleModalClose}>
              확인
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Write;
