import { Button, Form, Input } from "antd";
import { useRecoilState } from "recoil";
import { emailForm, isOpenModalUpw, upwCheck } from "../../../atoms/loginAtom";
import "./Index.css";
import "./signuppage.css";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import UserLayout from "../../../components/UserLayout";

function PasswordEdit() {
  const [match, setMatch] = useRecoilState(upwCheck);
  const [isUpw, setIsUpw] = useRecoilState(isOpenModalUpw);
  const [emailInfo] = useRecoilState(emailForm);
  const [upwForm] = Form.useForm();
  const navigate = useNavigate();

  const initData = {
    upw: "",
    upwConfirm: "",
    email: emailInfo.email,
  };

  //취소버튼
  const goCancle = () => {
    navigate("/login");
  };
  // 비밀번호 확인
  const handleChangePassword = () => {
    const pw = upwForm.getFieldValue("upw");
    const pwConfirm = upwForm.getFieldValue("upwConfirm");
    if (pwConfirm) {
      setMatch(pw === pwConfirm);
    }
  };
  const goLogin = () => {
    setIsUpw(false);
    navigate("/login");
  };
  // 폼 제출
  const onSubmit = async data => {
    console.log(data);
    console.log(initData.email);
    try {
      const res = await axios.patch("/api/user/password", {
        newPassword: data.upw,
        email: initData.email,
      });
      console.log(res.data.resultData);
      // console.log(userInfo);
      if (res.data.resultData === 1) {
        setIsUpw(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="signUpDiv" style={{ width: 320, margin: "0 auto" }}>
      <div style={{ marginBottom: 30 }}>
        <UserLayout />
      </div>
      <div
        style={{ display: "flex", margin: "0 auto", justifyContent: "center" }}
      >
        <span style={{ marginBottom: 30, fontSize: 24 }}>비밀번호 변경</span>
      </div>
      <Form
        form={upwForm}
        initialValues={initData}
        style={{ width: 320, margin: "0 auto" }}
        onFinish={onSubmit}
      >
        <Form.Item
          name={"upw"}
          label="비밀번호"
          rules={[
            { required: true, message: "비밀번호는 필수 항목입니다." },
            {
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
              message:
                "비밀번호는 최소 8자 이상이며, 대소문자와 숫자를 포함해야 합니다.",
            },
          ]}
        >
          <Input.Password
            placeholder="비밀번호를 입력하세요."
            onChange={handleChangePassword}
          />
        </Form.Item>
        <Form.Item
          name={"upwConfirm"}
          label="비밀번호 확인"
          rules={[
            { required: true, message: "비밀번호 확인은 필수 항목입니다." },
          ]}
        >
          <Input.Password
            placeholder="비밀번호를 확인하세요."
            onChange={handleChangePassword}
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
      {isUpw && (
        <div className="upwModal">
          <h1>비밀번호가 변경되었습니다.</h1>
          <button onClick={() => goLogin()}>확인</button>
        </div>
      )}
    </div>
  );
}

export default PasswordEdit;
