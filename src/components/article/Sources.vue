<script setup lang="ts">
import { PropType } from 'vue';
import { PortableText } from '@portabletext/vue';
import { serializers } from '@/types/serializers';

defineProps({
  sourceBlocks: {
    type: Array as PropType<any[]>, // Update to reflect the structure if known, else use 'any'
    default: () => [],
  },
});
</script>

<template>
  <div v-if="sourceBlocks.length">
    <h2 class="text-xl xl:text-3xl font-bold mb-4">Sources</h2>
    <PortableText :value="sourceBlocks" :components="serializers" />
  </div>
</template>

<style scoped>
.block-element {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>
