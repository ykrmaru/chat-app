<script setup lang="ts">
const { user, logout } = useAuth();
</script>

<template>
  <header class="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
    <h1 class="text-xl font-bold">
      Firebase Chat
    </h1>

    <div v-if="user" class="flex items-center gap-4">
      <span class="text-sm text-gray-600">
        {{ user.displayName }}
      </span>

      <button class="rounded bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600" @click="logout">
        Logout
      </button>
    </div>
  </header>
</template>