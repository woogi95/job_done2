import styled from "@emotion/styled";
import { ExportPageDiv } from "./company-management/companyManagement";

export const ExportMainDiv = styled(ExportPageDiv)`
  .summation {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    gap: 20px;
    background-color: #fff;
    padding: 20px;
    border: 1px solid #eee;
    border-radius: 5px;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.05);
  }
  .box {
    width: calc(100% / 3);
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
      height: 500px;
      gap: 30px;
      background-color: #fff;
      border-radius: 5px;
      box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.1);
      padding: 20px;

      border: 1px solid #eee;
      /* 1/4 박스 */
      .col4-box {
        width: 50%;
        height: 100%;
        /* overflow: hidden; */
        h4 {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 10px;
          color: #333;
        }
        /* 예약 컴포넌트 안 */
        > div {
          border: 1px solid #eee;
          padding: 10px;
          .top-tr {
            background-color: #dbedff;
            .th {
              color: #333 !important;
            }
          }
          .tr {
            background-color: #fff;
          }
          .list {
            overflow-y: auto;
            height: 355px;
          }

          > div {
            padding: 0;
            box-shadow: none;
          }
        }
      }
    }
  }
`;
