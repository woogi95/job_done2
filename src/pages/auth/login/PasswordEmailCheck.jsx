import React from "react";
import UserLayout from "../../../components/UserLayout";
import { Button, Form, Input } from "antd";
import "./passwordemailcheck.css";
import { useRecoilState } from "recoil";
import { emailForm } from "../../../atoms/loginAtom";

const PasswordEmailCheck = () => {
  const [isEmail, setIsEmail] = useRecoilState(emailForm);
  const initData = {
    email: "",
  };
  const onSubmit = async data => {
    console.log(data);

    try {
      setIsEmail(prev => ({
        ...prev,
        ...data,
      }));
      const res = await axios.post("/api/email-check", {
        email: `${data.email}`,
      });
      console.log(res);
      // console.log(userInfo);

      navigate("/login/email");
    } catch (error) {
      console.log(error);
    }
  };
  const goCancle = () => {
    navigate("/");
  };
  return (
    <div className="passDiv">
      <div className="mb-10">
        <UserLayout />
      </div>
      <div className="flex mx-auto m-0 ">
        <span className="flex mb-5" style={{ fontSize: 24 }}>
          비밀번호를 잊으셨나요?
        </span>
      </div>
      <div className="flex mx-auto m-0 ">
        <span className="flex mb-5" style={{ fontSize: 14, fontWeight: 50 }}>
          비밀번호 변경을 위해 이메일을 입력해주세요.
        </span>
      </div>
      <Form
        initialValues={initData}
        style={{ width: 320, margin: "0 auto" }}
        onFinish={onSubmit}
      >
        <Form.Item
          name={"email"}
          label="이메일"
          rules={[
            { required: true, message: "이메일은 필수 항목입니다." },
            {
              type: "email",
              message: "유효한 이메일 주소를 입력해주세요.",
            },
          ]}
        >
          <Input
            style={{ alignItems: "center" }}
            placeholder="이메일을 입력하세요."
          />
        </Form.Item>
        <Form.Item className="clickbuttons">
          <button className="cancle" onClick={() => goCancle()}>
            취소
          </button>
          <Button htmlType="submit" className="nextButton">
            다음
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PasswordEmailCheck;
