import type { Timestamp } from "firebase/firestore";

export type ChatMessage = {
  id: string;
  text: string;
  uid: string;
  displayName: string;
  photoURL: string | null;
  createdAt: Timestamp | null;
};
