import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

export const useAuth = () => {
  const { auth } = useFirebase();

  const provider = new GoogleAuthProvider();

  const login = async () => {
    await signInWithPopup(auth, provider);
  };

  const logout = async () => {
    await signOut(auth);
  };

  return {
    login,
    logout,
  };
};
