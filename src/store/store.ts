import { defineStore } from 'pinia';
import Cookies from 'js-cookie';
import { sanityClient } from '@/client';
import { Article } from '@/types/types';

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
    async fetchArticleBySlug(slug: string): Promise<Article | null> {
      const existingArticle = this.articles.find(
        (a) => a.slug.current === slug
      );
      if (existingArticle) {
        return existingArticle;
      } else {
        const query = `*[_type == "article" && slug.current == $slug][0]{
          ...,
          "pdfUrl": pdfFile.asset->url
        }`;
        const params = { slug };
        const fetchedArticle: Article | null = await sanityClient.fetch(
          query,
          params
        );
        if (fetchedArticle) {
          this.articles.push(fetchedArticle);
        }
        return fetchedArticle;
      }
    },
  },
});
