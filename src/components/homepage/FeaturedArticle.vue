<script setup>
import { computed } from 'vue';
import { useArticleStore, useDarkModeStore } from '@/store/store';

const articleStore = useArticleStore();
const darkModeStore = useDarkModeStore();

const featuredArticle = computed(() => {
  return articleStore.articles.find((article) => article.featured === true);
});
</script>

<template>
  <div
    v-if="featuredArticle"
    class="flex flex-col md:flex-row items-center justify-between"
  >
    <!-- Image Container -->
    <div class="md:w-3/5 w-full relative">
      <router-link
        :to="{
          name: 'articleDetail',
          params: { slug: featuredArticle.slug.current },
        }"
      >
        <img
          :src="featuredArticle.articleImage"
          alt="Featured Article Cover"
          class="w-full h-auto object-cover"
        />
        <!-- Featured Tag -->
        <div
          class="absolute top-0 left-0 bg-red-700 text-white text-xs uppercase px-2 py-1"
        >
          Featured
        </div>
      </router-link>
    </div>
    <!-- Text Container -->
    <div class="md:w-2/5 w-full px-4 mt-4 md:mt-0">
      <router-link
        :to="{
          name: 'articleDetail',
          params: { slug: featuredArticle.slug.current },
        }"
      >
        <h1 class="text-4xl font-semibold mb-5 hover:text-link-teal">
          {{ featuredArticle.title }}
        </h1>
      </router-link>
      <h2 class="text-l font-light italic mb-7">
        {{ featuredArticle.summaryText }}
      </h2>
      <router-link
        :to="{
          name: 'articleDetail',
          params: { slug: featuredArticle.slug.current },
        }"
        :class="[
          'text-center py-2 px-4 border-2 rounded-sm transition-colors duration-300 text-xs font-bold',
          darkModeStore.darkMode
            ? 'text-white border-white'
            : 'text-black border-black',
          {
            'hover:bg-black hover:text-white hover:border-transparent':
              !darkModeStore.darkMode,
          },
          {
            'hover:bg-white hover:text-black hover:border-transparent':
              darkModeStore.darkMode,
          },
        ]"
      >
        READ ARTICLE
      </router-link>
    </div>
  </div>
  <div v-else>No featured article found.</div>
</template>

<style scoped></style>
