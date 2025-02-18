import { FaChevronRight } from "react-icons/fa";
import { loginApi } from "../../apis/login";

// yup
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

const schema = yup.object({
  openingTime: yup.string(),
  closingTime: yup.string(),
  tel: yup.string(),
});
const ExpertInfoEdit = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      openingTime: "",
      closingTime: "",
      tel: "",
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = async data => {
    console.log(data);
    try {
      ///api/business/detail?businessId=2&openingTime=21%3A00&closingTime=21%3A00&tel=01055555555
      const res = await loginApi.put(
        `/api/business/detail?businessId=${businessId}&tel=${tel}&openingTime=21%3A00&closingTime=21%3A00`,
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="info-area edit-info-area">
        <h2>클린지구</h2>
        <span>대구 중구 중앙대로 394 제일빌딩 5F</span>
        <div>
          <p>
            <FaChevronRight /> 카테고리 : <em>청소 {"_"} 사무실 청소</em>
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
              -
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
            사업자번호 : <em>504-85-25999</em>
          </p>
          <p>
            <FaChevronRight /> 대표번호 :{" "}
            <em>
              <input type="text" name="tel" id="tel" {...register("tel")} />
            </em>
            {/* <b>
            추가번호 : <em>053-1111-1111</em>,<em>053-2222-2222</em>
          </b> */}
          </p>
        </div>
        <button type="submit">저장</button>
      </div>
    </form>
  );
};

export default ExpertInfoEdit;
