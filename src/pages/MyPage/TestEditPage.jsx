import DOMPurify from "dompurify";
import { useMemo, useRef, useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { loginApi } from "../../apis/login";

function TestEditPage() {
  const [data, setData] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  // useRef 는 React 에서 html 태그 참조할때
  const quillRef = useRef(null);
  // uploadedFiles 상태 변화 감지를 위한 useEffect 추가
  useEffect(() => {
    console.log("uploadedFiles 상태 업데이트됨:", uploadedFiles);
    console.log("현재 업로드된 파일 개수:", uploadedFiles.length);
    uploadedFiles.forEach((file, index) => {
      console.log(`파일 ${index + 1}:`, {
        이름: file.name,
        크기: file.size,
        타입: file.type,
      });
    });
  }, [uploadedFiles]);
  // 이미지 처리(프론트에서 처리)
  const imageHandler = () => {
    console.log("이미지 버튼 클릭됨");
    const editor = quillRef.current.getEditor();
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.addEventListener("change", async function () {
      try {
        const file = input.files[0];
        console.log("선택된 파일:", file); // 선택된 파일 정보 출력
        console.log("파일 이름:", file.name);

        setUploadedFiles(prev => [...prev, file]);
        console.log("현재까지 업로드된 파일들:", uploadedFiles);

        const reader = new FileReader();
        reader.onload = () => {
          console.log("파일 읽기 완료");
          const range = editor.getSelection();
          editor.insertEmbed(range.index, "image", reader.result);
          editor.setSelection(range.index + 1);
          console.log("에디터에 이미지 삽입 완료");
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.log("이미지 업로드 실패:", error);
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
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }, "link"],
          [
            {
              color: [
                "#000000",
                "#E60000",
                "#FF9900",
                "#FFFF00",
                "#008A00",
                "#0066CC",
                "#9933FF",
                "#FFFFFF",
                "#FACCCC",
                "#FFEBCC",
                "#FFFFCC",
                "#CCE8CC",
                "#CCE0F5",
                "#EBD6FF",
                "#BBBBBB",
                "#F06666",
                "#FFC266",
                "#FFFF66",
                "#66B966",
                "#66A3E0",
                "#C285FF",
                "#888888",
                "#A10000",
                "#B26B00",
                "#B2B200",
                "#006100",
                "#0047B2",
                "#6B24B2",
                "#444444",
                "#5C0000",
                "#663D00",
                "#666600",
                "#003700",
                "#002966",
                "#3D1466",
                "custom-color",
              ],
            },
            { background: [] },
          ],
          ["image"],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    [],
  );

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const formData = new FormData();

      const contentData = {
        businessId: 2, // 실제 businessId 값으로 변경 필요
      };

      formData.append(
        "p",
        new Blob([JSON.stringify(contentData)], {
          type: "application/json",
        }),
      );

      // 저장된 이미지 파일들 추가
      uploadedFiles.forEach((file, index) => {
        formData.append("pics", file);
      });

      // API 호출
      const response = await loginApi.post(
        "/api/business/businessPic",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      console.log("저장 성공:", response.data);
    } catch (error) {
      console.error("저장 실패:", error);
    }
  };

  return (
    <div>
      <div className="inner">
        <h1>상세페이지</h1>
        <div style={{ width: "80%", margin: "0 auto" }}>
          <form onSubmit={handleSubmit}>
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
              onChange={e => setData(e)}
              modules={modules}
            />
          </form>
        </div>
        <div>
          <h2>입력중인 데이터(서버에 보내줄 글자)</h2>
          <p>{data}</p>
          <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data) }} />
        </div>
      </div>
    </div>
  );
}
export default TestEditPage;
