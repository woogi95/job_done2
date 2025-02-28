import { useMemo, useRef, useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import DOMPurify from "dompurify";
import { EditDetailDiv } from "./companyManagement";
// import axios from "axios";
import { loginApi } from "../../../apis/login";
import { useRecoilValue } from "recoil";
import { businessDetailState } from "../../../atoms/businessAtom";

function EditDetailPage() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const quillRef = useRef(null);
  const { businessId } = useRecoilValue(businessDetailState);

  // businessId 상태 확인을 위한 useEffect 추가
  useEffect(() => {
    console.log("Current businessId:", businessId);
  }, [businessId]);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      // businessId 값 한번 더 확인
      console.log("Submitting with businessId:", businessId);

      const response = await loginApi.post("/api/business/contents", {
        businessId: businessId,
        title: title,
        contents: content,
      });
      console.log("저장 성공:", response.data);
    } catch (error) {
      console.error("저장 실패:", error);
    }
  };

  // 이미지 처리
  const imageHandler = () => {
    console.log("이미지처리하기");
    // 1. 현재 에디터를 찾아서 참조한다.
    // useRef 로 보관한 내용물 참조(current)
    const editor = quillRef.current.getEditor();
    // console.log(editor);

    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    console.log(input);
    input.click();

    input.addEventListener("change", async function () {
      // console.log("이미지 선택");
      try {
        const file = input.files[0];
        const formData = new FormData();
        formData.append("pics", file);

        // 현재 businessId 값 확인
        console.log("Using businessId in imageHandler:", businessId);

        // businessId가 undefined인 경우 기본값 설정
        const blobData = { businessId: businessId || 2 };

        formData.append(
          "p",
          new Blob([JSON.stringify(blobData)], {
            type: "application/json",
          }),
        );

        // axios 요청을 await로 처리
        const res = await loginApi.post(
          "/api/business/businessPicTemp",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );

        // 서버에서 받아온 이미지 URL
        const tempUrl = res.data.resultData.pics[0];
        console.log(tempUrl);

        const range = editor.getSelection();
        editor.insertEmbed(range.index, "image", tempUrl);
        editor.setSelection(range.index + 1);
      } catch (error) {
        console.log(error);
      }
    });
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ font: [] }],
          [{ align: [] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }, "link"],
          [
            {
              color: [
                "#000000",
                "#e60000",
                "#ff9900",
                "#ffff00",
                "#008a00",
                "#0066cc",
                "#9933ff",
                "#ffffff",
                "#facccc",
                "#ffebcc",
                "#ffffcc",
                "#cce8cc",
                "#cce0f5",
                "#ebd6ff",
                "#bbbbbb",
                "#f06666",
                "#ffc266",
                "#ffff66",
                "#66b966",
                "#66a3e0",
                "#c285ff",
                "#888888",
                "#a10000",
                "#b26b00",
                "#b2b200",
                "#006100",
                "#0047b2",
                "#6b24b2",
                "#444444",
                "#5c0000",
                "#663d00",
                "#666600",
                "#003700",
                "#002966",
                "#3d1466",
                "custom-color",
              ],
            },
            { background: [] },
          ],
          ["image", "video"],
          ["clean"],
        ],
        // 이미지 관련해서는 내가 직접 처리할께.
        handlers: {
          image: imageHandler,
        },
      },
    }),
    [],
  );
  return (
    <EditDetailDiv>
      <div className="inner">
        <h1>상세페이지 수정</h1>
        <div style={{ width: "80%", margin: "0 auto" }}>
          <form onSubmit={handleSubmit}>
            <div className="btn-area">
              <button type="submit">저장</button>
              <button type="button">미리보기</button>
              <button type="button">취소</button>
            </div>
            <label>
              <span>타이틀</span>
              <input
                type="text"
                maxLength={30}
                onBlur={e => setTitle(e.target.value)}
                placeholder="30자 이내로 입력해주세요."
              />
            </label>
            <ReactQuill
              ref={quillRef}
              value={content}
              onChange={setContent}
              modules={modules}
              theme="snow"
            />
          </form>
        </div>
        <div>
          <h2>입력중인 데이터(서버에 보내줄 글자)</h2>
          <p>{content}</p>
          {/* <p
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
          /> */}
        </div>
      </div>
    </EditDetailDiv>
  );
}

export default EditDetailPage;
