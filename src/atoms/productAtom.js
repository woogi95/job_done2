import { atom } from "recoil";

export const ProductState = atom({
  key: "ProductState",
  default: {
    productId: 0,
    productPrice: 0,
    detailTypeName: "",
    optionList: [
      {
        optionId: 0,
        optionName: "",
        optionDetailList: [
          {
            optionDetailId: 0,
            optionDetailName: "",
            optionDetailPrice: 0,
            contents: "",
          },
        ],
      },
    ],
  },
});
