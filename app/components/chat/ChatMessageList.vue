<script setup lang="ts">
import {
  computed,
  nextTick,
  onMounted,
  ref,
  watch,
} from "vue";

const {
  chatItems,
  fetchOlderMessages,
  isLoadingMessages,
  hasMoreMessages,
} = useChat();

const messageListRef = ref<HTMLElement | null>(null);

const scrollToBottom = async () => {
  await nextTick();

  const element = messageListRef.value;

  if (!element) return;

  element.scrollTop = element.scrollHeight;
};

/**
 * 一覧末尾にある最新メッセージのID
 *
 * 過去メッセージを先頭へ追加しても、この値は変わらないため、
 * 無限スクロール時に一番下へ戻されるのを防げます。
 */
const latestMessageId = computed(() => {
  const latestItem = chatItems.value.at(-1);

  if (!latestItem || latestItem.type !== "message") {
    return null;
  }

  return latestItem.message.id;
});

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

  const previousScrollHeight = element.scrollHeight;

  await fetchOlderMessages();
  await nextTick();

  const newScrollHeight = element.scrollHeight;

  // 過去データ追加前に見ていた位置を維持する
  element.scrollTop = newScrollHeight - previousScrollHeight;
};

// リロード後・初回表示時
onMounted(() => {
  void scrollToBottom();
});

// 新しいメッセージが末尾へ追加されたとき
watch(latestMessageId, () => {
  void scrollToBottom();
});
</script>

<template>
  <main ref="messageListRef" class="min-h-0 flex-1 overflow-y-auto p-6" @scroll="handleScroll">
    <div v-if="isLoadingMessages" class="flex justify-center py-4 text-blue-600">
      <CommonAppSpinner :size="24" />
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