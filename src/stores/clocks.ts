import type { Clock } from "../typings/clock";
import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";

export const clocksAtom = atomWithStorage<Clock[]>("clocks", []);

export const currentClockAtom = atom<Clock | null>(null);
