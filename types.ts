import { ref } from 'vue';
// Define an interface for your article
interface Article {
  _id: string;
  title: string;
  content?: string; // Use '?' for optional properties
  imageUrl?: string;
}

// Then, in your component, specify the type of your data array
const articles = ref<Article[]>([]);
