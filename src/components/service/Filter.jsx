import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import {
  regionState,
  selectedCategoryState,
  selectedDetailTypeState,
} from "../../atoms/categoryAtom";
// styled
import { FilterDiv } from "./service";
// icon
import { IoIosArrowDown } from "react-icons/io";

const Filter = ({ setBusinessList }) => {
  const [optionOpen, setOptionOpen] = useState(false);
  const [sortType, setSortType] = useState("평점순");
  const options = ["평점순", "최신순", "주문량순", "저가순"];

  const categoryId = useRecoilValue(selectedCategoryState);
  const detailTypeId = useRecoilValue(selectedDetailTypeState);
  const regionId = useRecoilValue(regionState);

  const handleSortTypeClick = async (
    categoryId,
    detailTypeId,
    regionId,
    sortType,
  ) => {
    setSortType(sortType);
    setOptionOpen(false);

    // 기본 URL
    let url = "/api/business?";
    if (categoryId) {
      url += `categoryId=${categoryId}&`;
    }
    if (detailTypeId) {
      url += `detailTypeId=${detailTypeId}&`;
    }
    if (sortType) {
      url += `sortType=${sortType}&`;
    }
    if (regionId) {
      url += `regionId=${regionId}&`;
    }
    // 마지막 "&" 제거
    url = url.endsWith("&") ? url.slice(0, -1) : url;

    try {
      const response = await axios.get(url);
      setBusinessList(response.data.resultData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleSortTypeClick(categoryId, detailTypeId, regionId, sortType);
  }, [categoryId, detailTypeId, regionId, sortType]);

  return (
    <FilterDiv>
      <div className="select" onClick={() => setOptionOpen(!optionOpen)}>
        <p>{sortType}</p>
        <IoIosArrowDown />
      </div>
      {optionOpen && (
        <div className="options">
          {options.map(item => (
            <div
              key={item}
              onClick={() => {
                handleSortTypeClick(categoryId, detailTypeId, regionId, item);
              }}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </FilterDiv>
  );
};

export default Filter;
