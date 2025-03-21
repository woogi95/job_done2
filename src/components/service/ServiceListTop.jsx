import { IoSearch } from "react-icons/io5";
import { BiSolidRightArrow } from "react-icons/bi";
import { PageTopDiv } from "./service";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  regionState,
  categoryList,
  detailList,
} from "../../atoms/categoryAtom";
import { useLocation, useNavigate } from "react-router-dom";

const ServiceListTop = ({ setBusinessList }) => {
  const [regionId, setRegionId] = useRecoilState(regionState);
  const [categoryDatas, setCategoryDatas] = useRecoilState(categoryList);
  const [detailDatas, setDetailDatas] = useRecoilState(detailList);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryIdFromURL = Number(queryParams.get("categoryId"));
  const detailTypeIdFromURL = Number(queryParams.get("detailTypeId"));
  const navigate = useNavigate();

  const cateName = categoryDatas.find(
    item => item.categoryId === categoryIdFromURL,
  )?.categoryName;

  const detailName =
    Object.values(detailDatas)
      .flat()
      .find(item => item.detailTypeId === detailTypeIdFromURL)
      ?.detailTypeName || "";

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = async (
    categoryId,
    detailTypeId,
    regionIdVal,
    searchTerm,
  ) => {
    try {
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
      if (regionIdVal !== null && regionIdVal !== undefined)
        url += `regionId=${regionIdVal}&`;
      if (
        searchTerm !== null &&
        searchTerm !== undefined &&
        searchTerm.trim() !== ""
      )
        url += `searchTerm=${searchTerm}&`;

      url = url.endsWith("&") ? url.slice(0, -1) : url;

      const res = await axios.get(url);
      setBusinessList(res.data.resultData);
      setFilteredBusinessList(res.data.resultData);
    } catch (error) {
      console.log("검색 요청 중 오류 발생:", error);
    }
  };

  const handleRegionClick = async (categoryId, detailTypeId, regionId) => {
    setRegionId(regionId);

    // URL 업데이트
    const newQueryParams = new URLSearchParams();
    if (categoryId !== null && categoryId !== undefined)
      newQueryParams.set("categoryId", categoryId);
    if (
      detailTypeId !== null &&
      detailTypeId !== undefined &&
      detailTypeId !== 0
    )
      newQueryParams.set("detailTypeId", detailTypeId);
    if (regionId !== null && regionId !== undefined && regionId !== 0)
      newQueryParams.set("regionId", regionId);
    navigate(`/service?${newQueryParams.toString()}`);

    try {
      // API 요청 URL 구성
      let url = `/api/business?`;
      if (categoryId !== null && categoryId !== undefined)
        url += `categoryId=${categoryId}&`;
      if (
        detailTypeId !== null &&
        detailTypeId !== undefined &&
        detailTypeId !== 0
      )
        url += `detailTypeId=${detailTypeId}&`;
      if (regionId !== null && regionId !== undefined && regionId !== 0)
        url += `regionId=${regionId}&`;

      url = url.endsWith("&") ? url.slice(0, -1) : url;

      const res = await axios.get(url);
      setBusinessList(res.data.resultData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleSearch(categoryIdFromURL, detailTypeIdFromURL, regionId);
  }, [categoryIdFromURL, detailTypeIdFromURL, regionId]);
  return (
    <PageTopDiv>
      <div className="inner">
        <h1>{cateName}</h1>
        <span>
          {cateName} {detailTypeIdFromURL >= 1 ? <BiSolidRightArrow /> : ""}
          {detailName}
        </span>
        <ul>
          <li>
            <button
              to="/service"
              onClick={() =>
                handleRegionClick(categoryIdFromURL, detailTypeIdFromURL)
              }
              className={regionId === undefined ? "active" : ""}
            >
              전체
            </button>
          </li>
          <li>
            <button
              onClick={() =>
                handleRegionClick(categoryIdFromURL, detailTypeIdFromURL, 1)
              }
              className={regionId === 1 ? "active" : ""}
            >
              대구
            </button>
          </li>
          <li>
            <button
              onClick={() =>
                handleRegionClick(categoryIdFromURL, detailTypeIdFromURL, 2)
              }
              className={regionId === 2 ? "active" : ""}
            >
              부산
            </button>
          </li>
          <li>
            <button
              onClick={() =>
                handleRegionClick(categoryIdFromURL, detailTypeIdFromURL, 3)
              }
              className={regionId === 3 ? "active" : ""}
            >
              포항
            </button>
          </li>
          <li>
            <button
              onClick={() =>
                handleRegionClick(categoryIdFromURL, detailTypeIdFromURL, 4)
              }
              className={regionId === 4 ? "active" : ""}
            >
              경주
            </button>
          </li>
          <li>
            <button
              onClick={() =>
                handleRegionClick(categoryIdFromURL, detailTypeIdFromURL, 5)
              }
              className={regionId === 5 ? "active" : ""}
            >
              구미
            </button>
          </li>
        </ul>
        <div className="search">
          <em>
            <IoSearch />
          </em>
          <input
            type="text"
            placeholder="검색어를 입력해주세요"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSearch(
                  categoryIdFromURL,
                  detailTypeIdFromURL,
                  regionId,
                  searchTerm,
                );
              }
            }}
          />
          <button
            className="search-btn"
            onClick={() =>
              handleSearch(
                categoryIdFromURL,
                detailTypeIdFromURL,
                regionId,
                searchTerm,
              )
            }
          >
            검색
          </button>
        </div>
      </div>
    </PageTopDiv>
  );
};
export default ServiceListTop;
