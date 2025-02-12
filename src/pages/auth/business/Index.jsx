import { Button, DatePicker, Form, Input, Select, Upload } from "antd";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { busiFile, businessInfo } from "../../../atoms/businessAtom";
import { useNavigate } from "react-router-dom";
import {
  categoriesStateS,
  detailTypesStateS,
} from "../../../atoms/categoryAtom";
import axios from "axios";
import JobBLogo from "../../../components/JobBLogo";

function BusinessSignUp() {
  const [form] = Form.useForm();
  const [busiInfo, setBusiInfo] = useRecoilState(businessInfo);
  const [fileList, setFileList] = useRecoilState(busiFile);
  const [category, setCategory] = useRecoilState(categoriesStateS);
  const [detailTypes, setDetailTypes] = useRecoilState(detailTypesStateS);

  // : DatePickerProps['onChange']

  const navigate = useNavigate();
  const initData = {
    userId: 0,
    businessNum: "",
    businessName: "",
    address: "",
    categoryId: "",
    detailTypeId: 0,
    busiCreatedAt: "",
    tel: "",
    logo: "",
  };

  const handleChange = value => {
    console.log(`selected ${value}`);
  };
  const handleChangecat = value => {
    getDetailTypes(value);
  };
  // 로고 사진
  const handleFileChange = ({ file, fileList }) => {
    setFileList(fileList); // 파일 목록 상태 업데이트
    setBusiInfo(prev => ({ ...prev, logo: file.originFileObj })); // Recoil 상태 업데이트
  };
  // 주소 검색 api
  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: data => {
        // 우편번호와 기본주소 입력
        // Form의 값도 업데이트
        form.setFieldsValue({ address: data.address }); // Form의 값도 업데이트
      },
    }).open();
  };
  // 상태 등록
  const onSubmit = data => {
    // 문자열로 변환
    const formattedData = {
      ...data,
      // busiCreatedAt: data.busiCreatedAt.format("YYYY.MM.DD"),
    };
    console.log(formattedData);
    setBusiInfo(prev => ({
      ...prev,
      ...formattedData,
      // busiCreatedAt: data.busiCreatedAt.format("YYYY.MM.DD"),
    }));
    navigate("/business/number");
    // } catch (error) {
    //   console.log(error);
    // }
  };
  // 중분류 get
  const getDetailTypes = async data => {
    console.log(data);
    try {
      const res = await axios.get(`/api/category/detail?categoryId=${data}`);
      console.log(res.data.resultData);
      setDetailTypes(res.data.resultData);
    } catch (error) {
      console.log(error);
    }
  };
  // 대분류 get
  const getCategori = async () => {
    try {
      const res = await axios.get("/api/category");
      console.log(res);
      setCategory(res.data.resultData);
    } catch (err) {
      console.log(err);
    }
  };
  // 대분류 맵핑
  const categoryList = category.map(item => ({
    value: item.categoryId,
    label: item.categoryName,
  }));
  // 중분류 맵핑
  const detailTypeList = detailTypes.map(item => ({
    value: item.detailTypeId,
    label: item.detailTypeName,
  }));
  useEffect(() => {
    getCategori();
    getDetailTypes();
    // Daum 우편번호 스크립트 로드
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);

    // 컴포넌트 언마운트 시 스크립트 제거
    return () => {
      document.body.removeChild(script);
    };
  }, [detailTypes]);

  return (
    <div className="signUpDiv">
      <JobBLogo />
      <Form
        form={form}
        initialValues={{
          initData,
        }}
        style={{ width: 320, margin: "0 auto" }}
        onFinish={onSubmit}
      >
        {/* 업체 이름 */}
        <Form.Item
          name={"businessName"}
          label="기업 이름"
          rules={[{ required: true, message: "기업 이름은 필수 항목입니다." }]}
        >
          <Input placeholder="기업 이름을 입력하세요." />
        </Form.Item>
        {/* 업체 주소 */}
        <Form.Item
          name="address"
          label="기업 주소"
          rules={[{ required: true, message: "기업 주소를 입력해 주세요." }]}
        >
          <Input
            className="input"
            id="acaAddr"
            placeholder="기업 기본주소"
            readOnly
          />
        </Form.Item>
        <Form.Item className="flex">
          <button
            type="button"
            className="min-w-[84px] h-10 bg-[#E8EEF3] rounded-xl font-bold text-sm "
            onClick={() => handleAddressSearch()}
          >
            주소 검색
          </button>
        </Form.Item>
        {/* 상세주소 킾 */}
        {/* <Form.Item
          name="aca_addr2"
          className="ml-[130px]"
          rules={[{ required: true, message: "기업 주소를 입력해 주세요." }]}
        >
          <Input
            className="input"
            id="acaAddr2"
            maxLength={20}
            placeholder="학원 상세주소"
          />
        </Form.Item> */}
        {/* 전화번호 */}
        <Form.Item
          name={"tel"}
          label="기업 전화번호"
          rules={[
            { required: true, message: "기업 전화번호는 필수 항목입니다." },
            {
              pattern: /^0\d{8,10}$/,
              message: "번호 형식에 맞지 않습니다.",
            },
          ]}
        >
          <Input placeholder="휴대폰 번호를 입력하세요." />
        </Form.Item>
        {/* 카테고리 */}
        <Form.Item name={"categoryId"} label="업체 분류">
          <Select
            style={{
              width: 150,
            }}
            onChange={handleChangecat}
            options={categoryList}
          />
        </Form.Item>
        <Form.Item name={"detailTypeId"} label="상세 정보">
          <Select
            style={{
              width: 150,
            }}
            onChange={handleChange}
            options={detailTypeList}
          />
        </Form.Item>
        {/* 로고 사진  */}
        <Form.Item
          label="업체 상호"
          name={"logo"}
          rules={[{ required: false }]}
        >
          <Upload
            fileList={fileList}
            beforeUpload={() => false}
            onChange={handleFileChange}
            maxCount={1}
          >
            <Button>이미지 선택</Button>
          </Upload>
        </Form.Item>
        {/* 창업날짜 */}
        <Form.Item label="창업 날짜" name={"busiCreatedAt"}>
          <DatePicker format={"YYYY.MM.DD"} />
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
}

export default BusinessSignUp;
