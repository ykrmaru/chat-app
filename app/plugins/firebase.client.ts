import { getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

export default defineNuxtPlugin((nuxtApp) => {
  const config = nuxtApp.$config;

  const firebaseConfig = {
    apiKey: config.public.firebaseApiKey,
    authDomain: config.public.firebaseAuthDomain,
    projectId: config.public.firebaseProjectId,
    storageBucket: config.public.firebaseStorageBucket,
    messagingSenderId: config.public.firebaseMessagingSenderId,
    appId: config.public.firebaseAppId,
  };

  const apps = getApps();

  const app = apps.length > 0 ? apps[0]! : initializeApp(firebaseConfig);

  const auth: Auth = getAuth(app);
  const db: Firestore = getFirestore(app);

  return {
    provide: {
      auth,
      db,
    },
  };
});
