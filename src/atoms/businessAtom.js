import { atom } from "recoil";
// 기업 정보 폼
export const businessInfo = atom({
  key: "businessInfo",
  default: {
    userId: 0,
    businessNum: "",
    businessName: "",
    address: "",
    detailTypeId: "",
    busiCreatedAt: "2019.06.08",
    tel: "0533836669",
    paper: "",
    logo: "",
  },
});
// 기업 로고 폼
export const busiFile = atom({
  key: "busiFile",
  default: null,
});
export const busiNumFile = atom({
  key: "busiNumFile",
  default: null,
});

// 사업자 중복확인 모달창
export const numDubCheck = atom({
  key: "numDubCheck",
  default: false,
});
// 경고 메세지
export const checkMsg = atom({
  key: "checkMsg",
  default: true,
});

// 한 업체 조회(업체 디테일 정보)
export const businessDetailState = atom({
  key: "businessDetailState",
  default: [
    {
      logo: null,
      productId: 0,
      categoryId: 0,
      detailTypeId: 0,
      businessId: 0,
      detailTypeName: null,
      businessName: null,
      title: null,
      scoreAvg: 0,
      price: 0,
      like: 0,
      address: null,
      serviceCount: 0,
      openingTime: null,
      closingTime: null,
      years: 0,
      contents: null,
      reviewCount: 0,
      tel: null,
      safeTel: null,
      businessNum: "",
    },
  ],
});

// 견적서 & 예약서 & 결제서
export const papersState = atom({
  key: "papersState",
  default: {
    serviceId: 0,
    userName: "",
    userPhone: "",
    businessName: "",
    detailTypeName: "",
    businessPhone: "",
    price: 0,
    addPrice: 0,
    totalPrice: 0,
    completed: 0,
    comment: "",
    addComment: "",
    startDate: "",
    endDate: "",
    address: "",
    businessAddress: "",
    categoryName: "",
    businessNum: "",
    createdAt: "",
    updatedAt: "",
    paidAt: "",
    doneAt: "",
    pyeong: "",
    options: [
      {
        optionName: "",
        optionDetailName: "",
        optionDetailPrice: 0,
      },
    ],
    etc: [
      {
        etcId: 0,
        etcPrice: 0,
        etcComment: "",
      },
    ],
    mstartTime: "",
    mendTime: "",
  },
});

// 포트폴리오 리스트
export const portfolioListState = atom({
  key: "portfolioListState",
  default: [
    {
      portfolioId: 0,
      title: "",
      isThumnail: "",
    },
  ],
});

export const serviceIdState = atom({
  key: "serviceIdState",
  default: 0,
});

// OCR 정보
export const ocrDataAtom = atom({
  key: "ocrDataAtom",
  default: {},
});

// 상품 상세
export const productDetailState = atom({
  key: "productDetailState",
  default: {
    title: "",
    contents: "",
  },
});

export const comModalState = atom({
  key: "comModalState",
  default: false,
});
