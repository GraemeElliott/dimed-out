<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useArticleStore } from '@/store/store';
import ArticleCard from '@/components/articles/ArticleCard.vue';
import Container from '@/components/partials/Container.vue';
import Spinner from '@/components/partials/Spinner.vue';

const articleStore = useArticleStore();
const isLoading = ref(true);

onMounted(async () => {
  await articleStore.fetchArticles();
  isLoading.value = false;
});
</script>

<template>
  <Container>
    <div v-if="isLoading">
      <Spinner
        :isLoading="isLoading"
        class="flex translate-y-36 lg:translate-y-80"
      />
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-2">
      <ArticleCard
        v-for="article in articleStore.articles"
        :key="article.slug.current"
        :article="article"
      />
    </div>
  </Container>
</template>

<style scoped></style>
