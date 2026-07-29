<script setup lang="ts">
const { init } = useAuth();

let unsubscribeAuth: (() => void) | null = null;

onMounted(() => {
  unsubscribeAuth = init();
});

onUnmounted(() => {
  unsubscribeAuth?.();
});
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtPage />
</template>