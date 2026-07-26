import type { Auth } from "firebase/auth";
import type { Firestore } from "firebase/firestore";

export const useFirebase = () => {
  const { $auth, $db } = useNuxtApp();

  return {
    auth: $auth,
    db: $db,
  };
};
