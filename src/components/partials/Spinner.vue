<template>
  <div v-loading="isLoading" element-loading-text="Loading..." class=""></div>
</template>

<script lang="ts" setup>
defineProps({
  isLoading: Boolean,
});
</script>

<style></style>
