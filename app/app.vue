<script setup lang="ts">
const { init } = useAuth();

onMounted(() => {
  init();
});
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtPage />
</template>