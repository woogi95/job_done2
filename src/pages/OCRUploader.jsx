import { useState } from "react";
const API_KEY = "up_i4FGUaCMwm6hjj8yNwQhdHMKcQ93d"; // 보안을 위해 .env 파일로 관리하는 것이 좋음
const API_URL = "https://api.upstage.ai/v1/document-ai/ocr";
function OCRUploader() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const handleFileChange = event => {
    setFile(event.target.files[0]);
  };
  const handleUpload = async () => {
    if (!file) {
      alert("파일을 선택해주세요.");
      return;
    }
    const formData = new FormData();
    formData.append("document", file);
    formData.append("schema", "oac");
    formData.append("model", "ocr-2.2.1");
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`, // 보안상 백엔드에서 처리하는 것이 좋음
        },
        body: formData,
      });
      const data = await response.json();

      const dataText = data.text;
      const filterData = dataText.match(/\d{3}-\d{2}-\d{5}/);

      setResult(filterData[0]);
    } catch (error) {
      console.error("OCR 요청 오류:", error);
    }
  };
  return (
    <div>
      <h2>OCR 파일 업로드</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>OCR 실행</button>
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
}

export default OCRUploader;
