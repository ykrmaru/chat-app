import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

import { useFirebase } from "./useFirebase";
import { useAuth } from "./useAuth";
import type { ChatMessage } from "~/types/chat";

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

  const messages = useState<ChatMessage[]>("messages", () => []);

  const subscribeMessages = () => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "asc"));

    return onSnapshot(q, (snapshot) => {
      messages.value = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<ChatMessage, "id">),
      }));
    });
  };

  return {
    sendMessage,
    messages,
    subscribeMessages,
  };
};
