<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useArticleStore } from '@/store/store';

const articleStore = useArticleStore();

onMounted(async () => {
  await articleStore.fetchArticles();
});

const fiveMostRecentArticles = computed(() => {
  return articleStore.articles
    .slice()
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, 5);
});
</script>

<template>
  <el-carousel
    indicator-position="outside"
    height="400px"
    class="mt-8"
    style="width: 600px"
  >
    <el-carousel-item
      v-for="article in fiveMostRecentArticles"
      :key="article.slug.current"
      :article="article"
    >
      <!-- Image container with relative positioning for overlay -->
      <div class="relative w-full h-full">
        <img
          v-if="article.articleImage"
          :src="article.articleImage"
          alt="Article Cover"
          class="w-full h-full object-center"
        />
        <!-- Overlay positioned at the bottom of the image -->
        <div
          class="overlay absolute bottom-0 left-0 w-full h-1/6 flex items-center justify-center bg-black bg-opacity-50"
        >
          <p class="text-white text-center text-lg font-semibold px-3 md:px-0">
            {{ article.title }}
          </p>
        </div>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<style scoped>
.el-carousel__item h3 {
  display: flex;
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.overlay {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
