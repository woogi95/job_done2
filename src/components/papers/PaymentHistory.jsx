import { Checkbox, Stack, Text, Textarea, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { getCookie } from "../../apis/cookie";
import { loginApi } from "../../apis/login";
import { papersState } from "../../atoms/businessAtom";
import LoadingPopup from "../kakao-pay/LoadingPopup";
import { BtnAreaDiv, FormDiv, PaperContDiv, PapersDiv } from "./papers";
import axios from "axios";

const PaymentHistory = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("환불요청을 하였습니다.");
  const [isSuccess, setIsSuccess] = useState(false);
  const [serviceId, setServiceId] = useState(null);
  const [papers, setPapers] = useRecoilState(papersState);
  const papersInfo = useRecoilValue(papersState);
  const navigate = useNavigate();
  const [refundModal, setRefundModal] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const [text, setText] = useState("");
  const [isQaTypeList, setIsQaTypeList] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  const getEstimate = async serviceId => {
    if (!serviceId) return;
    try {
      // console.log("이게 찍히니????", serviceId);
      const res = await loginApi.get(
        `/api/service/detail?serviceId=${serviceId}`,
      );
      console.log("견적서 정보", res.data.resultData);
      if (res.data) {
        setPapers(res.data.resultData);
      }
      // console.log(res.data.DataMessage);
    } catch (error) {
      console.error("견적서 조회 중 오류 발생:", error);
    }
  };

  const qaTypeId = {
    qaTypeId: 4,
  };

  const qaTypeList = async () => {
    try {
      const res = await loginApi.get("/api/qa/qaTypeId", {
        params: qaTypeId,
      });
      console.log("qaTypeList", res.data);
      console.log("qaTypeList", res.data.resultData);
      setIsQaTypeList(res.data.resultData);
    } catch (error) {
      console.error("qaTypeList 조회 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    qaTypeList();
  }, []);

  const postRefund = async serviceId => {
    try {
      const formData = new FormData();

      const qaPostData = {
        qaTypeDetailId: 0,
        contents: text,
        qaReportReason: "SERVICE",
        qaTargetId: serviceId,
      };

      formData.append(
        "p",
        new Blob([JSON.stringify(qaPostData)], {
          type: "application/json",
        }),
      );
      console.log("환불 내용 : ", qaPostData);

      selectedImages.forEach(file => {
        formData.append("pics", file);
      });

      for (const pair of formData.entries()) {
        console.log("FormData 엔트리:", pair[0], pair[1]);
      }

      const res = await loginApi.post(`/api/qa`, qaPostData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("환불 내용 : ", text);
      console.log("뭐 오는데? : ", res.data.resultData);

      if (res.data) {
        setIsSuccess(true);
        setPopupMessage("환불요청을 하였습니다.");
        setIsPopupOpen(true);
      } else {
        setIsSuccess(false);
        setPopupMessage("환불요청에 실패하셨습니다. 잠시후 다시 시도해주세요.");
        setIsPopupOpen(true);
      }
    } catch (error) {
      console.log(error);
      setIsSuccess(false);
      setPopupMessage("환불요청에 실패하셨습니다. 잠시후 다시 시도해주세요.");
      setIsPopupOpen(true);
    }
  };

  const formatPhoneNumber = phone =>
    phone ? phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3") : "-";
  const formatBusinessNumber = number =>
    number
      ? number.replace(/(\d{3})(\d{2})(\d{4})/, "$1-$2-$3")
      : "사업자 번호 없음";

  const handleClickNewPage = async () => {
    if (!serviceId) {
      console.error("serviceId가 없습니다.");
      return;
    }
    setIsLoading(true);
    // console.log("결제 누구야!", serviceId);
    try {
      const width = 480;
      const height = 600;
      const left = (window.innerWidth - width) / 2;
      const top = (window.innerHeight - height) / 2;

      const res = await loginApi.post(
        `/api/payment/ready?serviceId=${serviceId}`,
      );
      if (res.data?.next_redirect_pc_url) {
        const paymentWindow = window.open(
          res.data.next_redirect_pc_url,
          "_blank",
          `width=${width},height=${height},left=${left},top=${top}`,
        );

        const checkWindowClosed = setInterval(() => {
          if (paymentWindow.closed) {
            setIsLoading(false);
            clearInterval(checkWindowClosed);
            navigate("/mypage/usage");
          }
        }, 1000);
      }
    } catch (error) {
      console.error("결제 준비 중 오류 발생:", error);
      setIsLoading(false);
    }
  };

  const handleConfirm = () => {
    navigate("/mypage/reservation");
  };

  const handleImageUpload = e => {
    const files = Array.from(e.target.files);
    setSelectedImages(prevImages => [...prevImages, ...files]);

    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviewImages(prevPreviews => [...prevPreviews, ...newPreviews]);

    // for (let i = 0; i < files.length; i++) {
    //   const reader = new FileReader();
    //   reader.onload = e => {
    //     imagesArray.push(e.target.result);
    //     if (imagesArray.length === files.length) {
    //       setPreviewImages(prev => [...prev, ...imagesArray]);
    //     }
    //   };
    //   reader.readAsDataURL(files[i]);
    // }
  };

  const handleRemoveImage = index => {
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const storedServiceId = getCookie("serviceId");
    if (storedServiceId) {
      setServiceId(storedServiceId);
    }
  }, []);

  useEffect(() => {
    if (serviceId) {
      getEstimate(serviceId);
    }
  }, [serviceId]);

  const onChangeText = text => {
    setText(text);
  };

  return (
    <PapersDiv>
      <div className="inner">
        <div className="logo"></div>
        <PaperContDiv>
          <h2 className="tit">
            {papersInfo.userName}님
            <strong className="!text-[#FF3044]">
              <br />
              결제가 완료
            </strong>
            되었습니다.
          </h2>
          <span className="description">
            {/* 기다려 주셔서 감사합니다. <br /> */}
            예약 내역 및 견적 내용은 <em>마이페이지{">"}예약현황</em>에서
            확인하실 수 있습니다.
            <br /> 수정사항이나 문의 사항이 있으시면, "문의하기"를 통해 연락
            주시기 바랍니다.
            <br />
            <b>
              견적서를 받은 후 결제가 지연될 경우, 해당 견적은 취소될 수
              있습니다.
            </b>
          </span>
          <FormDiv>
            <div className="company-info">
              <h3>결제 내역</h3>
              <ul>
                <li>
                  <p>결제 금액</p>
                  <span className="font-semibold">
                    {papersInfo.price.toLocaleString()}원
                  </span>
                </li>
                <li>
                  <p>결제 날짜</p>
                  <span>{papersInfo.paidAt}</span>
                </li>
              </ul>
            </div>
            <div className="company-info">
              <h3>예약업체 정보</h3>
              <ul>
                <li>
                  <p>등록번호</p>
                  <span>{formatBusinessNumber(papersInfo.businessNum)}</span>
                </li>
                <li>
                  <p>업체번호</p>
                  <span>{formatPhoneNumber(papersInfo.businessPhone)}</span>
                </li>
                <li>
                  <p>상호명</p>
                  <span>{papersInfo.businessName}</span>
                </li>
                <li>
                  <p>분류</p>
                  <span>
                    {papersInfo.categoryName} {">"} {papersInfo.detailTypeName}
                  </span>
                </li>
                <li>
                  <p>주소</p>
                  <span>{papersInfo.businessAddress}</span>
                </li>
              </ul>
            </div>
            <div className="user-info">
              <h3>예약자 정보</h3>
              <ul>
                <li>
                  <p>예약자</p>
                  <span>{papersInfo.userName}</span>
                </li>
                <li>
                  <p>연락처</p>
                  <span>{formatPhoneNumber(papersInfo.userPhone)}</span>
                </li>
                <li>
                  <p>주소</p>
                  <span>{papersInfo.address}</span>
                </li>
              </ul>
            </div>
            <div className="estimate-info">
              <h3>견적 내용</h3>
              <ul>
                <li>
                  <p>견적일</p>
                  <span>{papersInfo.updatedAt}</span>
                </li>
                <li>
                  <p>방문날짜</p>
                  <span>
                    {papersInfo.startDate} ~ {papersInfo.endDate}
                  </span>
                </li>
                <li>
                  <p>예정시간</p>
                  <span>
                    {papersInfo.mstartTime} - {papersInfo.mendTime}
                  </span>
                </li>
                <li>
                  <p>평수</p>
                  <span>{papersInfo.pyeong} 평</span>
                </li>
                {papersInfo.options?.length > 0 && (
                  <li className="option">
                    <p>옵션</p>
                    <ul>
                      {papersInfo.options.map((option, index) => (
                        <li key={index}>
                          <p>
                            {option.optionName}{" "}
                            <em>({option.optionDetailName})</em>
                          </p>
                          <span>
                            {option.optionDetailPrice.toLocaleString()}원
                          </span>
                        </li>
                      ))}
                    </ul>
                  </li>
                )}
                {papersInfo.etc?.length > 0 && (
                  <li className="option">
                    <p>추가옵션</p>
                    <ul>
                      {papersInfo.etc.map((option, index) => (
                        <li key={index}>
                          <p>
                            {option.etcComment}
                            {/* <em>({option.etcPrice})</em> */}
                          </p>
                          <span>{option.etcPrice.toLocaleString()}원</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                )}
                {/* "etc": [
      {
        "etcId": 0,
        "etcPrice": 0,
        "etcComment": "string"
      }
    ], */}
                <li>
                  <p>견적비용</p>
                  <span>{papersInfo.price.toLocaleString()}원</span>
                </li>
                <li>
                  <p>특이사항</p>
                  <span>{papersInfo.addComment}</span>
                </li>
              </ul>
            </div>
          </FormDiv>
          <BtnAreaDiv>
            <button
              className="bg-[#ff7b47] !text-[#fff]"
              onClick={() => setRefundModal(true)}
            >
              환불요청
            </button>
            <button className="confirm !bg-[#3887FF]" onClick={handleConfirm}>
              확인
            </button>
          </BtnAreaDiv>
        </PaperContDiv>
      </div>
      {refundModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <div className="flex flex-col items-center mb-6">
              <h2 className="text-[18px] font-normal mb-4 text-[#1e1e1e]">
                서비스 환불
              </h2>
              <div className="flex justify-center items-center h-[1px] bg-gray-200 w-[70%]"></div>
              <p className="text-[#1e1e1e] my-4">신고 사유를 선택해 주세요.</p>
              <VStack align="stretch" spacing={3}>
                {isQaTypeList.map((item, index) => (
                  <Stack
                    direction="column"
                    align="flex-start"
                    spacing={2}
                    key={index}
                  >
                    <Checkbox variant={item} borderColor="gray.300">
                      {item.qaDetailReason}
                    </Checkbox>
                  </Stack>
                ))}
              </VStack>
              <span className="flex justify-end text-[14px] text-gray-500 my-1 w-full">
                {text.length}/1000
              </span>
              <Textarea
                placeholder="신고 사유를 입력해주세요."
                maxLength={1000}
                className="mb-1"
                height="150px"
                resize="none"
                overflowY="auto"
                onChange={e => onChangeText(e.target.value)}
              />
            </div>

            <div className="flex justify-center  my-2">
              <label className="flex items-center justify-center px-4 py-2 w-[120px] bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer">
                이미지 추가
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>

            <div className="flex flex-wrap gap-2 w-full min-h-[100px] border-2 border-dashed border-gray-300 rounded-lg p-2">
              {previewImages.map((image, index) => (
                <div key={index} className="relative w-[80px] h-[80px]">
                  <div className="w-full h-full border border-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={image}
                      alt={`preview ${index}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="absolute -top-2 -right-2 bg-[#F53A3A] text-white rounded-full w-5 h-5 flex items-center justify-center text-sm"
                  >
                    <RxCross2 className="text-[16px]" />
                  </button>
                </div>
              ))}
            </div>
            <span className="flex text-[14px] text-gray-500 my-2 w-full">
              욕설 및 비속어는 제제대상입니다.
              <br />
              요청된 환불문의는 수정 및 취소가 불가하오니 유의바랍니다.
            </span>
            <div className="flex justify-center gap-3 mt-2">
              <button
                className="px-4 py-2 w-[100px] bg-[#ffffff] text-[#1e1e1e] rounded border border-[#d1d1d1]"
                onClick={() => setRefundModal(false)}
              >
                취소
              </button>
              <button
                className="px-4 py-2 w-[100px] bg-[#3887FF] text-white rounded border border-[#d1d1d1]"
                onClick={postRefund}
              >
                신고하기
              </button>
            </div>
          </div>
        </div>
      )}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <div className="flex flex-col items-center mb-6">
              <h2 className="text-[18px] font-normal mb-4 text-[#1e1e1e]">
                {isSuccess ? "환불 요청 성공" : "환불 요청 실패"}
              </h2>
              <div className="flex justify-center items-center h-[1px] bg-gray-200 w-[70%]"></div>
              <p className="text-[#1e1e1e] my-4 text-center">{popupMessage}</p>
            </div>
            <div className="flex justify-center gap-3 mt-2">
              <button
                className="px-4 py-2 bg-[#3887FF] text-white rounded border border-[#d1d1d1]"
                onClick={() => {
                  setIsPopupOpen(false);
                  if (isSuccess) {
                    setRefundModal(false);
                  }
                }}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
      {/* {isLoading && <LoadingPopup />} */}
    </PapersDiv>
  );
};

export default PaymentHistory;
