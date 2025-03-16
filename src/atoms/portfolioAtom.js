import { atom } from "recoil";

// export const PortfolioListState = atom({
//   key: "PortfolioListState",
//   default: [],
// });
export const PortfolioDetailImgState = atom({
  key: "PortfolioDetailImgState",
  default: [],
});
export const PortfolioDetailInfoState = atom({
  key: "PortfolioDetailInfoState",
  default: {
    businessId: 0,
    portfolioId: 0,
    title: "",
    price: 0,
    takingTime: "",
    thumbnail: "",
    contents: "",
    detailType: "",
    category: "",
    youtubeUrl: "",
    youtubeId: "",
  },
});
export const PortfolioListState = atom({
  key: "PortfolioListState",
  default: [
    {
      businessId: 0,
      portfolioId: 0,
      title: "",
      thumbnail: "",
    },
  ],
});
