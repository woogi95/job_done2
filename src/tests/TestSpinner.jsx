import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function TestSpinner() {
  const [isLoading, setIsLoading] = useState(true);

  const LoadingSpinner = () => (
    <div className="flex justify-center items-center p-[20px]">
      <AiOutlineLoading3Quarters className="animate-spin text-[#34C5F0] text-2xl" />
    </div>
  );

  const toggleLoading = () => {
    setIsLoading(!isLoading);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">스피너 테스트 페이지</h1>

      <div className="p-4 border rounded-lg w-[300px] h-[200px] flex items-center justify-center">
        {isLoading ? <LoadingSpinner /> : <div>컨텐츠가 로드되었습니다!</div>}
      </div>

      <button
        onClick={toggleLoading}
        className="px-4 py-2 bg-[#34C5F0] text-white rounded hover:bg-[#2BB0DB]"
      >
        {isLoading ? "로딩 멈추기" : "로딩 시작하기"}
      </button>

      <div className="relative inline-block my-10">
        <input
          type="text"
          className="pr-10 border border-gray-300 rounded px-2 py-1 text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="0"
          style={{ paddingRight: "2.5rem" }}
        />
        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">
          원
        </span>
      </div>
    </div>
  );
}

export default TestSpinner;
