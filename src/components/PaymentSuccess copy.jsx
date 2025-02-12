import { PayModalDiv } from "./pay";

const PaymentSuccess = () => {
  return (
    <PayModalDiv>
      <div className="flex flex-col items-center p-10 max-w-[500px] mx-auto">
        <div className="w-20 h-20 rounded-full bg-[#fee500] text-white text-4xl flex items-center justify-center mb-6">
          ✓
        </div>
        <h1 className="text-2xl mb-8">결제가 완료되었습니다</h1>

        <div className="w-full bg-gray-50 rounded-xl p-6 mb-8">
          <div className="flex justify-between mb-4">
            <span className="text-gray-500">결제금액</span>
            <span className="font-bold">30,000원</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-gray-500">결제수단</span>
            <span className="font-bold">카카오페이</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">결제일시</span>
            <span className="font-bold">{new Date().toLocaleString()}</span>
          </div>
        </div>

        <button
          onClick={() => (window.location.href = "/")}
          className="w-full py-4 bg-[#fee500] hover:bg-[#ffd900] rounded-lg font-bold transition-colors"
        >
          홈으로 돌아가기
        </button>
      </div>
    </PayModalDiv>
  );
};

export default PaymentSuccess;
