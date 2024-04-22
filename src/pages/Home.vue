<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useArticleStore } from '@/store/store';
import Container from '@/components/partials/Container.vue';
import Spinner from '@/components/partials/Spinner.vue';
import FeaturedArticle from '@/components/homepage/FeaturedArticle.vue';

const articleStore = useArticleStore();
const isLoading = ref(true);

onMounted(async () => {
  await articleStore.fetchArticles();
  isLoading.value = false;
});
</script>

<template>
  <div v-if="isLoading">
    <Spinner
      :isLoading="isLoading"
      class="flex translate-y-36 lg:translate-y-80"
    />
  </div>
  <Container v-else-if="articleStore.articles" class="">
    <FeaturedArticle class="mt-10 mb-16" />
  </Container>
</template>

<style scoped></style>
