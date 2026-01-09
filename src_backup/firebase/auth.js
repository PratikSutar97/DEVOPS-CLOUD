import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./config";
//export const auth = getAuth(app);
export const loginAdmin = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const logoutAdmin = () => signOut(auth);

