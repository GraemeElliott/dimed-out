<script setup lang="ts">
import type { Quote } from '@/types/types';

const { block } = defineProps<{
  block: Quote;
}>();
</script>

<template>
  <div class="w-full md:w-1/2 my-4">
    <blockquote class="font-style = italic font-bold text-2xl">
      "{{ block.quote }}"
      <span>— {{ block.quoteCaption }}</span>
    </blockquote>
  </div>
</template>

<style scoped></style>
