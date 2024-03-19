<script setup lang="ts">
import { toRef } from 'vue';
import url from '@/assets/main_images/do_logo_mobile.png';
import { useDarkModeStore } from '@/store/store';

const darkModeStore = useDarkModeStore();
const darkMode = toRef(darkModeStore, 'darkMode');
</script>

<template>
  <div class="flex flex-row relative bottom-0 h-20 items-center ml-4 mt-auto">
    <div class="logo">
      <el-image
        :src="url"
        class="object-fit w-36 h-auto"
        :class="{ inverted: darkMode }"
        lazy
      />
    </div>
  </div>
</template>

<style scoped>
.inverted {
  filter: invert(1);
}
</style>
