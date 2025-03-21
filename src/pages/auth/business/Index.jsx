import { Button, DatePicker, Form, Input, Select, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  busiFile,
  businessInfo,
  busiNumFile,
  numDubCheck,
} from "../../../atoms/businessAtom";
import { useNavigate } from "react-router-dom";
import {
  categoriesStateS,
  detailTypesStateS,
} from "../../../atoms/categoryAtom";
import axios from "axios";
import JobBLogo from "../../../components/JobBLogo";
import dayjs from "dayjs";
import { loginApi } from "../../../apis/login";

function BusinessSignUp() {
  const [numModal, setNumMOdal] = useRecoilState(numDubCheck);
  const [form] = Form.useForm();
  const [busiInfo, setBusiInfo] = useRecoilState(businessInfo);
  const [fileList, setFileList] = useRecoilState(busiFile);
  const [numFileList, setnumFileList] = useRecoilState(busiNumFile);
  const [category, setCategory] = useRecoilState(categoriesStateS);
  const [detailTypes, setDetailTypes] = useRecoilState(detailTypesStateS);
  const [errorModal, setErrorModal] = useState(false);
  const [selectDetail, setSelectDetail] = useState(0);
  const sucess = () => {
    setNumMOdal(false);
    navigate("/");
  };
  // : DatePickerProps['onChange']
  const goCancle = () => {
    navigate("/");
  };

  const navigate = useNavigate();
  // const initData = {
  //   businessNum: busiInfo.businessNum,
  //   businessName: busiInfo.businessName,
  //   address: busiInfo.address,
  //   categoryId: "",
  //   detailTypeId: 0,
  //   busiCreatedAt: busiInfo.busiCreatedAt,
  //   tel: "",
  //   logo: "",
  // };

  const handleChange = value => {
    setSelectDetail(value);
  };
  const handleChangecat = value => {
    getDetailTypes(value);
  };
  // 로고 사진
  const handleFileChange = ({ file, fileList }) => {
    setFileList(fileList); // 파일 목록 상태 업데이트
    // setBusiInfo(prev => ({ ...prev, logo: file.originFileObj })); // Recoil 상태 업데이트
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
  // 중분류 get
  const getDetailTypes = async data => {
    try {
      const res = await axios.get(`/api/category/detail?categoryId=${data}`);

      setDetailTypes(res.data.resultData);
    } catch (error) {
      console.log(error);
    }
  };
  // 대분류 get
  const getCategori = async () => {
    try {
      const res = await axios.get("/api/category");

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
  // 최종 등록 요청
  const onSubmit = async data => {
    try {
      const formData = new FormData();

      const requestData = {
        businessNum: busiInfo.businessNum,
        businessName: data.businessName,
        address: data.address,
        detailTypeId: data.detailTypeId,
        busiCreatedAt: dayjs(data.busiCreatedAt).format("YYYY-MM-DD"),
        tel: data.tel,
        lat: 0,
        lng: 0,
      };

      // JSON 데이터를 FormData에 추가
      formData.append(
        "p",
        new Blob([JSON.stringify(requestData)], {
          type: "application/json",
        }),
      );
      if (data.logo) {
        formData.append("logo", data.logo.file);
      }
      if (numFileList) {
        // 파일 추가 (data.pic이 있는 경우)
        formData.append("paper", numFileList[0].originFileObj);
      }

      // `Content-Type` 헤더는 설정하지 않음 (자동 설정)
      const res = await loginApi.post("/api/business/sign-up", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        setNumMOdal(true);
      }
    } catch (error) {
      setErrorModal(true);
      console.log(error);
    }
  };
  useEffect(() => {
    getCategori();
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
  useEffect(() => {
    form.setFieldsValue({
      businessName: busiInfo.businessName,
      address: busiInfo.address,
      tel: busiInfo.tel,
      busiCreatedAt: busiInfo.busiCreatedAt
        ? dayjs(busiInfo.busiCreatedAt)
        : null,
    });
  }, [busiInfo]);
  return (
    <div className="signUpDiv">
      <JobBLogo />
      <Form
        form={form}
        initialValues={{
          busiInfo,
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
          <DatePicker format={"YYYY-MM-DD"} />
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
      {numModal && (
        <div className="num-ModalFull items-center justify-center">
          <div className="num-Modal">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 30,
                marginTop: 20,
              }}
            >
              <h1>등록 요청이 완료되었습니다.</h1>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button onClick={e => sucess(e)}>확인</button>
            </div>
          </div>
        </div>
      )}
      {errorModal && (
        <div className="num-ModalFull items-center justify-center">
          <div className="num-Modal">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 30,
                marginTop: 20,
              }}
            >
              <h1>이미 등록된 사업자 번호 입니다.</h1>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button onClick={() => setErrorModal(false)}>확인</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BusinessSignUp;
