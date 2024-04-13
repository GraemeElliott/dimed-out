<script setup lang="ts">
import { computed } from 'vue';
import type { YouTubeVideoID } from '@/types/types';

const props = defineProps<{
  block: YouTubeVideoID;
}>();

const videoUrl = computed(() => {
  return `https://www.youtube.com/embed/${props.block.videoID}`;
});
</script>

<template>
  <div class="relative" style="padding-top: 56.25%">
    <iframe
      class="absolute top-0 left-0 w-full h-full"
      :src="videoUrl"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</template>

<style scoped></style>
