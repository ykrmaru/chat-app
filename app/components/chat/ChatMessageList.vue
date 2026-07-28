<script setup lang="ts">
const { messages } = useChat();
</script>

<template>
  <main class="flex-1 overflow-y-auto p-6">
    <ChatMessageItem v-for="message in messages" :key="message.id" :message="message" />
  </main>
</template>