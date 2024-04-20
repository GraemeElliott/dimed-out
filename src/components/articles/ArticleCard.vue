<script setup>
const props = defineProps({
  article: Object,
});
</script>

<template>
  <router-link
    :to="{
      name: 'articleDetail',
      params: { slug: article.slug.current },
    }"
    v-if="!article.loading"
  >
    <div
      class="p-4 article-card flex flex-col justify-between overflow-hidden relative"
    >
      <div class="relative flex-grow">
        <!-- Image Container -->
        <div class="relative overflow-hidden rounded mt-2">
          <img
            v-if="article.articleImage && !article.loading"
            :src="article.articleImage"
            alt="Article Cover"
            class="w-full object-cover transition-opacity duration-300 ease-in-out hover:opacity-50"
          />
          <!-- Overlay shown only on md screens and up -->
          <div
            class="overlay absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 text-white font-bold text-xl transition-all duration-300 ease-in-out hover:bg-opacity-75 hidden sm:flex"
            v-show="article.articleImage && !article.loading"
          >
            <p
              class="opacity-0 transition-opacity duration-300 ease-in-out text-center px-4"
            >
              {{ article.title }}
            </p>
          </div>
        </div>
      </div>
      <!-- Title displayed below the image on small screens -->
      <div class="mt-3 h-15 sm:hidden">
        <p class="font-bold text-xl ml-4">
          {{ article.title }}
        </p>
        <p class="text-sm ml-4 mt-1 line-clamp-2">
          {{ article.summaryText }}
        </p>
        <hr
          class="mt-4 solid h-0.5 bg-gray-200 border-0 rounded dark:bg-gray-400"
        />
      </div>
    </div>
  </router-link>
</template>

<style scoped>
.overlay:hover {
  background-color: rgba(0, 0, 0, 0.9);
}

.overlay:hover p {
  opacity: 1;
}

.text-center {
  text-align: center;
  overflow: hidden;
}
</style>
