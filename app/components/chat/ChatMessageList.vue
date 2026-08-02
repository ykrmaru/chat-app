<script setup lang="ts">
import { nextTick, ref, watch } from "vue";

const {
  chatItems,
  fetchOlderMessages,
  isLoadingMessages,
  hasMoreMessages,
} = useChat();

const messageListRef = ref<HTMLElement | null>(null);

const handleScroll = async () => {
  const element = messageListRef.value;

  if (
    !element ||
    element.scrollTop > 50 ||
    isLoadingMessages.value ||
    !hasMoreMessages.value
  ) {
    return;
  }

  const previousScrollHeight =
    element.scrollHeight;

  await fetchOlderMessages();
  await nextTick();

  const newScrollHeight =
    element.scrollHeight;

  element.scrollTop =
    newScrollHeight - previousScrollHeight;
};

watch(
  () => chatItems.value.length,
  async () => {
    await nextTick();

    if (!messageListRef.value) return;

    messageListRef.value.scrollTop =
      messageListRef.value.scrollHeight;
  }
);
</script>

<template>
  <main ref="messageListRef" class="min-h-0 flex-1 overflow-y-auto p-6" @scroll="handleScroll">
    <div v-if="isLoadingMessages" class="flex justify-center py-4 text-blue-600">
      <AppSpinner :size="24" />
    </div>

    <p v-else-if="!hasMoreMessages" class="py-4 text-center text-xs text-gray-400">
      これより前のメッセージはありません
    </p>
    <template v-for="item in chatItems" :key="item.type === 'separator'
      ? `separator-${item.date}`
      : item.message.id
      ">
      <ChatDateSeparator v-if="item.type === 'separator'" :date="item.date" />
      <ChatMessageItem v-else :message="item.message" />
    </template>
  </main>
</template>