import { atom, RecoilState } from "recoil";

export const checkRoom: RecoilState<number> = atom({
  key: "checkRoom",
  default: 0,
});
