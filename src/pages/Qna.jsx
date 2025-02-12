import React, { useState } from "react";

const QnaItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium">Q. {question}</span>
        <span
          className={`transform transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          ▼
        </span>
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-gray-50">
          <p className="text-gray-600">A. {answer}</p>
        </div>
      )}
    </div>
  );
};

const Qna = () => {
  const [showModal, setShowModal] = useState(false);
  const qnaList = [
    {
      question: "예약은 어떻게 하나요?",
      answer:
        "홈페이지 상단의 '예약하기' 버튼을 통해 원하시는 날짜와 시간을 선택하여 예약하실 수 있습니다.",
    },
    {
      question: "서비스 이용 가능 지역은 어디인가요?",
      answer:
        "현재 서울 전 지역과 경기도 일부 지역에서 서비스 이용이 가능합니다. 정확한 서비스 가능 여부는 주소 검색을 통해 확인하실 수 있습니다.",
    },
    {
      question: "예약 취소는 언제까지 가능한가요?",
      answer:
        "서비스 시작 24시간 전까지 무료로 취소가 가능합니다. 그 이후 취소 시에는 취소 수수료가 발생할 수 있습니다.",
    },
    {
      question: "결제는 어떤 방식으로 이루어지나요?",
      answer:
        "신용카드, 계좌이체, 간편결제(카카오페이, 네이버페이) 등 다양한 결제 방식을 지원하고 있습니다.",
    },
    {
      question: "청소 도구는 따로 준비해야 하나요?",
      answer:
        "기본적인 청소 도구와 용품은 저희 직원이 모두 지참하고 방문합니다. 특별히 사용을 원하시는 제품이 있다면 미리 말씀해 주시기 바랍니다.",
    },
    {
      question: "이사 청소 서비스의 소요 시간은 얼마나 되나요?",
      answer:
        "일반적으로 20평형 기준 3-4시간 정도 소요되며, 집의 상태와 크기에 따라 달라질 수 있습니다. 정확한 소요 시간은 예약 시 상담을 통해 안내해 드립니다.",
    },
    {
      question: "이사 청소 시 주의해야 할 사항이 있나요?",
      answer:
        "이사하실 때 귀중품은 미리 안전한 곳으로 옮겨주시고, 파손 위험이 있는 물품들은 사전에 알려주시면 좋습니다. 또한 전기와 수도 사용이 가능한 상태여야 원활한 서비스가 가능합니다.",
    },
    {
      question: "세차 서비스는 어떤 종류가 있나요?",
      answer:
        "기본 외부 세차, 프리미엄 전체 세차(내/외부), 광택 시공 등 다양한 서비스를 제공하고 있습니다. 차종과 원하시는 서비스에 따라 맞춤 견적을 제공해 드립니다.",
    },
    {
      question: "세차 서비스는 어디서 진행되나요?",
      answer:
        "고객님이 원하시는 장소(자택, 회사 등)로 출장 방문하여 서비스를 제공해 드립니다. 단, 지하주차장의 경우 세차가 제한될 수 있으니 사전에 문의해 주시기 바랍니다.",
    },
    {
      question: "세차 시 특수 코팅이나 왁스 시공도 가능한가요?",
      answer:
        "네, 가능합니다. 카나우바 왁스, 세라믹 코팅 등 다양한 프리미엄 서비스를 제공하고 있습니다. 자세한 사항은 예약 시 상담을 통해 안내해 드리겠습니다.",
    },
  ];

  return (
    <div className="max-w-[1280px] mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold text-center mb-4">자주 묻는 질문</h1>
      <p className="text-gray-600 text-center mb-12">
        고객님들이 자주 문의하시는 질문들을 모았습니다.
      </p>

      <div className="bg-white rounded-lg shadow-lg">
        {qnaList.map((item, index) => (
          <QnaItem key={index} question={item.question} answer={item.answer} />
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-600 mb-4">원하시는 답변을 찾지 못하셨나요?</p>
        <button
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          onClick={() => setShowModal(true)}
        >
          1:1 문의하기
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4 flex justify-center items-center">
              안내
            </h2>
            <p className="text-gray-600 mb-6">
              죄송합니다. 1:1 문의하기 서비스는 현재 준비 중입니다. 빠른 시일
              내에 서비스를 제공해 드리도록 하겠습니다.
            </p>
            <div className="flex justify-center items-center">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                onClick={() => setShowModal(false)}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Qna;
