import React, { useState, useEffect } from "react";
import { loginApi } from "../../services/api";
import PortfolioListItem from "./PortfolioListItem";

const PortfolioList = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [selectedPortfolioId, setSelectedPortfolioId] = useState(null);

  // 포트폴리오 목록 가져오기
  const getPortfolios = async () => {
    try {
      const res = await loginApi.get("/api/portfolios");
      if (res.status === 200) {
        setPortfolios(res.data.resultData);
      }
    } catch (error) {
      console.error("포트폴리오 목록 조회 실패:", error);
    }
  };

  // 포트폴리오 상세 정보 가져오기
  const getDetailPortfolio = async portfolioId => {
    try {
      const res = await loginApi.get(`/api/portfolio/${portfolioId}`);
      if (res.status === 200) {
        console.log("포트폴리오 상세 정보:", res.data.resultData);
      }
    } catch (error) {
      console.error("포트폴리오 상세 정보 조회 실패:", error);
    }
  };

  // 아이템 클릭 핸들러
  const handleItemClick = portfolioId => {
    setSelectedPortfolioId(portfolioId);
    getDetailPortfolio(portfolioId);
  };

  useEffect(() => {
    getPortfolios();
  }, []);

  return (
    <div className="portfolio-list">
      {portfolios.map(portfolio => (
        <PortfolioListItem
          key={portfolio.portfolioId}
          portfolio={portfolio}
          onClick={handleItemClick}
        />
      ))}
    </div>
  );
};

export default PortfolioList;
