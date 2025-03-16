import { FaChevronRight } from "react-icons/fa";
import { loginApi } from "../../apis/login";

// yup
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import { businessDetailState } from "../../atoms/businessAtom";
import { useState } from "react";
import { Popup } from "../ui/Popup";

const schema = yup.object({
  openingTime: yup.string(),
  closingTime: yup.string(),
  tel: yup.string().length(13, "11자리 숫자를 입력해주세요."),
});
const ExpertInfoEdit = ({ isExpertInfoEdit, setIsExpertInfoEdit, busiId }) => {
  const businessState = useRecoilValue(businessDetailState);
  const [businessInfo, setbusinessInfo] = useRecoilState(businessDetailState);
  console.log("businessState", businessState);
  const formatPhoneNumber = phone => {
    if (!phone) return "-";
    const cleaned = String(phone).replace(/\D/g, "");
    if (cleaned.length === 11) {
      return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"); // 11자리: 3-4-4
    }
    if (cleaned.length === 10) {
      return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"); // 10자리: 3-3-4
    }
    return phone;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      openingTime: businessState.openingTime,
      closingTime: businessState.closingTime,
      tel: formatPhoneNumber(businessState.tel),
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const onSubmit = async data => {
    const cleanedData = {
      ...data,
      tel: data.tel.replace(/\D/g, ""),
      businessId: busiId,
    };
    console.log("제출된 데이터:", cleanedData);

    try {
      const res = await loginApi.put(`/api/business/detail`, cleanedData);
      setbusinessInfo({
        ...businessInfo,
        openingTime: data.openingTime,
        closingTime: data.closingTime,
        tel: cleanedData.tel,
      });
      console.log(res.data);
      setPopupMessage("업체정보 수정이 완료되었습니다.");
      setIsPopupOpen(true);
    } catch (error) {
      console.log(error);
      setPopupMessage("저장에 실패했습니다. 다시 시도해주세요.");
      setIsPopupOpen(true);
    }
  };

  const formatBusinessNumber = number =>
    number
      ? number.replace(/(\d{3})(\d{2})(\d{4})/, "$1-$2-$3")
      : "사업자 번호 없음";

  let serviceType;
  switch (businessState.categoryId) {
    case 1:
      serviceType = "청소";
      break;
    case 2:
      serviceType = "이사";
      break;
    case 3:
      serviceType = "세차";
      break;
    default:
      serviceType = "서비스";
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="edit-info-form">
        <div className="info-area edit-info-area">
          <h2>{businessState.businessName}</h2>
          <span>{businessState.address}</span>
          <div>
            <p>
              <FaChevronRight /> 카테고리 :{" "}
              <em>{`${serviceType} ${"_"} ${businessState.detailTypeName}`}</em>
            </p>
            <p>
              <FaChevronRight /> 영업시간 :{" "}
              <em>
                <input
                  type="time"
                  name="openingTime"
                  id="openingTime"
                  {...register("openingTime")}
                  onFocus={e => e.target.showPicker()}
                />{" "}
                ~{" "}
                <input
                  type="time"
                  name="closingTime"
                  id="closingTime"
                  {...register("closingTime")}
                  onFocus={e => e.target.showPicker()}
                />
              </em>
            </p>
            <p>
              <FaChevronRight />
              사업자번호 :{" "}
              <em>{formatBusinessNumber(businessState.businessNum)}</em>
            </p>
            <p>
              <FaChevronRight /> 대표번호 :{" "}
              <em>
                <input
                  type="text"
                  name="tel"
                  id="tel"
                  {...register("tel")}
                  placeholder="예) 010-1234-5678"
                  onChange={e => {
                    const formatted = formatPhoneNumber(e.target.value);
                    setValue("tel", formatted);
                  }}
                />
                {errors.tel && (
                  <em
                    style={{
                      display: "block",
                      position: "absolute",
                      top: "calc(100% + 8px)",
                      color: "red",
                      fontSize: "12px",
                    }}
                  >
                    {errors.tel.message}
                  </em>
                )}
              </em>
            </p>
          </div>
          <button
            type="submit"
            style={{ display: isExpertInfoEdit ? "flex" : "none" }}
          >
            저장
          </button>
        </div>
      </form>

      <Popup
        isOpen={isPopupOpen}
        onClose={() => {
          setIsPopupOpen(false);
          setIsExpertInfoEdit(false);
        }}
        message={popupMessage}
        showConfirmButton={true}
      />
    </>
  );
};

export default ExpertInfoEdit;
