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
import type { ChatItem, ChatMessage } from "~/types/chat";

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

  const chatItems = computed<ChatItem[]>(() => {
    const items: ChatItem[] = [];

    let previousDate = "";

    for (const message of messages.value) {
      if (!message.createdAt) continue;

      const formatDate = (date: Date) => date.toLocaleDateString("ja-JP");
      const date = formatDate(message.createdAt.toDate());

      if (date !== previousDate) {
        items.push({
          type: "separator",
          date,
        });

        previousDate = date;
      }

      items.push({
        type: "message",
        message,
      });
    }

    return items;
  });

  const subscribeMessages = () => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "asc"));

    return onSnapshot(q, (snapshot) => {
      messages.value = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<ChatMessage, "id">),
      }));
    });
  };

  const clearMessages = () => {
    messages.value = [];
  };

  return {
    sendMessage,
    messages,
    chatItems,
    subscribeMessages,
    clearMessages,
  };
};
