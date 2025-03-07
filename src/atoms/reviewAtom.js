import { atom } from "recoil";

export const reviewListState = atom({
  key: "reviewListState",
  default: [
    {
      reviewId: 0,
      contents: "",
      score: 0,
      createdAt: "",
      userId: 0,
      name: "",
      writerPic: "",
      detailTypeName: "",
      averageScore: 0,
      pics: [""],
      comment: {
        commentId: 0,
        contents: "",
        createdAt: "",
        updatedAt: "",
        writerUserId: 0,
        name: "",
        logo: "",
      },
    },
  ],
});

export const commentState = atom({
  key: "commentState",
  default: false,
});

export const commentModals = atom({
  key: "commentModals",
  default: false,
});

export const commentsBox = atom({
  key: "commentsBox",
  default: {},
});

export const reviewIdState = atom({
  key: "reviewIdState",
  default: {},
});

export const reviewPicsList = atom({
  key: " reviewPicsList",
  default: [],
});

export const selectReviewAtom = atom({
  key: "selectReviewAtom ",
  default: {
    reviewId: 0,
    id: 0,
    userName: 0,
    detailTypeName: "",
    createdAt: "",
    score: 0,
    replyStatus: {},
    contents: "",
  },
});
