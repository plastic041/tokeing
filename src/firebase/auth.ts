import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "~/firestore";

const provider = new GoogleAuthProvider();

export const auth = getAuth(app);

export const signIn = () => {
  signInWithPopup(auth, provider);
};

export const signOut = () => {
  auth.signOut();
  window.location.reload();
};
