<script setup lang="ts">
import { computed } from 'vue';
import { sanityClient } from '../../client';
import imageUrlBuilder from '@sanity/image-url';
import ImageCredit from './ImageCredit.vue';

const builder = imageUrlBuilder(sanityClient);

const props = defineProps({
  block: Object,
});

const imageUrl = computed(() => {
  if (!props.block || !props.block.asset) {
    return '';
  }
  return builder.image(props.block.asset).url();
});
</script>

<template>
  <figure v-if="block && block.asset">
    <img :src="imageUrl" :alt="block.alt" />
    <ImageCredit :credit="block.credit" />
    <figcaption
      class="text-sm text-center text-gray-400 font-style: italic mt-2"
    >
      {{ block.caption }}
    </figcaption>
  </figure>
  <div v-else>Image block is not available</div>
</template>
