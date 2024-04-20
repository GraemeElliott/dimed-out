import { ref } from 'vue';

interface BaseBlock {
  _key: string; // Unique key for each block
  _type: string; // Type discriminator
}

// Explicitly define _type for TextBlockWrapper to improve clarity in component logic
interface TextBlockWrapper {
  _key: string;
  _type: 'textBlockWrapper'; // Ensure this matches with how data is structured
  text: TextBlock[]; // Array of TextBlock elements
  cssClass?: string; // Optional CSS class for styling
}

export interface MarkedText {
  _key: string;
  _type: 'span'; // Span type for inline elements
  text: string; // Text content
  marks?: string[]; // Text decorations like bold, italic
  cssClass?: string; // Optional CSS class
}

export interface ArticleHeadingBlock {
  _key: string;
  _type: 'heading';
  heading: string; // Text of the heading
  cssClass?: string; // Optional CSS class for styling
}

// Define TextBlock to include nested structure for text content
export interface TextBlock extends BaseBlock {
  _type: 'text';
  style?: string; // Style of the text block, e.g., paragraph, quote
  marks?: string[]; // Formatting marks
  listType?: string; // Type of list if this is a list item
  children: MarkedText[]; // Child elements, typically spans or similar
  cssClass?: string; // Optional CSS class
  text: {
    _key: string;
    markDefs: any[]; // Definitions for any inline marks
    children: MarkedText[]; // Child text elements
    _type: 'block';
    style?: string; // Style applied to this block
  }[];
}

export interface Image extends BaseBlock {
  _type: 'image';
  asset: {
    _ref: string; // Reference to the image asset
  };
  cssClass?: string;
  alt?: string; // Alt text for accessibility
  caption?: string; // Caption for the image
  url: string; // URL to the image
}

export interface Quote extends BaseBlock {
  _type: 'quote';
  quote: string; // Quote text
  cssClass?: string;
  quoteCaption: string; // Caption or attribution for the quote
}

export interface YouTubeVideoID extends BaseBlock {
  _type: 'youtubeID';
  videoID: string; // YouTube video identifier
  id: string; // Additional identifier, if needed
}

export type ArticleContentItem =
  | TextBlockWrapper
  | Image
  | Quote
  | YouTubeVideoID
  | ArticleHeadingBlock;

export interface Article {
  _id: string;
  slug: { current: string };
  authorName: string;
  title: string;
  content: ArticleContentItem[];
  summaryText?: string;
  noteFromTheAuthor?: TextBlock[];
  sources?: TextBlock[];
  titleCssClass?: string;
  summaryTextCssClass?: string;
  coverImageStyle?: string;
  articleImage?: string | null;
  coverImage?: string;
  coverImageCredit?: string;
  pdfUrl?: string;
  publishedAt: string;
  updatedAt: string;
  featured: boolean;
}

export const articles = ref<Article[]>([]);
