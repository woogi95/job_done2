import { Button, Form, Input } from "antd";
import axios from "axios";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { RiKakaoTalkFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { setCookie } from "../../../apis/cookie";
import { loginUser } from "../../../atoms/loginAtom";
import UserLayout from "../../../components/UserLayout";
import "./Index.css";
import styled from "@emotion/styled";
import { adminLoginAtom } from "../../../atoms/third-atoms/admin/mainAtom";

const BottonBox = styled.button`
  width: 155px;
  border: 1px solid #f6f6f6;
  font-size: 16px;
  height: 35px;
`;

function LoginPage() {
  const [userInfo, setUserInfo] = useRecoilState(loginUser);
  const [epwFail, setEpwFail] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const host = window.location.origin;
  const redirectUrl = `${host}/fe/redirect`;
  const initData = {
    email: "",
    upw: "",
  };
  const [userState, setUserState] = useState(false);
  const [adminState, setAdminState] = useRecoilState(adminLoginAtom);
  const adminLogin = async data => {
    try {
      const res = await axios.post("/api/admin/sign-in", data, {
        withCredentials: true,
      });
      if (res.status === 200) {
        setCookie(`accessToken`, res.data.resultData.accessToken, {
          path: "/admin",
        });
        localStorage.setItem("admin", "admin");
        navigate("/admin");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const loginTry = async data => {
    console.log("로그인 요청:", data);
    try {
      const res = await axios.post("/api/user/sign-in", data, {
        withCredentials: true,
      });
      console.log("서버 응답:", res.data);
      const message = res.data.resultMessage.includes("성공") ? true : false;
      console.log(message);
      if (message === true) {
        setAdminState(true);
        const { accessToken, userId, name, email, pic, businessId } =
          res.data.resultData;
        setCookie(`accessToken`, res.data.resultData.accessToken, {
          path: "/",
        });

        // ✅ 사용자 상태 업데이트
        setUserInfo({
          userId: userId,
          name: name,
          email: email,
          pic: pic,
          accessToken: accessToken,
          businessId: businessId,
          isLogind: true,
        });

        // localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("businessId", businessId);

        navigate("/");
      } else {
        setErrorMsg(res.data.resultMessage);
        setEpwFail(true);
        return;
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const signUpButton = () => {
    navigate("/login/signup");
  };

  return (
    <div>
      <div style={{ marginBottom: 40 }}>
        <UserLayout />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          fontSize: "28px",
          gap: "20px",
          width: "100%",
          marginBottom: "10px",
        }}
      >
        <BottonBox
          style={{
            backgroundColor:
              userState === true ? "#4581F0" : "rgb(132,132,132)",
          }}
          onClick={() => setUserState(true)}
        >
          일반 회원
        </BottonBox>
        <BottonBox
          style={{
            backgroundColor:
              userState === false ? "#4581F0" : "rgb(132,132,132)",
          }}
          onClick={() => setUserState(false)}
        >
          관리자
        </BottonBox>
      </div>
      {/* 로그인, 비밀번호 */}
      {userState ? (
        <Form
          initialValues={initData}
          style={{ width: 320, margin: "0 auto" }}
          onFinish={loginTry}
        >
          <Form.Item
            name={"email"}
            rules={[
              { required: true, message: "이메일은 필수 항목입니다." },
              { type: "email", message: "유효한 이메일 주소를 입력해주세요." },
            ]}
          >
            <Input
              style={{ alignItems: "center", height: "40px" }}
              placeholder="이메일을 입력하세요."
            />
          </Form.Item>
          <Form.Item
            name={"upw"}
            rules={[
              { required: true, message: "비밀번호는 필수 항목입니다." },
              // {
              //   pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
              //   message:
              //     "비밀번호는 최소 8자 이상이며, 대소문자와 숫자를 포함해야 합니다.",
              // },
            ]}
          >
            <Input.Password
              placeholder="비밀번호를 입력하세요"
              className="h-[40px]"
            />
          </Form.Item>
          <Button
            className="bg-[#4581F0] font-semibold text-[16px] border-gray-300 w-80 h-[40px] rounded-lg mb-2 flex justify-center items-center text-white"
            htmlType="submit"
          >
            로그인
          </Button>
          <div className="justify-between flex items-center text-gray-500 mb-10">
            <div className="flex justify-center items-center gap-[3px]">
              <input type="checkbox" id="logining" name="logining" />
              <label htmlFor="iogining">로그인 상태 유지</label>
            </div>

            <Link to={"/login/epw"} className="text-gray-500">
              아이디•비밀번호 찾기
            </Link>
          </div>
          <div>
            <div style={{ marginBottom: 10 }}>
              <a
                href={`/oauth2/authorization/kakao?redirect_uri=${redirectUrl}`}
              >
                <button
                  type="button"
                  className="bg-[#FEE500] gap-[5px] border border-[#E4E5ED] font-semibold text-[14px] w-80 h-[40px] rounded-lg flex items-center justify-center mb-3"
                >
                  <RiKakaoTalkFill style={{ fontSize: 30 }} />
                  카카오 로그인
                </button>
              </a>
              <a
                href={`/oauth2/authorization/google?redirect_uri=${redirectUrl}`}
              >
                <button
                  type="button"
                  className="bg-white border gap-[5px] border-[#E4E5ED] w-80 h-[40px] font-semibold text-[14px] rounded-lg flex items-center justify-center"
                >
                  <FcGoogle style={{ fontSize: 30 }} />
                  구글 로그인
                </button>
              </a>
            </div>
            <div style={{ marginBottom: 10 }}>
              <button
                type="button"
                onClick={() => signUpButton()}
                className="!pre bg-white-500 border border-[#E4E5ED] font-semibold text-[14px] w-80 h-[40px] rounded-lg "
              >
                회원가입
              </button>
            </div>
          </div>
        </Form>
      ) : (
        <Form
          initialValues={initData}
          style={{ width: 320, margin: "0 auto" }}
          onFinish={adminLogin}
        >
          <Form.Item
            name={"aid"}
            rules={[
              { required: true, message: "이메일은 필수 항목입니다." },
              { type: "email", message: "유효한 이메일 주소를 입력해주세요." },
            ]}
          >
            <Input
              style={{ alignItems: "center", height: "40px" }}
              placeholder="이메일을 입력하세요."
            />
          </Form.Item>
          <Form.Item
            name={"apw"}
            rules={[
              { required: true, message: "비밀번호는 필수 항목입니다." },
              // {
              //   pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
              //   message:
              //     "비밀번호는 최소 8자 이상이며, 대소문자와 숫자를 포함해야 합니다.",
              // },
            ]}
          >
            <Input.Password
              placeholder="비밀번호를 입력하세요"
              className="h-[40px]"
            />
          </Form.Item>
          <Button
            className="bg-[#4581F0] font-semibold text-[16px] border-gray-300 w-80 h-[40px] rounded-lg mb-2 flex justify-center items-center text-white"
            htmlType="submit"
          >
            관리자 로그인
          </Button>
        </Form>
      )}

      <div style={{ width: 320, justifyContent: "center" }}></div>
      {epwFail && (
        <div className="emailModalFull">
          <div className="emailModal">
            <h1>{errorMsg}</h1>
            <button onClick={() => setEpwFail(false)}>확인</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
