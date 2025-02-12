export const statusText = {
  0: "확인중...",
  1: "예약완료",
  2: "결제 대기중",
  3: "예약취소",
  4: "예약취소",
  5: "예약취소",
  6: "결제완료",
  7: "작업완료",
  8: "작업완료",
  9: "작업완료",
};

export const serviceIcons = [
  // 대충만든 더미데이터
  {
    id: 1,
    title: "청소",
    image: "/images/order/cleaning_icon.jpg",
    link: "/cleaning",
  },
  {
    id: 2,
    title: "세차",
    image: "/images/order/cleaning_icon.jpg",
    link: "/carwash",
  },
  {
    id: 2,
    title: "이사",
    image: "/images/order/cleaning_icon.jpg",
    link: "/move",
  },
];

// 인기 게시글 더미데이터
export const PopularPost = [
  {
    id: 1,
    comment: "더러운 당신의 집! 마법같이 청소  해드립니다!",
    image: "/images/order/Interior_1.jpg",
    price: 50000,
    company: "홈클린",
    link: "/cleaning",
    review: "4.5",
  },
  {
    id: 2,
    comment: "더러운 당신의 집! 마법같이 청소  해드립니다!",
    image: "/images/order/Interior_1.jpg",
    price: 100000,
    company: "홈클린",
    link: "/cleaning",
    review: "4.5",
  },
  {
    id: 3,
    comment: "더러운 당신의 집! 마법같이 청소  해드립니다!",
    image: "/images/order/Interior_1.jpg",
    price: 150000,
    company: "홈클린",
    link: "/cleaning",
    review: "4.5",
  },
];

// 이벤트 배너 더미데이터
export const EventBanner = [
  {
    id: 1,
    title: "즐거운 청소 이벤트!",
    image: "/images/event/event_banner_1.png",
    link: "/",
  },
  {
    id: 2,
    title: "이사가 고민이라면?",
    image: "/images/event/event_banner_2.jpg",
    link: "/",
  },
  {
    id: 3,
    title: "세차 이벤트를 만나보세요!",
    image: "/images/event/event_banner_3.jpg",
    link: "/",
  },
];

// 찜목록 더미데이터
export const UsageTest = [
  {
    businessId: 1,
    pic: "/images/order/Interior_1.jpg",
    title: "더러운 당신의 집! 마법같이 청소  해드립니다!",
    businessName: "홈클린",
    price: 50000,
    score: 4.5,
    reviewNumbers: 10,
  },
  {
    businessId: 2,
    pic: "/images/order/Interior_1.jpg",
    title: "더러운 당신의 집! 마법같이 청소  해드립니다!",
    businessName: "홈클린",
    price: 50000,
    score: 4.5,
    reviewNumbers: 10,
  },
  {
    businessId: 3,
    pic: "/images/order/Interior_1.jpg",
    title: "더러운 당신의 집! 마법같이 청소  해드립니다!",
    businessName: "홈클린",
    price: 50000,
    score: 4.5,
    reviewNumbers: 10,
  },
  {
    businessId: 4,
    pic: "/images/order/Interior_1.jpg",
    title: "더러운 당신의 집! 마법같이 청소  해드립니다!",
    businessName: "홈클린",
    price: 50000,
    score: 4.5,
    reviewNumbers: 10,
  },
];

// 메시지함 더미데이터
export const MessageTest = [
  {
    resultData: [
      {
        roomId: 1,
        chatId: 1,
        pic: "/images/order/Interior_1.jpg",
        companyName: "지구컴스",
        roomCreatedAt: "2025-01-13",
        title: "업체 소개 타이틀 입니다 테스트 중입니다.",
      },
    ],
  },
  {
    resultData: [
      {
        roomId: 2,
        chatId: 2,
        pic: "/images/order/Interior_1.jpg",
        companyName: "홈클린",
        recentlyChat: "string",
        roomCreatedAt: "2025-01-13",
        title: "업체 소개 타이틀 입니다 테스트 중입니다.",
      },
    ],
  },
];

// 메시지 상세 더미데이터
export const MessageDetail = [
  {
    resultData: [
      {
        roomId: 1,
        chatId: 1,
        pic: "/images/order/Interior_1.jpg",
        companyName: "지구컴스",
        roomCreatedAt: "2025-01-13",
        companyChat: "안녕하세요 홈클린 입니다.",
        userChat: "안녕하세요",
        sendTime: "오후2:30",
      },
    ],
  },
  {
    resultData: [
      {
        roomId: 2,
        chatId: 2,
        pic: "/images/order/Interior_1.jpg",
        companyName: "홈클린",
        roomCreatedAt: "2025-01-15",
        companyChat: "안녕하세요 ㅎㅎ",
        userChat: "안녕하세요 ㅎㅎ",
        sendDate: "오후4:30",
      },
    ],
  },
];

export const ReservationData = [
  {
    resultData: [
      {
        serviceId: 0,
        userId: 0,
        businessName: "홈클린",
        productName: "집청소",
        price: 100000,
        completed: 0,
        startDate: "2025-1-15",
      },
    ],
  },
  {
    resultData: [
      {
        serviceId: 0,
        userId: 0,
        businessName: "홈클린",
        productName: "집청소",
        price: 150000,
        completed: 1,
        startDate: "2025-1-20",
      },
    ],
  },
  {
    resultData: [
      {
        serviceId: 0,
        userId: 0,
        businessName: "홈클린",
        productName: "집청소",
        price: 150000,
        completed: 7,
        startDate: "2025-1-20",
      },
    ],
  },
];
