<script setup lang="ts">
const { user, isAuthInitialized } = useAuth();

const {
  initMessages,
  clearMessages,
} = useChat();

let unsubscribeMessages: (() => void) | null = null;

watch(
  () => user.value?.uid ?? null,
  async (uid) => {
    unsubscribeMessages?.();
    unsubscribeMessages = null;

    if (uid) {
      unsubscribeMessages = await initMessages();
    } else {
      clearMessages();
    }
  },
  { immediate: true }
);

onUnmounted(() => {
  unsubscribeMessages?.();
});
</script>

<template>
  <div class="flex h-screen flex-col bg-gray-50">
    <ChatHeader />

    <!-- 認証確認中 -->
    <div v-if="!isAuthInitialized" class="flex flex-1 items-center justify-center">
      <AppSpinner :size="32" />
    </div>

    <!-- ログイン済み -->
    <template v-else-if="user">
      <ChatMessageList />
      <ChatInput />
    </template>

    <!-- 認証確認完了かつ未ログイン -->
    <div v-else class="flex flex-1 items-center justify-center">
      <p class="text-gray-600">
        チャットを見るにはログインしてください。
      </p>
    </div>
  </div>
</template>