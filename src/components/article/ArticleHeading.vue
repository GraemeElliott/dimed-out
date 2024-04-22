<script setup lang="ts">
import type { ArticleHeadingBlock } from '@/types/types';

const { block } = defineProps<{
  block: ArticleHeadingBlock;
}>();
</script>

<template>
  <h2 :class="block.cssClass" class="mt-8 mb-4 text-xl xl:text-3xl font-bold">
    {{ block.heading }}
  </h2>
</template>

<style scoped></style>
