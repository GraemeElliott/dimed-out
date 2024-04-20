<script setup lang="ts">
import { TextBlock } from '@/types/types';
import { PortableText } from '@portabletext/vue';
import { serializers } from '@/types/serializers';

// Define props explicitly
const props = defineProps<{
  block: TextBlock;
}>();

const { block } = props;
</script>

<template>
  <div :class="block.cssClass || ''">
    <!-- Render PortableText component with custom serializers -->
    <PortableText :value="block.text" :components="serializers" />
  </div>
</template>

<style scoped></style>
