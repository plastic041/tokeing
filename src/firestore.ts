import { initializeApp } from "firebase/app";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const firebaseConfig = {
  apiKey: "AIzaSyDheCYsNANb_yJ4KNB-QnGg1zuAN3g3MiI",
  authDomain: "tokein.firebaseapp.com",
  projectId: "tokein",
  databaseURL:
    "https://tokein-default-rtdb.asia-southeast1.firebasedatabase.app",
  storageBucket: "tokein.appspot.com",
  messagingSenderId: "725815688015",
  appId: "1:725815688015:web:cd7fef521b408d1498e33a",
  measurementId: "G-QKH3TVN44B",
};

export const app = initializeApp(firebaseConfig);

if (import.meta.env.MODE === "development") {
  // @ts-ignore
  self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
}
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider("6Ldqv4cfAAAAALKCaTqiFHP_f86FXtM2b9msRqrj"),
  isTokenAutoRefreshEnabled: true,
});
