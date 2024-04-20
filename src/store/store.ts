import { defineStore } from 'pinia';
import Cookies from 'js-cookie';
import { sanityClient } from '@/client';
import imageUrlBuilder from '@sanity/image-url';
import { Article } from '@/types/types';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const useDarkModeStore = defineStore('darkMode', {
  state: () => ({
    darkMode: Cookies.get('darkMode') === 'true', // Initialize state based on cookie value
    initialized: false, // Track whether the store has been initialized
  }),
  actions: {
    initializeDarkMode() {
      // Set the darkMode state based on the value retrieved from cookies
      this.darkMode = Cookies.get('darkMode') === 'true';
      this.initialized = true; // Mark the store as initialized
    },
    toggleDarkMode() {
      // Toggle the darkMode state
      this.darkMode = !this.darkMode;
      // Update the cookie with the new value
      Cookies.set('darkMode', this.darkMode ? 'true' : 'false', {
        expires: 365,
      });
    },
  },
});

export const useArticleStore = defineStore('article', {
  state: () => ({
    articles: [] as Article[],
  }),
  actions: {
    async fetchArticles() {
      const query = `*[_type == "article"] | order(publishedAt desc){
        ...,
        "authorName": author->name,
        "pdfUrl": pdfFile.asset->url
      }`;
      this.articles = await sanityClient.fetch(query).then((articles) =>
        articles.map((article: { articleImage: SanityImageSource }) => ({
          ...article,
          loading: false, // Initialize as false, set true when loading details
          articleImage: article.articleImage
            ? imageUrlBuilder(sanityClient).image(article.articleImage).url()
            : null,
        }))
      );
    },
    async fetchArticleBySlug(slug: string): Promise<Article | null> {
      let article = this.articles.find((a) => a.slug.current === slug);
      if (article) {
        return article;
      } else {
        const query = `*[_type == "article" && slug.current == $slug][0]{
          ...,
          "authorName": author->name,
          "pdfUrl": pdfFile.asset->url
        }`;
        const params = { slug };
        const fetchedArticle: Article | undefined = await sanityClient.fetch(
          query,
          params
        );
        if (fetchedArticle) {
          this.articles.push(fetchedArticle);
          return fetchedArticle;
        } else {
          return null; // Explicitly return null if no article is fetched
        }
      }
    },
  },
});
