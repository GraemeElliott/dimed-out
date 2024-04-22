<script setup lang="ts">
import { TextBlock } from '@/types/types';
import { PortableText } from '@portabletext/vue';
import { serializers } from '@/types/serializers';

const props = defineProps<{
  block: TextBlock;
}>();

const { block } = props;
</script>

<template>
  <div :class="block.cssClass || ''">
    <PortableText :value="block.text" :components="serializers" />
  </div>
</template>

<style scoped></style>
