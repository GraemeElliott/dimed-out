<script setup lang="ts">
import { ref, computed, onMounted, watchEffect, Ref } from 'vue';
import { useArticleStore } from '@/store/store';
import ArticleCard from '@/components/articles/ArticleCard.vue';
import Container from '@/components/partials/Container.vue';
import Spinner from '@/components/partials/Spinner.vue';

const articleStore = useArticleStore();
const isLoading = ref(true);
const isLoadingScroll = ref(false);
const numLoaded = ref(8);

const displayedArticles = computed(() =>
  articleStore.articles.slice(0, numLoaded.value)
);

const observer: Ref<IntersectionObserver | null> = ref(null);
const scrollRef = ref<HTMLElement | null>(null);

onMounted(async () => {
  await articleStore.fetchArticles();
  isLoadingScroll.value = false;
  isLoading.value = false;

  observer.value = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !isLoadingScroll.value) {
        loadMore();
      }
    },
    {
      root: null,
      threshold: 0.5,
    }
  );

  watchEffect(() => {
    if (scrollRef.value) {
      observer.value?.observe(scrollRef.value);
    }
  });
});

const loadMore = () => {
  if (articleStore.articles.length > numLoaded.value) {
    isLoadingScroll.value = true;
    setTimeout(() => {
      numLoaded.value += 6;
      isLoadingScroll.value = false;
    }, 2000);
  } else {
    if (scrollRef.value) observer.value?.unobserve(scrollRef.value);
  }
};
</script>

<template>
  <Container class="md:mt-8">
    <div>
      <div v-if="isLoading">
        <Spinner
          :isLoading="isLoading"
          class="flex translate-y-36 lg:translate-y-80"
        />
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-1">
        <ArticleCard
          v-for="article in displayedArticles"
          :key="article.slug.current"
          :article="article"
        />
        <div
          ref="scrollRef"
          class="loading-trigger"
          v-show="!isLoadingScroll"
        ></div>
      </div>
    </div>
    <div v-if="isLoadingScroll" class="text-center font-bold mt-2">
      <div class="dots">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    </div>
  </Container>
</template>

<style scoped>
.dots {
  display: flex;
  align-items: center;
  justify-content: center;
}

.dot {
  background-color: #333;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin: 0 4px;
  animation: dotFlashing 1s infinite linear alternate;
  animation-delay: 0.5s;
}

.dot:nth-child(2) {
  animation-delay: 0.6s;
}
.dot:nth-child(3) {
  animation-delay: 0.7s;
}

@keyframes dotFlashing {
  0% {
    background-color: #333;
  }
  50%,
  100% {
    background-color: #ccc;
  }
}
</style>
