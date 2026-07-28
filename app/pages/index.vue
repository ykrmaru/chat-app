<script setup lang="ts">
import type { User } from "firebase/auth";

const user = useState<User | null>("user", () => null);
const { login, logout } = useAuth();

const { sendMessage, subscribeMessages, messages } = useChat();

const send = async () => {
  await sendMessage("初めてのメッセージ");
};

onMounted(() => {
  const unsubscribe = subscribeMessages();

  onUnmounted(() => {
    unsubscribe();
  });
});

</script>

<template>
  <div v-if="user">
    <p>{{ user.displayName }}</p>
    <p>{{ user.email }}</p>

    <div v-for="message in messages" :key="message.id">
      <p>{{ message.displayName }}</p>
      <p>{{ message.text }}</p>
    </div>

    <div>
      <button @click="logout">
        Google Logout
      </button>
    </div>

    <div>
      <button @click="send">
        メッセージ送信
      </button>
    </div>
  </div>

  <div v-else>
    <p>未ログイン</p>

    <div>
      <button @click="login">
        Google Login
      </button>
    </div>
  </div>
</template>