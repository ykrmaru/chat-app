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
      <div class="flex items-center gap-2" :class="isMine ? 'flex-row-reverse' : ''">
        <img v-if="message.photoURL" :src="message.photoURL" :alt="message.displayName"
          class="h-8 w-8 rounded-full object-cover">
        <div v-else class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-sm font-bold">
          {{ message.displayName?.charAt(0) }}
        </div>
        <p class="text-sm font-semibold">
          {{ message.displayName }}
        </p>
      </div>
      <p>
        {{ message.text }}
      </p>
      <p class="mt-2 text-right text-xs opacity-70">
        {{ formattedTime }}
      </p>
    </div>
  </div>
</template>