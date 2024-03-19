<script setup lang="ts">
import url from '@/assets/homepage-images/millencolin-pennybridge-pioneers-1200x1200.webp';
import url2 from '@/assets/homepage-images/the-gaslight-anthem-the-59-sound-1000x1000.jpg';
import url3 from '@/assets/homepage-images/thursday-full-collapse-1200x1200.jpeg';
</script>

<template>
  <div class="flex flex-col h-100 items-center">
    <h1>Latest Articles</h1>
    <div class="flex flex-row">
      <div class="flex flex-col">
        <div class="millencolin">
          <el-image :src="url" class="object-fit w-72 h-auto" lazy />
        </div>
        <div class="thegaslightanthem">
          <el-image :src="url2" class="object-fit w-72 h-auto" lazy />
        </div>
        <div class="thursday">
          <el-image :src="url3" class="object-fit w-72 h-auto" lazy />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
