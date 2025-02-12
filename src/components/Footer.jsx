import React from "react";

function Footer() {
  return (
    <div className="bg-[#064153] h-[200px] m-auto">
      <div className="max-w-[1280px] h-full m-auto flex justify-between items-center px-4">
        <div className="flex flex-col gap-6">
          <div className="flex text-white gap-1">
            <a href="/" className="text-white">
              이용약관
            </a>
            <span>/</span>
            <a href="/" className="text-white">
              개인정보 처리방침
            </a>
          </div>
          <span className="flex flex-col gap-2 text-[rgba(255,255,255,0.8)] text-[12px]">
            주식회사 잡던 | 대표 : 엄준식 | 사업자등록번호 : 000-00-00000 |
            통신판매업신고 : 제 2025-대구중구-7777 호
            <p>대구광역시 중구 주소 | 전화문의 070-1234-1234</p>
          </span>
          <div className="text-white">Copyright @ Job-Done Co.</div>
        </div>

        <div>
          <a href="/">
            <img src="/images/logo.svg" alt="logo" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
