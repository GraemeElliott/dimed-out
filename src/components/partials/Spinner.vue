<template>
  <!-- Use the prop directly for the v-loading directive -->
  <div
    v-loading="isLoading"
    element-loading-text="Loading..."
    class="flex translate-y-36 lg:translate-y-80"
  >
    <!-- Your spinner content or leave empty for Element Plus spinner -->
  </div>
</template>

<script lang="ts" setup>
defineProps({
  isLoading: Boolean,
});
</script>

<style></style>
