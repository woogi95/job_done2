import { useEffect, useState } from "react";
import { ExpertListPageDiv } from "../reservation-management/reservationMangement";
import { TiPlus } from "react-icons/ti";
import {
  PortfolioListDiv,
  PortfolioListItemDiv,
  TitleAreaDiv,
} from "./companyManagement";
// import EditPortfolio from "../../../components/portfolio/EditPortfolio";
import AddPortfolio from "../../../components/portfolio/AddPortfolio";
import EditPortfolio from "../../../components/portfolio/EditPortfolio";
import { loginApi } from "../../../apis/login";
import PfPopup from "../../../components/serviceDetail/PfPopup";

function Portfolio() {
  const BASE_URL = "http://112.222.157.157:5234";
  const [isPopPfAdd, setIsPopPfAdd] = useState(false);
  const [isPopPfEdit, setIsPopPfEdit] = useState(false);
  const [isPfDetailPop, setIsPfDetailPop] = useState(false);
  const [portfolioList, setPortfolioList] = useState([]);
  const [selectedPortfolioId, setSelectedPortfolioId] = useState(null);
  const getPortfolioList = async () => {
    try {
      // /api/portfolio?categoryId=1&detailTypeId=2&businessId=2
      const res = await loginApi.get(
        `/api/portfolio?categoryId=1&detailTypeId=2&businessId=2`,
      );
      if (res.status === 200) {
        console.log("포트폴리오 리스트", res.data.resultData);
        setPortfolioList(res.data.resultData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deletePortfolio = async (businessId, portfolioId) => {
    console.log("businessId", businessId, "portfolioId", portfolioId);
    ///api/portfolio/%7BportfolioId%7D?businessId=2&portfolioId=44
    try {
      const res = await loginApi.delete("/api/portfolio/%7BportfolioId%7D", {
        params: {
          businessId: Number(businessId),
          portfolioId: Number(portfolioId),
        },
      });

      const updatedList = portfolioList.filter(
        portfolio => portfolio.portfolioId !== portfolioId,
      );

      // 상태 업데이트
      setPortfolioList(updatedList);
      console.log("포트폴리오가 성공적으로 삭제되었습니다.");
    } catch (error) {
      console.error("삭제 중 에러 발생:", error);
    }
  };

  useEffect(() => {
    getPortfolioList();
  }, []);

  return (
    <ExpertListPageDiv>
      <TitleAreaDiv>
        <h2 className="tit">포트폴리오</h2>
        <button
          onClick={() => {
            setIsPopPfAdd(true);
          }}
        >
          <p>포트폴리오</p> <TiPlus />
        </button>
      </TitleAreaDiv>
      <PortfolioListDiv>
        {/* 포트폴리오 리스트 아이템 */}
        {portfolioList.map(item => (
          <PortfolioListItemDiv
            key={item.portfolioId}
            onClick={() => {
              setSelectedPortfolioId(item.portfolioId);
              setIsPfDetailPop(true);
            }}
          >
            <div className="thum">
              <img src={`${BASE_URL}${item.isThumbnail}`} alt={item.title} />
            </div>
            <div className="txt-area">
              <h4 className="tit">{item.title}</h4>
              <div className="btn-area">
                <button
                  className="edit-btn"
                  onClick={e => {
                    e.stopPropagation();
                    setSelectedPortfolioId(item.portfolioId);
                    setIsPopPfEdit(true);
                  }}
                >
                  수정하기
                </button>
                <button
                  onClick={e => {
                    e.stopPropagation();
                    deletePortfolio(item.businessId, item.portfolioId);
                  }}
                >
                  삭제하기
                </button>
              </div>
            </div>
          </PortfolioListItemDiv>
        ))}
      </PortfolioListDiv>
      {isPfDetailPop ? (
        <PfPopup
          portfolioId={selectedPortfolioId}
          setIsPfDetailPop={setIsPfDetailPop}
          isPfDetailPop={isPfDetailPop}
        />
      ) : (
        <></>
      )}
      {isPopPfAdd ? (
        <AddPortfolio
          setIsPopPfAdd={setIsPopPfAdd}
          deletePortfolio={deletePortfolio}
        />
      ) : (
        <></>
      )}
      {isPopPfEdit ? (
        <EditPortfolio
          setIsPopPfEdit={setIsPopPfEdit}
          portfolioId={selectedPortfolioId}
        />
      ) : (
        <></>
      )}
    </ExpertListPageDiv>
  );
}

export default Portfolio;
