import { useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";
import { loginApi } from "../../../apis/login";
import { EditDetailDiv } from "./companyManagement";

function EditDetailPage() {
  const [content, setContent] = useState("");
  const quillRef = useRef(null);

  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const editor = quillRef.current.getEditor();
      const range = editor.getSelection(true);

      try {
        // 파일 확장자 추출
        const fileExtension = file.name.split(".").pop().toLowerCase();

        // UUID 생성 함수
        const generateUUID = () => {
          return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
            /[xy]/g,
            function (c) {
              const r = (Math.random() * 16) | 0;
              const v = c === "x" ? r : (r & 0x3) | 0x8;
              return v.toString(16);
            },
          );
        };

        // UUID 형식의 파일명 생성
        const newFileName = `${generateUUID()}.${fileExtension}`;
        console.log("생성된 파일명:", newFileName);

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = async () => {
          const base64Image = reader.result;
          const base64Data = base64Image.split(",")[1];

          const postData = new FormData();
          postData.append("pics", base64Image);
          postData.append(
            "p",
            new Blob([JSON.stringify({ businessId: 2 })], {
              type: "application/json",
            }),
          );

          // const requestData = {
          //   pics: [newFileName], // UUID 형식의 파일명 전송
          //   p: {
          //     businessId: 2,
          //   },
          // };

          console.log("전송할 데이터:", postData);

          const response = await loginApi.post(
            "/api/business/businessPic",
            postData,
            {
              headers: {
                "Content-Type": "application/json",
              },
            },
          );

          console.log("서버 응답:", response.data);

          // 에디터에 이미지 삽입
          editor.insertEmbed(range.index, "image", base64Image);
          editor.setSelection(range.index + 1);
        };
      } catch (error) {
        console.error("이미지 업로드 실패:", error);
        alert("이미지 업로드에 실패했습니다.");
      }
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          ["blockquote"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          ["image", "link"],
          ["clean"],
        ],
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
        <h1>상세페이지</h1>
        <div style={{ width: "80%", margin: "0 auto" }}>
          <form>
            <div className="btn-area">
              <button type="submit">저장</button>
              <button type="button">미리보기</button>
              <button type="button">취소</button>
            </div>
            <label>
              <span>타이틀</span>
              <input type="text" />
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
          <p
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
          />
        </div>
      </div>
    </EditDetailDiv>
  );
}

export default EditDetailPage;
