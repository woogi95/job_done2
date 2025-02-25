import { Outlet } from "react-router-dom";

import styled from "@emotion/styled";
import ExpertHeader from "./expert-header/ExpertHeader";
import ExpertSideMenu from "./expert-side-menu/ExpertSideMenu";

const ExpertLayout = () => {
  const ExpertDiv = styled.div`
    background-color: #1b428b;
    /* background: linear-gradient(135deg, #1b428b 0%, #2a58ad 50%, #3468c7 100%); */
    background-color: #eaeef1;
    display: flex;
    justify-content: center;
    height: 100vh;
    overflow-y: hidden;
  `;
  const ExpertLayoutDiv = styled.div`
    max-width: 1280px;
    width: 100%;
    background-color: #fff;
    height: 100%;
    box-shadow:
      rgba(0, 0, 0, 0.25) 0px 14px 28px,
      rgba(0, 0, 0, 0.22) 0px 10px 10px;

    .main {
      display: flex;
      height: calc(100% - 67px);
      /* side menu */
      > div:nth-child(1) {
        width: 20%;
        background-color: #2a58ad;
      }
      /* outlet */
      > div:nth-child(2) {
        width: 80%;
        /* background-color: #eaeef1; */
        background-color: #f5f5f5;
      }
    }
  `;
  return (
    <ExpertDiv>
      <ExpertLayoutDiv>
        <ExpertHeader />
        <main className="main ">
          <ExpertSideMenu />
          <Outlet />
        </main>
      </ExpertLayoutDiv>
    </ExpertDiv>
  );
};

export default ExpertLayout;
