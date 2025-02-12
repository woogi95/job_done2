import { useState } from "react";
import { LayerDiv, ModalDiv, PicDiv } from "./portfolio";
import { FaPlus } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";

const AddPortfolio = ({ setIsPopPfAdd }) => {
  // 파일 미리보기 URL을 저장할 배열 상태
  const [filePreviews, setFilePreviews] = useState([]);

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
        <label htmlFor="">
          <h2>타이틀</h2>
          <input type="text" />
        </label>
        <div className="time-price">
          <label htmlFor="Duration">
            <h2>소요시간</h2>
            <input type="number" id="Duration" min="0" step="1" />
          </label>
          <label htmlFor="">
            <h2>가격대</h2>
            <input type="number" min="0" step="1" />
          </label>
        </div>
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
              <button onClick={() => document.getElementById("files").click()}>
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
        <div className="text-area">
          <h2>간단설명</h2>
          <textarea
            name=""
            id=""
            placeholder="100자 이내로 입력하세요."
            maxLength={100}
          ></textarea>
        </div>
        <div className="btn-area">
          <button
            className="cancel"
            onClick={() => {
              setIsPopPfAdd(false);
            }}
          >
            취소
          </button>
          <button
            className="okay"
            onClick={() => {
              setIsPopPfAdd(false);
            }}
          >
            수정완료
          </button>
        </div>
      </LayerDiv>
    </ModalDiv>
  );
};

export default AddPortfolio;
