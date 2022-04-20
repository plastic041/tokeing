import { getDatabase, ref, set } from "firebase/database";
import { app } from "../firestore";
import { Clock } from "../typings/clock";

export const db = getDatabase(app);

export const writeClocks = (uid: string, clocks: Clock[]) => {
  set(ref(db, `users/${uid}`), {
    ...clocks,
  });
};
