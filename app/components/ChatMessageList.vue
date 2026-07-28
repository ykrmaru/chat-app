<script setup lang="ts">
const { messages } = useChat();
</script>

<template>
  <div>
    <div v-for="message in messages" :key="message.id">
      <strong>{{ message.displayName }}</strong>

      <p>{{ message.text }}</p>
    </div>
  </div>
</template>