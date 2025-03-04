import { useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  ExpertOptionInfoDiv,
  ExportPageDiv,
  OpContBoxDiv,
  TitleAreaDiv,
} from "./companyManagement";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { businessDetailState } from "../../../atoms/businessAtom";
import { loginApi } from "../../../apis/login";
import { ProductState } from "../../../atoms/productAtom";
const priceSchema = yup.object({
  productPrice: yup.number(),
});

function CreateOptionPage() {
  const [options, setOptions] = useState([]);
  const [newOptionName, setNewOptionName] = useState("");
  const [detailOptions, setDetailOptions] = useState({});
  const productbasicPrice = useRecoilValue(businessDetailState);
  const ProductInfo = useRecoilValue(ProductState);
  const [productPrice, setProductPrice] = useState(productbasicPrice.price);
  const setProductInfo = useSetRecoilState(ProductState);
  //   console.log(productbasicPrice.price);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(priceSchema),
    defaultValues: {
      productPrice: productPrice,
    },
    mode: "onBlur",
  });

  const handleSubmitForm = async data => {
    const productId = ProductInfo.productId;
    console.log("!!!1", data, "productId", productId);
    const formData = {
      productId: productId,
      productPrice: data.productPrice,
    };
    try {
      const res = await loginApi.patch(`/api/product`, formData);
      console.log("아아아아", res.data);
      setProductInfo(prev => ({
        ...prev,
        productPrice: data.productPrice,
      }));
    } catch (error) {
      console.error("오류:", error);
    }
  };

  const handleAddOption = () => {
    if (!newOptionName.trim()) return;
    setOptions([
      ...options,
      {
        name: newOptionName,
        details: [],
      },
    ]);
    setNewOptionName("");
  };
  // 옵션명
  const handleAddDetailOption = optionIndex => {
    const currentDetailOption = detailOptions[optionIndex] || {
      name: "",
      price: "",
    };
    if (!currentDetailOption.name.trim() || !currentDetailOption.price) return;

    const updatedOptions = [...options];
    updatedOptions[optionIndex].details.push({
      name: currentDetailOption.name,
      price: Number(currentDetailOption.price),
    });
    setOptions(updatedOptions);

    setDetailOptions({
      ...detailOptions,
      [optionIndex]: { name: "", price: "" },
    });
  };
  // 옵션명
  const handleDeleteOption = optionIndex => {
    setOptions(options.filter((_, index) => index !== optionIndex));
  };

  // 선택옵션
  const handleDetailOptionChange = (optionIndex, field, value) => {
    setDetailOptions({
      ...detailOptions,
      [optionIndex]: {
        ...(detailOptions[optionIndex] || { name: "", price: "" }),
        [field]: value,
      },
    });
  };
  // 선택옵션
  const handleDeleteDetailOption = (optionIndex, detailIndex) => {
    const updatedOptions = [...options];
    updatedOptions[optionIndex].details = updatedOptions[
      optionIndex
    ].details.filter((_, index) => index !== detailIndex);
    setOptions(updatedOptions);
  };

  const handleKeyPress = (e, type, optionIndex) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (type === "option") {
        handleAddOption();
      } else if (type === "detail") {
        handleAddDetailOption(optionIndex);
      }
    }
  };

  const handleProductPriceChange = e => {
    // console.log("가격변화!:", e.target.value);
    const value = e.target.value.replace(/,/g, "");
    setProductPrice(value);
  };

  const handleProductPriceComplete = () => {
    // console.log("Product Price:", productPrice);
    if (productPrice.trim()) {
      setProductPrice(productPrice);
      handleSubmitForm({ productPrice: Number(productPrice) });
    }
  };
  useEffect(() => {
    if (productbasicPrice?.price) {
      setProductPrice(productbasicPrice.price);
    }
  }, [productbasicPrice.price]);

  // ProductState의 옵션 데이터를 컴포넌트의 options 상태로 변환하여 로드
  useEffect(() => {
    if (ProductInfo.optionList) {
      const transformedOptions = ProductInfo.optionList.map(option => ({
        name: option.optionName,
        details: option.optionDetailList.map(detail => ({
          name: detail.optionDetailName,
          price: detail.optionDetailPrice,
        })),
      }));
      setOptions(transformedOptions);
    }
  }, [ProductInfo]);

  return (
    <ExportPageDiv>
      <ExpertOptionInfoDiv>
        <TitleAreaDiv>
          <h2 className="tit">상품 옵션 수정</h2>
          <button>
            <p>상품옵션 저장</p> <MdModeEdit />
          </button>
        </TitleAreaDiv>
        <OpContBoxDiv>
          {/* 옵션정보 */}
          <div className="option-info">
            <form onSubmit={handleSubmit(handleSubmitForm)}>
              <h4 className="tit">상품기본 정보</h4>
              <label>
                <b>카테고리 </b>
                <span>
                  <p>음식점청소</p>
                </span>
              </label>
              <label>
                <b>기본금액 </b>
                <input
                  className="basic-price"
                  type="text"
                  {...register("productPrice")}
                  value={Number(productPrice).toLocaleString()}
                  onChange={handleProductPriceChange}
                  onBlur={handleProductPriceComplete}
                  onKeyDown={e => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleProductPriceComplete();
                    }
                  }}
                />
              </label>
            </form>
          </div>
          {/* 옵션 등록 */}
          <div className="op-box">
            <h4 className="tit">상품옵션 정보</h4>
            <label className="add-option">
              <input
                type="text"
                placeholder="옵션명"
                value={newOptionName}
                onChange={e => setNewOptionName(e.target.value)}
                onKeyDown={e => handleKeyPress(e, "option")}
              />
              <button onClick={handleAddOption}>옵션 추가</button>
            </label>
            <div className="option-list">
              {options.map((option, optionIndex) => (
                <div className="option-box" key={optionIndex}>
                  <h3>
                    <span>
                      옵션 {optionIndex + 1} : {option.name}
                    </span>
                    <button onClick={() => handleDeleteOption(optionIndex)}>
                      삭제
                    </button>
                  </h3>
                  <ul className="op-detail-list">
                    {option.details.map((detail, detailIndex) => (
                      <li className="op-item" key={detailIndex}>
                        <p>
                          <span>{detail.name}</span>
                          <em>{detail.price.toLocaleString()}</em>
                          <button
                            onClick={() =>
                              handleDeleteDetailOption(optionIndex, detailIndex)
                            }
                          >
                            삭제
                          </button>
                        </p>
                      </li>
                    ))}
                  </ul>
                  <div className="add-detail-op">
                    <input
                      type="text"
                      placeholder="선택옵션"
                      value={(detailOptions[optionIndex] || { name: "" }).name}
                      onChange={e =>
                        handleDetailOptionChange(
                          optionIndex,
                          "name",
                          e.target.value,
                        )
                      }
                      onKeyDown={e => handleKeyPress(e, "detail", optionIndex)}
                    />
                    <input
                      type="number"
                      placeholder="금액"
                      value={
                        (detailOptions[optionIndex] || { price: "" }).price
                      }
                      onChange={e =>
                        handleDetailOptionChange(
                          optionIndex,
                          "price",
                          e.target.value,
                        )
                      }
                      onKeyDown={e => handleKeyPress(e, "detail", optionIndex)}
                    />
                    <button onClick={() => handleAddDetailOption(optionIndex)}>
                      선택 옵션 추가
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </OpContBoxDiv>
      </ExpertOptionInfoDiv>
    </ExportPageDiv>
  );
}

export default CreateOptionPage;
