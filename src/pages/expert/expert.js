import styled from "@emotion/styled";
import { ExportPageDiv } from "./company-management/companyManagement";

export const ExportMainDiv = styled(ExportPageDiv)`
  .summation {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    background-color: #fff;
    padding: 10px;
    border: 1px solid #eee;
    border-radius: 5px;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.05);
  }
  .box {
    width: 310px;
    height: 100px;
    border-radius: 5px;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    padding: 15px;
    > div {
      height: 50%;
      border-bottom: 1px solid #4581f0;
      border-bottom: 1px dashed #33333325;
      display: flex;
      align-items: center;
      justify-content: space-between;
      &:nth-child(2) {
        border-bottom: none;
      }
      p {
        color: #0066cccf;
        font-weight: 600;
      }
      span {
        color: #555;
        font-weight: 600;
      }
    }
  }
  .new-reserve-box {
    background-color: #f4fff9;
  }
  .reserve-box {
    background-color: #edf5ff;
  }
  .review-box {
    background-color: #f5f5f5;
  }

  .statistics {
    display: flex;
    flex-direction: column;
    gap: 30px;
    .col2-box {
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 33vh;
      gap: 30px;

      border: 1px solid #000;
      /* 1/4 박스 */
      .col4-box {
        width: 50%;
        height: 100%;
        overflow: hidden;
      }
    }
  }
`;
