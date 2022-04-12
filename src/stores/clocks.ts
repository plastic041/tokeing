import type { Clock } from "../typings/clock";
import { atomWithStorage } from "jotai/utils";

export const clocksAtom = atomWithStorage<Clock[]>("clocks", []);
