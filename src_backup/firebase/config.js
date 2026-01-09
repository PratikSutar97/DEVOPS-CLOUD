import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

/*const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};*/

const firebaseConfig = {
  apiKey: "AIzaSyAsc-rBsXlgeXSjXPfXRWrYIZaRSFoCCRk",
  authDomain: "infosphereee-2dedb.firebaseapp.com",
  projectId: "infosphereee-2dedb",
  storageBucket: "infosphereee-2dedb.firebasestorage.app",
  messagingSenderId: "754015635046",
  appId: "1:754015635046:web:3db205ca17fd5e6afd0fa7",
  measurementId: "G-FVVQ18BFYW"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
const analytics = getAnalytics(app);
