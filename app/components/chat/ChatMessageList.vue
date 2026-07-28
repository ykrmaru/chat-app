<script setup lang="ts">
import { nextTick, ref, watch } from "vue";

const { messages } = useChat();

const messageListRef = ref<HTMLElement | null>(null);

watch(
  () => messages.value.length,
  async () => {
    await nextTick();

    if (!messageListRef.value) return;

    messageListRef.value.scrollTop =
      messageListRef.value.scrollHeight;
  }
);
</script>

<template>
  <main ref="messageListRef" class="flex-1 overflow-y-auto p-6">
    <ChatMessageItem v-for="message in messages" :key="message.id" :message="message" />
  </main>
</template>