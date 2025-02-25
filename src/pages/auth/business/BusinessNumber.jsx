import React, { useEffect, useState } from "react";
import {
  businessInfo,
  busiNumFile,
  checkMsg,
} from "../../../atoms/businessAtom";
import { useRecoilState } from "recoil";
import { Form, Button, Image, Upload, Input } from "antd";
import "./businessnumber.css";
import { useNavigate } from "react-router-dom";
import JobBLogo from "../../../components/JobBLogo";
import { loginApi } from "../../../apis/login";
import axios from "axios";
// import axios from "axios";
function BusinessNumber() {
  const [form] = Form.useForm();
  const [result, setResult] = useState(null); // 결과를 저장할 상태
  const [error, setError] = useState(null); // 에러 메시지를 저장할 상태

  const [busiInfo, setBusiInfo] = useRecoilState(businessInfo);

  const [fileList, setFileList] = useRecoilState(busiNumFile); // 파일 상태
  const [previewImages, setPreviewImages] = useState([]); // 이미지 미리보기 상태
  const [checkMessage, setCheckMessage] = useRecoilState(checkMsg);
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    form.setFieldsValue({ businessNum: busiInfo.businessNum });
  }, [busiInfo]);
  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
    // 이미지 미리보기 URL 생성
    const previews = fileList.map(file =>
      file.originFileObj ? URL.createObjectURL(file.originFileObj) : file.url,
    );
    setPreviewImages(previews);
  };

  const nextPage = async data => {
    const formData = new FormData();
    if (data) {
      formData.append("paper", data);
    }
    try {
      const res = await axios.post("/api/ocr/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
      const basicData = res.data;
      console.log(basicData);
      setBusiInfo(prev => ({
        ...prev, // 기존 데이터 유지
        ...basicData, // 서버 데이터 덮어쓰기
      }));
      console.log(busiInfo);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchBusinessStatus = async data => {
    console.log(data);
    setCheckMessage(true);

    try {
      const response = await fetch(
        "https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=SYnAPANxYlrtHeae0VoAU1DN2akTqdFZEu4CQCywJBBHl7Ta0O1OH9jceiUbdJ0U%2BVtnIL%2BFWRemuJIT1UvLfg%3D%3D",
        // ", // 실제 서비스 키로 대체
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ b_no: [data] }),
        },
      );

      const result = await response.json();

      if (result && result.data) {
        setResult(result);

        if (result.match_cnt === 1) {
          setIsNextButtonDisabled(false);
        } else {
          setIsNextButtonDisabled(true);
        }
      }
    } catch (err) {
      console.error(err.message);
      setError(err.message);
      setCheckMessage(false);
      setIsNextButtonDisabled(true);
    }
  };

  // 업체 최종 등록
  const onSubmit = () => {
    navigate("/business");
  };
  return (
    <div>
      <JobBLogo />
      <Form
        form={form}
        initialValues={busiInfo}
        onFinish={onSubmit}
        style={{ width: 320, margin: "0 auto", display: "block" }}
      >
        <Form.Item
          label="사업자 등록증"
          name={"paper"}
          rules={[{ required: false }]}
        >
          <Upload
            fileList={fileList}
            beforeUpload={file => {
              nextPage(file);
              return false;
            }}
            onChange={handleFileChange}
            maxCount={3}
          >
            <Button>사진/파일첨부</Button>
          </Upload>
        </Form.Item>
        {/* 미리보기 */}

        {previewImages.length > 0 && (
          <div style={{ marginTop: "20px" }}>
            <h3>미리보기:</h3>
            {previewImages.map((url, index) => (
              <Image
                key={index}
                src={url}
                alt={`미리보기 ${index}`}
                style={{ width: "100%", height: 160, marginRight: 10 }}
              />
            ))}
          </div>
        )}
        <Form.Item
          name="businessNum"
          label="사업자 등록 번호"
          rules={
            checkMessage
              ? [
                  { required: true, message: "사업자 등록 번호를 입력하세요." },
                  {
                    pattern: /^\d{8,10}$/,
                    message: "사업자 등록 번호 형식이 잘못되었습니다.",
                  },
                ]
              : [
                  {
                    pattern: /^\d{8,10}$/,
                    message: "중복된 사업자 등록 번호 입니다.",
                  },
                ]
          }
        >
          <Input
            placeholder="사업자 등록 번호를 입력하세요."
            suffix={
              <Button
                type="button"
                onClick={() => {
                  const number = form.getFieldValue("businessNum");
                  fetchBusinessStatus(number);
                }}
                className="bg-blue-500 border border-gray-400 w-[46px] h-6 rounded-lg text-white "
              >
                조회
              </Button>
            }
          />
        </Form.Item>
        {result && <pre>{result.data && result.data[0]?.tax_type}</pre>}
        {error && <p style={{ color: "red" }}>{error.data}</p>}

        <Form.Item className="clickbuttons">
          <button type="button" className="cancle" onClick={() => goCancle()}>
            취소
          </button>
          <Button
            htmlType="submit"
            className="nextButton"
            disabled={isNextButtonDisabled} // 🚀 match_cnt 값에 따라 버튼 활성화/비활성화
          >
            다음
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default BusinessNumber;
