<template>
  <div v-if="article">
    <h1>{{ article.title }}</h1>
    <!-- Display the article content -->
  </div>
  <div v-else>
    <p>Article not found.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useArticlesStore } from '../store/store';
import { Article } from '@/types/types';

const route = useRoute();
const articlesStore = useArticlesStore();
// Correctly apply the Article type to the ref, indicating it can be null or an Article.
const article = ref<Article | null>(null);

onMounted(async () => {
  article.value = await articlesStore.fetchArticleBySlug(route.params.slug);
});
</script>
