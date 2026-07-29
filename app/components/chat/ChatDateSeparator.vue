<script setup lang="ts">
defineProps<{
  date: string;
}>();
</script>

<template>
  <div class="my-6 flex items-center">
    <div class="h-px flex-1 bg-gray-300" />

    <span class="mx-4 rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
      {{ date }}
    </span>

    <div class="h-px flex-1 bg-gray-300" />
  </div>
</template>