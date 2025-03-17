const Unauthorized = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>접근 권한이 없습니다.</h1>
      <p>이 페이지는 관리자만 접근할 수 있습니다.</p>
      <a href="/">홈으로 돌아가기</a>
    </div>
  );
};

export default Unauthorized;
