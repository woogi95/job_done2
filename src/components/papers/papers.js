import styled from "@emotion/styled";

export const PapersDiv = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: #eee;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;

  .inner {
    position: relative;
    max-width: 1024px;
    width: 100%;
    max-height: 95vh;
    background-color: #fff;
    border: 1px solid #c0c0c0;
    padding: 30px 40px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
  .logo {
    height: 45px;
    width: 120px;
    background: url(/images/logo.svg) no-repeat left center / contain;
  }
`;
export const PaperContDiv = styled.div`
  /* border: 1px solid #bbb; */
  padding: 20px;
  .tit {
    font-size: 32px;
    font-weight: 600;
    line-height: 1.15em;
    strong {
      color: #ff9d00;
    }
  }
  .description {
    display: block;
    padding: 15px 0;
    color: #555;
    font-size: 15px;
    line-height: 1.4em;
    em {
      text-decoration: underline;
      color: #000;
    }
    b {
      color: #333;
      font-weight: 600;
    }
  }
`;

export const FormDiv = styled.div`
  height: 50vh;
  overflow-y: auto;
  > div {
    /* border: 1px solid; */
    margin-bottom: 30px;
    h3 {
      font-size: 18px;
      font-weight: 600;
      padding: 10px 0;
      border-bottom: 2px solid #000;
    }
    ul {
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px dashed #bbb;
        padding: 10px;
        font-size: 14px;
        p {
          font-weight: 600;
          color: #333;
        }
        span {
          color: #555;
          font-weight: 300;
          word-break: keep-all;
        }
      }
      .option {
        padding: 0 0 0 10px;
        > p {
          padding: 10px 0;
        }
        ul {
          width: calc(100% - 100px);
          li {
            border-block-color: #ddd;
          }
          li:last-child {
            border-bottom-width: 0;
          }
          em {
            color: #333;
            font-weight: normal;
          }
        }
      }
    }
  }
`;

export const BtnAreaDiv = styled.div`
  padding: 40px 0 0;
  display: flex;
  justify-content: center;
  gap: 15px;
  button {
    max-width: 200px;
    width: 100%;
    height: 45px;
    line-height: 45px;
    font-weight: 600;
    color: #fff;
  }
  button.cancel {
    background-color: #777777;
  }
  button.confirm {
    background-color: #ff3044;
  }
  button.okay {
    background-color: #4581f0;
  }
`;

// 유저 예약신청

export const ReservationPaperContDiv = styled(PaperContDiv)`
  .tit {
    text-align: left !important;
    strong {
      color: #4581f0;
    }
  }
  .pop-close-btn {
    position: absolute;
    top: 30px;
    right: 40px;
    font-size: 30px;
  }
`;
