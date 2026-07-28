<script setup lang="ts">
const text = ref("");

const { sendMessage } = useChat();

const handleSubmit = async () => {
  const value = text.value.trim();

  if (!value) return;

  await sendMessage(value);

  text.value = "";
};
</script>

<template>
  <form class="flex gap-4 border-t border-gray-200 bg-white p-4" @submit.prevent="handleSubmit">
    <input v-model="text" type="text" placeholder="メッセージを入力..."
      class="flex-1 rounded border border-gray-300 px-4 py-2 outline-none focus:border-blue-500">

    <button type="submit" class="rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700">
      送信
    </button>
  </form>
</template>