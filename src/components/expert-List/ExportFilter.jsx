import React from "react";
import { EFilterDiv } from "./expertList";

const ExportFilter = () => {
  return (
    <EFilterDiv>
      <ul className="btn-area">
        <li>
          <button className="completed3">취소</button>
        </li>
        <li>
          <button className="completed0">대기</button>
        </li>
        <li>
          <button className="completed1">완료</button>
        </li>
        <li>
          <button className="completed5">거절</button>
        </li>
      </ul>
      <div className="search-bar">
        <label htmlFor="">
          <input type="text" />
        </label>
        <button>검색</button>
      </div>
    </EFilterDiv>
  );
};

export default ExportFilter;
