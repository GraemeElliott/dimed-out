<script setup lang="ts">
import url from '@/assets/main_images/do_logo_desktop.png';
const fit = 'fill';
</script>

<template>
  <div class="logo">
    <el-image :src="url" lazy :fit="fit" />
  </div>
</template>

<style scoped>
.logo {
  width: 100px;
}
</style>
