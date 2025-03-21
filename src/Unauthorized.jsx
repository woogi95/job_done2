import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "80%",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          textAlign: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            padding: "40px 60px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h1 style={{ fontSize: "32px", marginBottom: "20px", color: "#333" }}>
            접근 권한이 없습니다.
          </h1>
          <p style={{ fontSize: "18px", marginBottom: "30px", color: "#666" }}>
            이 페이지는 <strong>관리자</strong>만 접근할 수 있습니다.
          </p>
          <a
            href="/"
            style={{
              textDecoration: "none",
              backgroundColor: "#007bff",
              color: "#fff",
              padding: "12px 24px",
              borderRadius: "6px",
              fontSize: "16px",
              transition: "background-color 0.2s ease",
            }}
            onMouseOver={e => (e.target.style.backgroundColor = "#0056b3")}
            onMouseOut={e => (e.target.style.backgroundColor = "#007bff")}
            onClick={navigate("/")}
          >
            홈으로 돌아가기
          </a>
        </div>
      </div>
    </>
  );
};

export default Unauthorized;
