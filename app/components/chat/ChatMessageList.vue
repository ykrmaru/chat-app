<script setup lang="ts">
import { nextTick, ref, watch } from "vue";

const { messages, chatItems } = useChat();

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
    <template v-for="item in chatItems" :key="item.type === 'separator'
      ? `separator-${item.date}`
      : item.message.id
      ">
      <ChatDateSeparator v-if="item.type === 'separator'" :date="item.date" />
      <ChatMessageItem v-else :message="item.message" />
    </template>
  </main>
</template>