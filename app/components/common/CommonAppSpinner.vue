<script setup lang="ts">
type Props = {
  size?: number;
};

withDefaults(defineProps<Props>(), {
  size: 20,
});
</script>

<template>
  <svg class="animate-spin" :width="size" :height="size" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" class="stroke-gray-300" stroke-width="4" />

    <path d="M22 12a10 10 0 0 0-10-10" class="stroke-white" stroke-width="4" stroke-linecap="round" />
  </svg>
</template>