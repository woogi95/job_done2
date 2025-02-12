import React from "react";
import { useNavigate } from "react-router-dom";

function JobBLogo() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <button onClick={goBack}>
        <img
          src="\images\busi-logo.png"
          style={{
            Width: "300",
            height: "70",
          }}
        />
      </button>
    </div>
  );
}
export default JobBLogo;
