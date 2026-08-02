import {
  addDoc,
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  startAfter,
  type DocumentData,
  type QueryDocumentSnapshot,
} from "firebase/firestore";

import { useFirebase } from "./useFirebase";
import { useAuth } from "./useAuth";
import type { ChatItem, ChatMessage } from "~/types/chat";

const PAGE_SIZE = 20;

let oldestDocument: QueryDocumentSnapshot<DocumentData> | null = null;

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

  const isLoadingMessages = useState("isLoadingMessages", () => false);

  const hasMoreMessages = useState("hasMoreMessages", () => true);

  const isInitialLoadingMessages = useState(
    "isInitialLoadingMessages",
    () => false,
  );

  const toChatMessage = (
    document: QueryDocumentSnapshot<DocumentData>,
  ): ChatMessage => ({
    id: document.id,
    ...(document.data() as Omit<ChatMessage, "id">),
  });

  const fetchInitialMessages = async () => {
    if (isLoadingMessages.value) return;

    isLoadingMessages.value = true;

    try {
      const messagesQuery = query(
        collection(db, "messages"),
        orderBy("createdAt", "desc"),
        limit(PAGE_SIZE),
      );

      const snapshot = await getDocs(messagesQuery);

      const fetchedMessages = snapshot.docs.map(toChatMessage).reverse();

      messages.value = fetchedMessages;

      oldestDocument = snapshot.docs.at(-1) ?? null;

      hasMoreMessages.value = snapshot.size === PAGE_SIZE;
    } finally {
      isLoadingMessages.value = false;
    }
  };

  const fetchOlderMessages = async () => {
    if (isLoadingMessages.value || !hasMoreMessages.value || !oldestDocument) {
      return;
    }

    isLoadingMessages.value = true;

    try {
      const messagesQuery = query(
        collection(db, "messages"),
        orderBy("createdAt", "desc"),
        startAfter(oldestDocument),
        limit(PAGE_SIZE),
      );

      const snapshot = await getDocs(messagesQuery);

      const olderMessages = snapshot.docs.map(toChatMessage).reverse();

      messages.value = [...olderMessages, ...messages.value];

      oldestDocument = snapshot.docs.at(-1) ?? oldestDocument;

      hasMoreMessages.value = snapshot.size === PAGE_SIZE;
    } finally {
      isLoadingMessages.value = false;
    }
  };

  const formatDate = (date: Date) => date.toLocaleDateString("ja-JP");

  const chatItems = computed<ChatItem[]>(() => {
    const items: ChatItem[] = [];

    let previousDate = "";

    for (const message of messages.value) {
      if (!message.createdAt) continue;

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
    const latestMessagesQuery = query(
      collection(db, "messages"),
      orderBy("createdAt", "desc"),
      limit(PAGE_SIZE),
    );

    return onSnapshot(
      latestMessagesQuery,
      (snapshot) => {
        for (const change of snapshot.docChanges()) {
          if (change.type !== "added" && change.type !== "modified") {
            continue;
          }

          const message = toChatMessage(change.doc);

          const index = messages.value.findIndex(
            (item) => item.id === message.id,
          );

          if (index === -1) {
            messages.value = [...messages.value, message];
          } else {
            messages.value[index] = message;
          }
        }

        messages.value.sort((a, b) => {
          const aTime = a.createdAt?.toMillis() ?? Number.MAX_SAFE_INTEGER;
          const bTime = b.createdAt?.toMillis() ?? Number.MAX_SAFE_INTEGER;

          return aTime - bTime;
        });
      },
      (error) => {
        console.error("メッセージの購読に失敗しました。", error);
      },
    );
  };

  const initMessages = async () => {
    oldestDocument = null;
    hasMoreMessages.value = true;
    messages.value = [];

    isInitialLoadingMessages.value = true;

    try {
      await fetchInitialMessages();

      return subscribeMessages();
    } finally {
      isInitialLoadingMessages.value = false;
    }
  };

  const clearMessages = () => {
    messages.value = [];
    oldestDocument = null;
    hasMoreMessages.value = true;
    isInitialLoadingMessages.value = false;
  };

  return {
    sendMessage,
    messages,
    chatItems,
    isLoadingMessages,
    hasMoreMessages,
    isInitialLoadingMessages,
    initMessages,
    fetchOlderMessages,
    clearMessages,
  };
};
