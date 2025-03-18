import { atom } from "recoil";

export interface ReviewListState {
  reviewId: number;
  contents: string;
  score: number;
  createdAt: string;
  userId: number;
  name: string;
  writerPic: string;
  detailTypeName: string;
  averageScore: number;
  pics: string[];
  comment: {
    commentId: number;
    contents: string;
    createdAt: string;
    updatedAt: string;
    writerUserId: number;
    name: string;
    logo: string;
  };
}

export const reviewListStateT = atom<ReviewListState[]>({
  key: "reviewListStateT",
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
