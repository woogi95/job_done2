import UserLayout from "../../../components/layouts/UserLayout";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setCookie } from "../../../apis/cookie";

const Adminlogin = () => {
  const navigate = useNavigate();
  const initData = {
    aid: "",
    apw: "",
  };

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
  return (
    <div>
      <div style={{ marginBottom: 40 }}>
        <UserLayout />
      </div>
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
    </div>
  );
};

export default Adminlogin;
