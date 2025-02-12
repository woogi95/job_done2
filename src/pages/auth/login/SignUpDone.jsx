import React from "react";
import { useNavigate } from "react-router-dom";
import "./signuppage.css";
import "./signupdone.css";
import UserLayout from "../../../components/UserLayout";

function SignUpDone() {
  const navigate = useNavigate();
  const goLoginPage = () => {
    navigate("/login");
  };
  return (
    <div className="doneDiv justify-center">
      <div className="mb-10">
        <UserLayout />
      </div>
      <div
        style={{
          width: 320,
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto",
        }}
      >
        <span
          style={{
            fontSize: 20,
          }}
        >
          가입을 환영 합니다.
        </span>
        <span>도움의 손길이 필요한 순간</span>
        <span>Job-Done 이 늘 함께 하겠습니다.</span>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginBottom: 40 }}
      >
        <button className="loginButton" onClick={goLoginPage}>
          로그인 하기
        </button>
      </div>
      <div
        style={{
          width: 320,
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto",
        }}
      >
        <span
          style={{
            marginBottom: 20,
          }}
        >
          당신의 생활에 편리함을 더 하겠습니다.
        </span>
        <span
          style={{
            fontSize: 12,
          }}
        >
          Powered by Job-Done
        </span>
        <span
          style={{
            fontSize: 12,
            marginBottom: 5,
          }}
        >
          궁금한 점은 고객센터 070-1234-1234
        </span>
        <span
          style={{
            fontSize: 12,
          }}
        >
          또는 1:1 문의로 문의해주시기 바랍니다.
        </span>
      </div>
    </div>
  );
}

export default SignUpDone;
