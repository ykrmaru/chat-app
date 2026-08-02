<script setup lang="ts">
const { user, logout, login, isAuthInitialized } = useAuth();
</script>

<template>
  <header class="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
    <h1 class="text-xl font-bold">
      Firebase Chat
    </h1>
    <div v-if="!isAuthInitialized" class="flex h-screen items-center justify-center min-w-24">
      <CommonAppSpinner :size="24" />
    </div>
    <div v-else-if="user" class="flex items-center gap-4">
      <span class="text-sm text-gray-600">
        {{ user.displayName }}
      </span>
      <button class="rounded bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600" @click="logout">
        ログアウト
      </button>
    </div>
    <div v-else>
      <button class="rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700" @click="login">
        ログイン
      </button>
    </div>
  </header>
</template>