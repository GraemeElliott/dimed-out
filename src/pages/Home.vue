<!-- <script setup lang="ts">
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
<style scoped></style> -->

<script setup>
import { ref, onMounted } from 'vue';
import { sanityClient } from '@/client.ts';
import imageUrlBuilder from '@sanity/image-url';

// Create an instance of the urlBuilder
const builder = imageUrlBuilder(sanityClient);

// Helper function to generate image URLs
function urlFor(source) {
  return builder.image(source);
}

const articles = ref([]);

const fetchArticles = () => {
  const query = '*[_type == "article"]{ _id, title, content, coverImage }';
  sanityClient
    .fetch(query)
    .then((data) => {
      articles.value = data.map((article) => {
        // Assuming coverImage is the image field in your articles
        // This adds a new property 'imageUrl' to each article object
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

onMounted(() => {
  fetchArticles();
});
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
