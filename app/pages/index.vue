<script setup lang="ts">
const { user, isAuthInitialized } = useAuth();

const {
  initMessages,
  clearMessages,
  isInitialLoadingMessages,
} = useChat();

let unsubscribeMessages: (() => void) | null = null;

watch(
  [
    () => isAuthInitialized.value,
    () => user.value?.uid ?? null,
  ],
  async ([initialized, uid]) => {
    if (!initialized) return;

    unsubscribeMessages?.();
    unsubscribeMessages = null;

    if (uid) {
      unsubscribeMessages = await initMessages();
    } else {
      clearMessages();
    }
  },
  { immediate: true },
);

onUnmounted(() => {
  unsubscribeMessages?.();
});
</script>

<template>
  <div class="flex h-screen flex-col bg-gray-50">
    <ChatHeader />

    <!-- Firebase Authの確認中 -->
    <div v-if="!isAuthInitialized" class="flex flex-1 items-center justify-center">
      <AppSpinner :size="32" />
    </div>

    <!-- ログイン済み -->
    <template v-else-if="user">
      <!-- 初回メッセージ取得中 -->
      <ChatMessageListSkeleton v-if="isInitialLoadingMessages" />

      <!-- 初回取得完了 -->
      <ChatMessageList v-else />

      <ChatInput />
    </template>

    <!-- 未ログイン -->
    <div v-else class="flex flex-1 items-center justify-center">
      <p class="text-gray-600">
        チャットを見るにはログインしてください。
      </p>
    </div>
  </div>
</template>