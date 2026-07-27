import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";

export const useAuth = () => {
  const { auth } = useFirebase();

  const user = useState<User | null>("user", () => null);

  const login = async () => {
    await signInWithPopup(auth, new GoogleAuthProvider());
  };

  const logout = async () => {
    await signOut(auth);
  };

  const init = () => {
    onAuthStateChanged(auth, (firebaseUser) => {
      user.value = firebaseUser;
    });
  };

  return {
    user,
    login,
    logout,
    init,
  };
};
