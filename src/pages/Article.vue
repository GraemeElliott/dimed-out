<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useArticleStore } from '../store/store';
import { Article } from '@/types/types';
import TextBlock from '@/components/article/TextBlock.vue';
import ImageBlock from '@/components/article/Image.vue';
import Quote from '@/components/article/Quote.vue';
import YouTubeContainer from '@/components/article/YouTubeContainer.vue';
import NoteFromTheAuthor from '@/components/article/NoteFromTheAuthor.vue';
import ArticleHeading from '@/components/article/ArticleHeading.vue';
import Sources from '@/components/article/Sources.vue';
import { sanityClient } from '../client';
import imageUrlBuilder from '@sanity/image-url';
import Spinner from '@/components/partials/Spinner.vue';
import ImageCredit from '@/components/article/ImageCredit.vue';
import FullScreenImage from '@/components/article/FullScreenImage.vue';
import Container from '@/components/partials/Container.vue';

const route = useRoute();
const articlesStore = useArticleStore();
const article = ref<Article | null>(null);
const builder = imageUrlBuilder(sanityClient);
const coverImageUrl = computed(() => {
  if (article.value && article.value.coverImage) {
    return builder.image(article.value.coverImage).url();
  }
  return '';
});
const isLoading = ref(true);

onMounted(async () => {
  try {
    article.value = await articlesStore.fetchArticleBySlug(
      route.params.slug as string
    );
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div v-if="isLoading">
    <Spinner :isLoading="isLoading" />
  </div>
  <div v-else-if="article" class="article-container">
    <div class="mb-8">
      <FullScreenImage
        :imageUrl="coverImageUrl"
        :alt="'Article Cover'"
        :imageClass="article.coverImageStyle"
      />
      <ImageCredit :credit="article.coverImageCredit" class="mr-2" />
    </div>
    <Container>
      <div class="mb-8">
        <h1
          :class="article.titleCssClass"
          class="text-3xl font-extrabold text-center mb-8 xl:text-6xl"
        >
          {{ article.title }}
        </h1>
        <p
          class="text-center text-gray-400 font-style: italic leading-7 mx-1 xl:mx-40 text-lg"
        >
          {{ article.summaryText }}
        </p>
      </div>
      <div v-for="contentItem in article.content" :key="contentItem._key">
        <!-- Check for and iterate over text blocks -->
        <div
          v-if="'text' in contentItem"
          :class="contentItem.cssClass"
          class="text-block-component"
        >
          <TextBlock :block="contentItem" />
        </div>
        <div
          v-else-if="contentItem._type === 'heading'"
          :class="contentItem.cssClass"
        >
          <ArticleHeading :block="contentItem" />
        </div>
        <div
          v-else-if="contentItem._type === 'image'"
          :class="contentItem.cssClass"
          class="flex justify-center mb-8"
        >
          <ImageBlock :block="contentItem" />
        </div>
        <!-- Render QuoteBlock for quote blocks -->
        <div
          v-else-if="contentItem._type === 'quote'"
          :class="contentItem.cssClass"
          class="flex justify-center"
        >
          <Quote :block="contentItem" />
        </div>
        <div
          v-else-if="contentItem._type === 'youtubeID'"
          :class="contentItem.cssClass"
          class="mb-8"
        >
          <YouTubeContainer :block="contentItem" />
        </div>
      </div>
      <div v-if="article.noteFromTheAuthor">
        <NoteFromTheAuthor
          :noteBlock="article.noteFromTheAuthor"
          class="text-block-component"
        />
      </div>
      <div v-if="article.sources" class="text-block-component">
        <Sources :sourceBlocks="article.sources" />
      </div>
      <div v-if="article.pdfUrl">
        <a :href="article.pdfUrl" target="_blank" download="Download PDF"
          >Download PDF</a
        >
      </div>
    </Container>
  </div>
  <div v-else>
    <p>Article not found.</p>
  </div>
</template>

<style scoped>
.text-block-component >>> p {
  margin-bottom: 1.25rem; /* Equivalent to mb-5 */
}
</style>
