<script setup lang="ts">
const { subscribeMessages } = useChat();

onMounted(() => {
  const unsubscribe = subscribeMessages();

  onUnmounted(() => {
    unsubscribe();
  });
});

</script>

<template>
  <div class="flex h-screen flex-col bg-gray-50">
    <ChatHeader />
    <ChatMessageList />
    <ChatInput />
  </div>
</template>