<script setup lang="ts">
import { PropType } from 'vue';
import { PortableText } from '@portabletext/vue';
import { serializers } from '@/types/serializers';

defineProps({
  noteBlock: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
});
</script>

<template>
  <div v-if="noteBlock.length">
    <hr
      class="solid h-0.5 my-8 bg-gray-200 border-0 rounded dark:bg-gray-400"
    />
    <h2 class="text-xl xl:text-3xl font-bold mb-4">Note From The Author</h2>
    <PortableText :value="noteBlock" :components="serializers" />
    <hr
      class="solid h-0.5 my-8 bg-gray-200 border-0 rounded dark:bg-gray-400"
    />
  </div>
</template>

<style scoped></style>
