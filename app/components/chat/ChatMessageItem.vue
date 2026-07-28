<script setup lang="ts">
import type { ChatMessage } from "~/types/chat";

defineProps<{
  message: ChatMessage;
}>();
</script>

<template>
  <div class="mb-4 rounded bg-gray-100 p-3">
    <p class="text-sm font-bold">
      {{ message.displayName }}
    </p>

    <p class="mt-1">
      {{ message.text }}
    </p>
  </div>
</template>