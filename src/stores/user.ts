import { User } from "firebase/auth";
import { atom } from "jotai";

export const currentUserAtom = atom<User | null>(null);
