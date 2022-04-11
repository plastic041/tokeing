import { atom } from "jotai";

export const workTimeAtom = atom<{
  hour: number;
  minute: number;
}>({
  hour: 9,
  minute: 0,
});
