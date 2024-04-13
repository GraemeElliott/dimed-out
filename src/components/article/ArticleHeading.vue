<template>
  <h2 :class="block.cssClass" class="mt-8 mb-4 text-xl xl:text-3xl font-bold">
    {{ block.heading }}
  </h2>
</template>

<script setup lang="ts">
import type { ArticleHeadingBlock } from '../../types/types'; // Adjust the path to where your types are defined

const { block } = defineProps<{
  block: ArticleHeadingBlock;
}>();
</script>

<style scoped>
/* Additional styling can go here */
</style>
