import React from "react";
import { useNavigate } from "react-router-dom";

function UserLayout() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <button onClick={goBack}>
        <img
          src="\images\logo.svg"
          style={{
            Width: "300",
            height: "70",
          }}
        />
      </button>
    </div>
  );
}
export default UserLayout;
