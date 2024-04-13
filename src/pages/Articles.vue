<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { sanityClient } from '@/client.ts';
import imageUrlBuilder from '@sanity/image-url';
import { Article } from '@/types/types';

// Create an instance of the urlBuilder
const builder = imageUrlBuilder(sanityClient);

const articles = ref<Article[]>([]);

const fetchArticles = () => {
  const query =
    '*[_type == "article"]{ _id, title, "articleImage": articleImage, slug }';
  sanityClient
    .fetch(query)
    .then((data: Article[]) => {
      articles.value = data.map((article: Article) => {
        const articleImageUrl =
          article.articleImage && typeof article.articleImage === 'object'
            ? builder.image(article.articleImage).url()
            : article.articleImage;
        console.log(articleImageUrl);

        // Type assertion here to align with Article interface
        return {
          ...article,
          articleImage: articleImageUrl,
        } as Article;
      });
    })
    .catch((error) => console.error('Error fetching articles:', error));
};

onMounted(fetchArticles);
</script>

<template>
  <div>
    <h1>Articles</h1>
    <ul>
      <li v-for="article in articles" :key="article._id">
        <!-- Corrected the route name to 'articleDetail' -->
        <router-link
          :to="{
            name: 'articleDetail',
            params: { slug: article.slug.current },
          }"
        >
          {{ article.title }}
          <!-- It's a good practice to show article title instead of slug -->
        </router-link>
        <img
          v-if="article.articleImage"
          :src="article.articleImage"
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
