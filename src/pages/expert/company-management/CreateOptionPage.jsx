import { useState } from "react";
import { MdModeEdit } from "react-icons/md";
import {
  ExpertOptionInfoDiv,
  ExportPageDiv,
  OpContBoxDiv,
  TitleAreaDiv,
} from "./companyManagement";

function CreateOptionPage() {
  const [options, setOptions] = useState([]);
  const [newOptionName, setNewOptionName] = useState("");
  const [detailOptions, setDetailOptions] = useState({});
  const [productPrice, setProductPrice] = useState("");

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

  const handleDetailOptionChange = (optionIndex, field, value) => {
    setDetailOptions({
      ...detailOptions,
      [optionIndex]: {
        ...(detailOptions[optionIndex] || { name: "", price: "" }),
        [field]: value,
      },
    });
  };

  const handleDeleteOption = optionIndex => {
    setOptions(options.filter((_, index) => index !== optionIndex));
  };

  const handleDeleteDetailOption = (optionIndex, detailIndex) => {
    const updatedOptions = [...options];
    updatedOptions[optionIndex].details = updatedOptions[
      optionIndex
    ].details.filter((_, index) => index !== detailIndex);
    setOptions(updatedOptions);
  };

  const handleKeyPress = (e, type, optionIndex) => {
    if (e.key === "Enter") {
      e.preventDefault(); // 폼 제출 방지

      if (type === "option") {
        handleAddOption();
      } else if (type === "detail") {
        handleAddDetailOption(optionIndex);
      }
    }
  };

  const handleProductPriceChange = e => {
    setProductPrice(e.target.value);
  };

  const handleProductPriceComplete = () => {
    if (productPrice.trim()) {
      updateProductPrice(productPrice);
    }
  };

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
                type="text"
                value={productPrice}
                onChange={handleProductPriceChange}
                onBlur={handleProductPriceComplete}
                onKeyPress={e => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleProductPriceComplete();
                  }
                }}
              />
            </label>
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
                onKeyPress={e => handleKeyPress(e, "option")}
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
                      onKeyPress={e => handleKeyPress(e, "detail", optionIndex)}
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
                      onKeyPress={e => handleKeyPress(e, "detail", optionIndex)}
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
