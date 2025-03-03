import { FaChevronRight } from "react-icons/fa";
import { loginApi } from "../../apis/login";

// yup
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import { businessDetailState } from "../../atoms/businessAtom";

const schema = yup.object({
  openingTime: yup.string(),
  closingTime: yup.string(),
  tel: yup.string(),
});
const ExpertInfoEdit = ({ isExpertInfoEdit, setIsExpertInfoEdit, busiId }) => {
  const businessState = useRecoilValue(businessDetailState);
  const [businessInfo, setbusinessInfo] = useRecoilState(businessDetailState);
  console.log("businessState", businessState);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      openingTime: businessState.openingTime,
      closingTime: businessState.closingTime,
      tel: businessState.tel,
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = async data => {
    console.log("제출된 데이터:", data);
    const requestData = { ...data, businessId: busiId };
    console.log("API 요청 데이터:", requestData);

    try {
      const res = await loginApi.put(`/api/business/detail`, requestData);
      setbusinessInfo({
        ...businessInfo,
        openingTime: data.openingTime,
        closingTime: data.closingTime,
        tel: data.tel,
      });
      setIsExpertInfoEdit(false);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const formatBusinessNumber = number =>
    number
      ? number.replace(/(\d{3})(\d{2})(\d{4})/, "$1-$2-$3")
      : "사업자 번호 없음";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="edit-info-form">
      <div className="info-area edit-info-area">
        <h2>{businessState.businessName}</h2>
        <span>{businessState.address}</span>
        <div>
          <p>
            <FaChevronRight /> 카테고리 :{" "}
            <em>
              청소 {"_"} {businessState.detailTypeName}
            </em>
          </p>
          <p>
            <FaChevronRight /> 영업시간 :{" "}
            <em>
              <input
                type="time"
                name="openingTime"
                id="openingTime"
                {...register("openingTime")}
              />{" "}
              ~{" "}
              <input
                type="time"
                name="closingTime"
                id="closingTime"
                {...register("closingTime")}
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
                placeholder="(-) 빼고 작성해 주세요"
              />
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
  );
};

export default ExpertInfoEdit;
