<script setup lang="ts">
import type { User } from "firebase/auth";

const user = useState<User | null>("user", () => null);
const { login, logout } = useAuth();

const { sendMessage } = useChat();

const send = async () => {
  await sendMessage("初めてのメッセージ");
};
</script>

<template>
  <div v-if="user">
    <p>{{ user.displayName }}</p>
    <p>{{ user.email }}</p>

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