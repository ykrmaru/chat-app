<script setup lang="ts">
import type { ChatMessage } from "~/types/chat";

const props = defineProps<{
  message: ChatMessage;
}>();

const { user } = useAuth();

const isMine = computed(() => {
  return props.message.uid === user.value?.uid;
});

const formattedTime = computed(() => {
  if (!props.message.createdAt) return "";

  return props.message.createdAt
    .toDate()
    .toLocaleTimeString("ja-JP", {
      hour: "2-digit",
      minute: "2-digit",
    });
});
</script>

<template>
  <div class="mb-4 flex" :class="isMine ? 'justify-end' : 'justify-start'">
    <div class="max-w-xs rounded-2xl px-4 py-3 shadow" :class="isMine
      ? 'rounded-2xl rounded-br-md bg-blue-500 text-white'
      : 'rounded-2xl rounded-bl-md bg-white'
      ">
      <p class="mb-1 text-xs opacity-70">
        {{ message.displayName }}
      </p>
      <p>
        {{ message.text }}
      </p>
      <p class="mt-2 text-right text-xs opacity-70">
        {{ formattedTime }}
      </p>
    </div>
  </div>
</template>