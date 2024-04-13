<script setup lang="ts">
import type { Quote } from '@/types/types'; // Adjust the path to where your types are defined

const { block } = defineProps<{
  block: Quote;
}>();
</script>

<template>
  <div class="w-full md:w-1/2 my-4">
    <blockquote class="font-style = italic font-bold text-2xl">
      "{{ block.quote }}"
    </blockquote>
    <figcaption
      class="text-sm text-center text-gray-400 font-style: italic mt-2"
    >
      {{ block.quoteCaption }}
    </figcaption>
  </div>
</template>

<style scoped>
/* Additional styling can go here */
</style>
