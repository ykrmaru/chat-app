<script setup lang="ts">
const { user, login } = useAuth();
const { subscribeMessages } = useChat();

onMounted(() => {
  const unsubscribe = subscribeMessages();

  onUnmounted(() => {
    unsubscribe();
  });
});

</script>

<template>
  <template v-if="user">
    <div class="flex h-screen flex-col bg-gray-50">
      <ChatHeader />
      <ChatMessageList />
      <ChatInput />
    </div>
  </template>

  <template v-else>
    <div class="flex h-screen items-center justify-center bg-gray-50">
      <button class="rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700" @click="login">
        Login
      </button>
    </div>
  </template>
</template>