import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
// styled
import { FilterDiv } from "./service";
// icon
import { IoIosArrowDown } from "react-icons/io";

const Filter = ({ setBusinessList }) => {
  const [optionOpen, setOptionOpen] = useState(false);
  const [sortType, setSortType] = useState("평점순");
  const options = ["평점순", "최신순", "주문량순", "저가순"];

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryId = Number(queryParams.get("categoryId"));
  const detailTypeId = Number(queryParams.get("detailTypeId"));
  const regionId = Number(queryParams.get("regionId"));
  const sortTypeFromURL = queryParams.get("sortType");

  useEffect(() => {
    if (sortTypeFromURL) {
      setSortType(sortTypeFromURL);
    }
  }, [sortTypeFromURL]);

  const handleSortTypeClick = async sortType => {
    setSortType(sortType);
    setOptionOpen(false);

    // API 요청 URL 구성
    let url = `/api/business?`;
    if (categoryId !== null && categoryId !== undefined && categoryId !== 0)
      url += `categoryId=${categoryId}&`;
    if (
      detailTypeId !== null &&
      detailTypeId !== undefined &&
      detailTypeId !== 0
    )
      url += `detailTypeId=${detailTypeId}&`;
    if (regionId !== null && regionId !== undefined && regionId !== 0)
      url += `regionId=${regionId}&`;
    if (sortType !== null && sortType !== undefined && sortType !== "")
      url += `sortType=${sortType}&`;

    // 마지막 '&' 제거
    url = url.endsWith("&") ? url.slice(0, -1) : url;

    try {
      const response = await axios.get(url);
      setBusinessList(response.data.resultData);
    } catch (error) {
      console.error(error);
    }
  };

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
                handleSortTypeClick(item);
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
