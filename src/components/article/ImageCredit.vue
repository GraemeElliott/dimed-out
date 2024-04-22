<script setup lang="ts">
defineProps({
  credit: {
    type: String,
  },
});
</script>

<template>
  <h2 class="text-right font-bold text-xs">Credit - {{ credit }}</h2>
</template>

<style scoped></style>
