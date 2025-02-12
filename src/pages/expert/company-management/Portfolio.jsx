import { useState } from "react";
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

function Portfolio() {
  const [isPopPfAdd, setIsPopPfAdd] = useState(false);
  const [isPopPfEdit, setIsPopPfEdit] = useState(false);
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
        <PortfolioListItemDiv>
          <div className="thum">
            <img src="" alt="" />
          </div>
          <div className="txt-area">
            <h4 className="tit">포트폴리오 타이틀</h4>
            <div className="btn-area">
              <button
                onClick={() => {
                  setIsPopPfEdit(true);
                }}
              >
                수정하기
              </button>
              <button>삭제하기</button>
            </div>
          </div>
        </PortfolioListItemDiv>
        <PortfolioListItemDiv>
          <div className="thum">
            <img src="" alt="" />
          </div>
          <div className="txt-area">
            <h4 className="tit">포트폴리오 타이틀</h4>
            <div className="btn-area">
              <button
                onClick={() => {
                  setIsPopPfEdit(true);
                }}
              >
                수정하기
              </button>
              <button>삭제하기</button>
            </div>
          </div>
        </PortfolioListItemDiv>
        <PortfolioListItemDiv>
          <div className="thum">
            <img src="" alt="" />
          </div>
          <div className="txt-area">
            <h4 className="tit">포트폴리오 타이틀</h4>
            <div className="btn-area">
              <button
                onClick={() => {
                  setIsPopPfEdit(true);
                }}
              >
                수정하기
              </button>
              <button>삭제하기</button>
            </div>
          </div>
        </PortfolioListItemDiv>
        <PortfolioListItemDiv>
          <div className="thum">
            <img src="" alt="" />
          </div>
          <div className="txt-area">
            <h4 className="tit">포트폴리오 타이틀</h4>
            <div className="btn-area">
              <button
                onClick={() => {
                  setIsPopPfEdit(true);
                }}
              >
                수정하기
              </button>
              <button>삭제하기</button>
            </div>
          </div>
        </PortfolioListItemDiv>
      </PortfolioListDiv>
      {isPopPfAdd ? <AddPortfolio setIsPopPfAdd={setIsPopPfAdd} /> : <></>}
      {isPopPfEdit ? <EditPortfolio setIsPopPfEdit={setIsPopPfEdit} /> : <></>}
    </ExpertListPageDiv>
  );
}

export default Portfolio;
