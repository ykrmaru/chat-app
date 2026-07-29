import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import type { AuthUser } from "~/types/auth";

export const useAuth = () => {
  const { auth } = useFirebase();

  const user = useState<AuthUser | null>("user", () => null);

  const isAuthInitialized = useState("isAuthInitialized", () => false);

  const login = async () => {
    await signInWithPopup(auth, new GoogleAuthProvider());
  };

  const logout = async () => {
    await signOut(auth);
  };

  const init = () => {
    return onAuthStateChanged(auth, (firebaseUser) => {
      user.value = firebaseUser
        ? {
            uid: firebaseUser.uid,
            displayName: firebaseUser.displayName,
            email: firebaseUser.email,
            photoURL: firebaseUser.photoURL,
          }
        : null;

      isAuthInitialized.value = true;
    });
  };

  return {
    user,
    isAuthInitialized,
    login,
    logout,
    init,
  };
};
