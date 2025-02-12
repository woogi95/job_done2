import { Button, Form, Input } from "antd";
import { useRecoilState } from "recoil";
import {
  countDownCheck,
  joinUserState,
  openModalEmail,
  profilFile,
} from "../../../atoms/loginAtom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./EmailPage.css";

function EmailPage() {
  const userInfo = useRecoilState(joinUserState);
  const [isEmail, setIsEmail] = useRecoilState(openModalEmail);
  const [countDown, setCountDown] = useRecoilState(countDownCheck);
  const [fileList, setFileList] = useRecoilState(profilFile); // 파일 상태 관리
  const navigate = useNavigate();

  // 네비게이트
  const goCancle = () => {
    navigate("/login");
  };
  // 폼 데이터
  const initialData = {
    email: userInfo[0].email,
    name: userInfo[0].name,
    phone: userInfo[0].phone,
    upw: userInfo[0].upw,
    authCode: "",
    pic: "",
  };
  // console.log(initialData);
  // 이메일인증완료버튼
  const handleEmailModal = async data => {
    try {
      const formData = new FormData();

      const requestData = {
        name: data.name,
        email: data.email,
        upw: data.upw,
        phone: data.phone,
      };

      // JSON 데이터를 FormData에 추가
      formData.append(
        "p",
        new Blob([JSON.stringify(requestData)], {
          type: "application/json",
        }),
      );

      // 파일 추가 (data.pic이 있는 경우)
      if (data.pic) {
        formData.append("pic", data.pic);
      }

      // `Content-Type` 헤더는 설정하지 않음 (자동 설정)
      const res = await axios.post("/api/user/sign-up", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setIsEmail(false);
      navigate("/login/signupdone"); // 응답 데이터 확인
    } catch (error) {
      console.error(
        "Error during sign-up:",
        error.response?.data || error.message,
      );
    }
  };
  // 폼 onFinish
  const onFinish = async data => {
    console.log(data);
    try {
      // const result = await axios.put("/api/auth-check", data);
      const result = await axios.put(
        `/api/auth-check?email=${data.email}&authCode=${data.authCode}`,
      );

      if (result) {
        setIsEmail(true);
      }
    } catch (error) {
      if (error.response) {
        console.error("Error Response Data:", error.response.data);
        console.error("Error Status Code:", error.response.status);
      } else if (error.request) {
        console.error("No Response Received:", error.request);
      } else {
        console.error("Request Error:", error.message);
      }
    }
  };

  // 다시 전송 버튼
  const repeatPost = async () => {
    try {
      const res = await axios.post("/api/email-check", {
        email: `${data.email}`,
      });

      return res;
    } catch (error) {
      console.log(error);
    }
  };
  // 카운트 다운

  useEffect(() => {
    if (countDown > 0) {
      const timer = setTimeout(() => setCountDown(countDown - 1), 1000);
      return () => clearTimeout(timer); // 클린업
    }
  }, [countDown]);
  return (
    <div>
      <Form
        initialValues={initialData}
        onFinish={onFinish}
        style={{ width: 320, margin: "0 auto" }}
      >
        <Form.Item
          className="email"
          name={"email"}
          style={{ display: "block" }}
        >
          <div>{userInfo.email} 로 인증 코드를 발송 했습니다.</div>
        </Form.Item>
        <Form.Item
          className="checkingBox"
          name={"authCode"}
          label="인증코드 입력"
          rules={[
            {
              required: true,
              message: "인증코드를 확인해주세요",
            },
          ]}
        >
          <Input
            placeholder="인증번호를 입력해주세요."
            suffix={
              (countDown > 0 && <span>{countDown}</span>) || (
                <span>인증시간 만료</span>
              )
            }
          />
        </Form.Item>
        <div style={{ display: "flex", justifyContent: "spaceBetween" }}>
          <span>혹시 인증코드가 발송되지 않았나요?</span>
          <button
            onClick={() => repeatPost()}
            style={{ color: "red", textDecoration: "underLine" }}
          >
            인증코드 재전송
          </button>
        </div>
        <Form.Item className="clickbuttons">
          <button className="cancle" onClick={() => goCancle()}>
            취소
          </button>
          <Button htmlType="submit" className="checkingTry">
            인증하기
          </Button>
        </Form.Item>
      </Form>
      {isEmail && (
        <div className="emailModalFull">
          <div className="emailModal">
            <h1>이메일인증이 완료 되었습니다.</h1>
            <button onClick={() => handleEmailModal(userInfo[0])}>확인</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmailPage;
