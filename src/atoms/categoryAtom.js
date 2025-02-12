import { atom } from "recoil";

export const categoriesState = atom({
  key: "categoriesState",
  default: [],
});

export const detailTypesState = atom({
  key: "detailTypesState",
  default: [],
});
export const categoriesStateS = atom({
  key: "categoriesStateS",
  default: [],
});

export const detailTypesStateS = atom({
  key: "detailTypesStateS",
  default: [],
});

// 카테고리 찍을 때 나오는 숫자
export const selectedCategoryState = atom({
  key: "selectedCategoryState",
  default: {
    CategoryId: 1,
    CategoryName: "",
  },
});

export const selectedDetailTypeState = atom({
  key: "selectedDetailTypeState",
  default: {
    detailTypeId: 1,
    detailTypeName: "",
  },
});

export const regionState = atom({
  key: "regionState",
  default: undefined,
});

// 제목 카테고리 반영 스테이트
export const categoryList = atom({
  key: "categoryList",
  default: [],
});
export const detailList = atom({
  key: "detailList",
  default: [],
});
