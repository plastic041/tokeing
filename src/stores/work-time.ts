import { WorkTime } from "../typings/work-time";
import { atomWithStorage } from "jotai/utils";

export const workTimeAtom = atomWithStorage<WorkTime>("worktime", {
  hour: 9,
  minute: 0,
});
