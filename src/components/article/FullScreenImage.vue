<script setup lang="ts">
interface Props {
  imageUrl: string;
  alt: string;
  imageClass?: string;
}

defineProps<Props>();
</script>

<template>
  <div class="h-screen">
    <img
      :src="imageUrl"
      :alt="alt"
      :class="imageClass"
      class="w-full h-full object-cover"
      loading="lazy"
    />
  </div>
</template>

<style scoped></style>
