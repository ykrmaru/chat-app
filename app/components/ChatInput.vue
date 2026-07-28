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
  <form @submit.prevent="handleSubmit">
    <input v-model="text" type="text" placeholder="メッセージを入力" />

    <button type="submit">
      送信
    </button>
  </form>
</template>