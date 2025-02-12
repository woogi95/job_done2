import React from "react";

const PaymentFailed = () => {
  return (
    <div className="flex flex-col items-center p-10 max-w-[500px] mx-auto">
      <div className="w-20 h-20 rounded-full bg-red-500 text-white text-4xl flex items-center justify-center mb-6">
        !
      </div>
      <h1 className="text-2xl mb-4 text-red-500">결제에 실패했습니다</h1>

      <p className="text-center text-gray-700 mb-2 leading-relaxed">
        결제 중 문제가 발생했습니다.
        <br />
        다시 시도해주세요.
      </p>

      <p className="text-gray-500 text-sm mb-8">Error Code: KP_ERR_001</p>

      <div className="w-full flex flex-col gap-3">
        <button
          onClick={() => window.location.reload()}
          className="w-full py-4 bg-[#fee500] hover:bg-[#ffd900] rounded-lg font-bold transition-colors"
        >
          다시 시도하기
        </button>

        <button
          onClick={() => (window.location.href = "/")}
          className="w-full py-4 bg-gray-100 hover:bg-gray-200 rounded-lg font-bold transition-colors"
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default PaymentFailed;
