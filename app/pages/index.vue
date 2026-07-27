<script setup lang="ts">
import type { User } from "firebase/auth";

const user = useState<User | null>("user", () => null);
const { login, logout } = useAuth();
</script>

<template>
  <div v-if="user">
    <p>{{ user.displayName }}</p>
    <p>{{ user.email }}</p>

    <button @click="logout">
      Google Logout
    </button>
  </div>

  <div v-else>
    未ログイン

    <button @click="login">
      Google Login
    </button>
  </div>
</template>