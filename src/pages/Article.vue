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
import { useArticlesStore } from '../store/store.ts';
import { Article } from '@/types';

const route = useRoute();
const articlesStore = useArticlesStore();
const article = ref(null);

onMounted(async () => {
  article.value = await articlesStore.fetchArticleBySlug(route.params.slug);
});
</script>
