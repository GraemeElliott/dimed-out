<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { sanityClient } from '@/client.ts';

const articles = ref([]);

const fetchArticles = () => {
  const query = '*[_type == "article"]{ _id, title, content }';
  sanityClient
    .fetch(query)
    .then((data) => {
      articles.value = data;
    })
    .catch((error) => {
      console.error('Error fetching articles:', error);
    });
};

onMounted(() => {
  fetchArticles();
});
</script>

<template>
  <div>
    <h1>Articles</h1>
    <ul>
      <li v-for="article in articles" :key="article._id">
        {{ article.title }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* Your styles here */
</style>
