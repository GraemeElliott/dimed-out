<script setup lang="ts">
import url from '@/assets/main_images/do_logo_desktop.png';
import ThemeSwitch from './ThemeSwitch.vue';

const fit = 'fill';
</script>

<template>
  <div class="logo">
    <el-image :src="url" lazy :fit="fit" />
  </div>
  <div>
    <ThemeSwitch />
  </div>
</template>

<style scoped>
.logo {
  width: 100px;
}
</style>
