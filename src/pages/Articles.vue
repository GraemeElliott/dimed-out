<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { sanityClient } from '@/client.ts';
import imageUrlBuilder from '@sanity/image-url';
import { Article, FetchedArticle } from '@/types/types';

// Create an instance of the urlBuilder
const builder = imageUrlBuilder(sanityClient);

// Helper function to generate image URLs
function urlFor(source: { _ref: string }) {
  // Adjust the type based on actual data structure
  return builder.image(source);
}

const articles = ref<Article[]>([]);

const fetchArticles = () => {
  const query = '*[_type == "article"]{ _id, title, content, coverImage }';
  sanityClient
    .fetch(query)
    .then((data: FetchedArticle[]) => {
      // Explicitly type the data array as FetchedArticle[]
      articles.value = data.map((article: FetchedArticle) => {
        // Now TypeScript knows the structure of each article, including the dynamic imageUrl
        article.imageUrl = article.coverImage
          ? urlFor(article.coverImage).url()
          : '';
        return article;
      });
    })
    .catch((error) => {
      console.error('Error fetching articles:', error);
    });
};

onMounted(fetchArticles);
</script>

<template>
  <div>
    <h1>Articles</h1>
    <ul>
      <li v-for="article in articles" :key="article._id">
        <!-- Display the image using the imageUrl property -->
        <img
          v-if="article.imageUrl"
          :src="article.imageUrl"
          alt="Article Cover"
          class="w-52"
        />
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* Your styles here */
</style>
