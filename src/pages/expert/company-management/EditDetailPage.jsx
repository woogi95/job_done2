import React, { useState } from "react";
import { EditDetailDiv } from "./companyManagement";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function EditDetailPage() {
  return (
    <EditDetailDiv>
      const [value, setValue] = useState(''); return{" "}
      <ReactQuill theme="snow" value={value} onChange={setValue} />
    </EditDetailDiv>
  );
}

export default EditDetailPage;
