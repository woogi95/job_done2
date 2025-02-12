import { PayModalDiv } from "./pay";

const PaymentSuccess = () => {
  return (
    <PayModalDiv>
      <div className="layer">
        <div className="logo">
          <img src="/images/logo.svg" alt="logo" />
        </div>
        <div className="txt">
          <div className="check-icon">✓</div>
          <h1>결제가 완료되었습니다.</h1>
        </div>{" "}
        <span>결제 창을 닫으면 결제 내역 페이지로 이동합니다.</span>
        {/* <button onClick={() => (window.location.href = "/")}>확인</button> */}
        <div></div>
      </div>
    </PayModalDiv>
  );
};

export default PaymentSuccess;
