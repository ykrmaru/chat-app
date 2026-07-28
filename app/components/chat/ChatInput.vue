<script setup lang="ts">
const text = ref("");
const isSending = ref(false);
const isComposing = ref(false);

const { sendMessage } = useChat();

const handleSubmit = async () => {
  if (isSending.value) return;

  const value = text.value.trim();

  if (!value) return;

  isSending.value = true;

  try {
    await sendMessage(value);
    text.value = "";
  } catch (error) {
    console.error(error);
  } finally {
    isSending.value = false;
  }
};

const isImeComposing = (event: KeyboardEvent) => {
  return (
    isComposing.value ||
    event.isComposing ||
    (event as KeyboardEvent & { keyCode?: number }).keyCode === 229
  );
};

const handleKeyDown = async (event: KeyboardEvent) => {
  if (isImeComposing(event)) return;

  if (event.key !== "Enter") return;
  if (event.shiftKey) return;

  event.preventDefault();

  await handleSubmit();
};
</script>

<template>
  <form class="flex items-center gap-4 border-t border-gray-200 bg-white p-4" @submit.prevent="handleSubmit">
    <textarea v-model="text" rows="2" placeholder="メッセージを入力..."
      class="w-full resize-none rounded-xl border px-4 py-3 outline-none focus:border-blue-500" @keydown="handleKeyDown"
      @compositionstart="isComposing = true" @compositionend="isComposing = false"></textarea>
    <button type="submit" class="min-w-max h-min rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
      :disabled="isSending">
      送信
    </button>
  </form>
</template>