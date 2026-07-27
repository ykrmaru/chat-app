import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { useFirebase } from "./useFirebase";
import { useAuth } from "./useAuth";

export const useChat = () => {
  const { db } = useFirebase();
  const { user } = useAuth();

  const sendMessage = async (text: string) => {
    if (!user.value) {
      throw new Error("ログインしてください");
    }

    await addDoc(collection(db, "messages"), {
      text,
      uid: user.value.uid,
      displayName: user.value.displayName,
      photoURL: user.value.photoURL,
      createdAt: serverTimestamp(),
    });
  };

  return {
    sendMessage,
  };
};
