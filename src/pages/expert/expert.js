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
        height: 423px;
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
          box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
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
      /* 미니캘린더 */
      .calendar-box {
        .fc-scroller {
          height: 100% !important;
          overflow: initial;
        }

        .fc-col-header-cell {
          height: 20px !important;
          font-size: 13px !important;
          line-height: 20px !important;
        }
        .fc-header-toolbar {
          padding: 3px 10px;
          background-color: #e9fff3 !important;
        }

        .fc .fc-button {
          padding: 0.01em;
          padding-bottom: 0.08em;
          font-size: 12px;
          background-color: #70be3b !important;
          border: 1px solid #70be3b !important;
          border-radius: 3px !important;
          color: #fff !important;
        }
        .fc .fc-toolbar-title {
          font-size: 16px;
          margin: 0px;
          font-weight: 600;
          color: #434343;
        }

        .fc-header-toolbar,
        .fc-toolbar,
        .fc-toolbar-ltr {
          padding: 5px;
        }
        .fc-today-button {
          background-color: #fff !important;
        }
        .fc-toolbar-chunk {
        }
        .fc-header-toolbar.fc-toolbar.fc-toolbar-ltr {
          padding: 5px;
          margin-bottom: 5px;
        }
        .fc-scroller.fc-scroller-liquid-absolute {
          /* height: 356px !important; */
          /* border: 1px solid #70be3b; */
          /* border-bottom: 1px solid #e2e8f0; */
        }
        .fc .fc-daygrid-day-number {
          font-size: 12px;
        }
        .presentation {
          height: 356px !important;
        }
        .fc.fc-scrollgrid-liquid {
          height: 356px !important;
        }

        .fc.fc-daygrid-body-unbalanced.fc-daygrid-day-events {
          min-height: 0.1em;
        }
      }
    }
    /* 매출 현황 */
    .col2-box.graph-box,
    .col2-box.visited-box {
      height: 380px !important;

      div {
        .chartContainer {
          /* border: 1px solid #000; */
          border-radius: 5px;
          width: 100%;
          height: 300px;
          position: relative;
          b {
            position: absolute;
            left: 10px;
            top: 20px;
            color: #999;
            font-size: 12px;
            text-align: center;
            em {
              font-style: normal;
              font-size: 10px;
              color: #ccc;
            }
          }
        }
        /* 매출 상세 현황 */
        .detail-price {
          background: rgba(0, 0, 0, 0.75);
          color: #fff;
          padding: 12px 20px;
          border-radius: 4px;
          box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          strong {
            font-size: 12px;
            font-weight: 400;
            color: rgba(255, 255, 255, 0.8);
          }
          span {
            font-size: 14px;
            font-weight: 600;
          }
        }
      }
    }
    /* 예약자수 현황 */
    .visited-box {
      .chartContainer {
        b {
          top: 10px !important;
        }
      }
    }
  }
`;
