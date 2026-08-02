<script setup lang="ts">
const { user } = useAuth();
const {
  initMessages,
  clearMessages,
} = useChat();

let unsubscribeMessages:
  | (() => void)
  | null = null;

watch(
  () => user.value?.uid ?? null,
  async (uid) => {
    unsubscribeMessages?.();
    unsubscribeMessages = null;

    if (uid) {
      unsubscribeMessages =
        await initMessages();
    } else {
      clearMessages();
    }
  },
  { immediate: true }
);

onUnmounted(() => {
  unsubscribeMessages?.();
});
onUnmounted(() => {
  unsubscribeMessages?.();
});
</script>

<template>
  <div class="flex h-screen flex-col bg-gray-50">
    <ChatHeader />
    <ChatMessageList v-if="user" />
    <div v-else class="flex h-screen items-center justify-center">
      <p class="text-gray-600">チャットを見るにはログインしてください。</p>
    </div>
    <ChatInput v-if="user" />
  </div>
</template>