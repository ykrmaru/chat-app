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
  <div>
    <h1 class="text-3xl font-bold text-blue-600">
      Firebase Chat
    </h1>
    <ChatMessageList />
    <ChatInput />
  </div>
</template>