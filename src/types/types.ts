import { ref } from 'vue';

// Define and export the interface for your article
export interface Article {
  _id: string;
  title: string;
  content?: string; // Use '?' for optional properties
  imageUrl?: string;
}

// If you need to use the articles ref in the same file, you can keep this
// But if it's only for example purposes and used elsewhere, it should be in those specific component files
export const articles = ref<Article[]>([]);

export interface FetchedArticle extends Article {
  coverImage?: {
    _ref: string; // Adjust based on your actual data structure
  };
  imageUrl?: string; // This property is added dynamically
}
