import { m } from "framer-motion";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../apis/login";
import { RxCross2 } from "react-icons/rx";
import { Select } from "@chakra-ui/react";

function Write() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [previewImages, setPreviewImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageInfo, setImageInfo] = useState([]);

  const handleSubmit = e => {
    e.preventDefault();
    // TODO: 게시글 저장 로직 구현
    navigate("/forum");
  };

  const handleImageUpload = event => {
    const files = Array.from(event.target.files);
    setSelectedImages(prevImages => [...prevImages, ...files]);

    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviewImages(prevPreviews => [...prevPreviews, ...newPreviews]);
  };

  const correctReviewImg = async picId => {
    try {
      const res = await loginApi.put("/api/review/state", {
        reviewPicId: picId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveImage = async index => {
    if (index < imageInfo.length) {
      const newImageInfo = [...imageInfo];
      const removedImage = newImageInfo[index];

      await correctReviewImg(removedImage.pk);
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

  const writeQa = async () => {
    try {
      const res = await loginApi.post("/api/qa", {
        p: {
          qaTypeDetailId: 0,
          contents: "",
          qaReportReason: "",
          qaTargetId: 0,
        },
        pics: [""],
      });
    } catch (error) {
      console.error("게시글 작성 실패:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">게시글 작성</h1>
          <Select className="w-[130px] text-[18px] font-thin">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </Select>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="제목을 입력하세요"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <textarea
              placeholder="내용을 입력하세요"
              value={content}
              onChange={e => setContent(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg h-64 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-center items-center">
            <label className="flex w-[130px] text-[18px] font-thin items-center justify-center px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer">
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
                <div key={index} className="relative w-[140px] h-[140px]">
                  <div className="w-full h-full border border-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={image}
                      alt={`preview ${index}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <button
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
              className="px-10 py-2 border rounded-lg hover:bg-gray-100 text-[18px] font-thin"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-10 py-2 bg-blue-500 text-white border rounded-lg hover:bg-blue-600 text-[18px] font-thin"
            >
              등록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Write;
