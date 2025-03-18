import React from "react";

const PaymentLoading = () => {
  return (
    <div className="flex flex-col items-center p-10 max-w-[500px] m-auto">
      <div className="w-20 h-20 rounded-full bg-[#fee500] text-white text-4xl flex items-center justify-center mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-spin"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
      </div>
      <h1 className="text-2xl mb-4 text-[#3c1e1e]">결제 진행 중입니다</h1>

      <p className="text-center text-gray-700 mb-2 leading-relaxed">
        잠시만 기다려 주세요.
        <br />
        결제가 완료되는 중입니다.
      </p>

      <p className="text-gray-500 text-sm mb-8">카카오페이로 결제 중...</p>
    </div>
  );
};

export default PaymentLoading;
