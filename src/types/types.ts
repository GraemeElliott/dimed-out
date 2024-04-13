import { ref } from 'vue';

interface BaseBlock {
  _key: string;
  _type: string;
}

interface TextBlockWrapper {
  _key: string;
  text: TextBlock[];
  cssClass?: string;
}

export interface MarkedText {
  _key: string;
  _type: 'span';
  text: string;
  marks?: string[];
  cssClass?: string;
}

export interface ArticleHeadingBlock {
  _key: string;
  _type: 'heading';
  heading: string;
  cssClass?: string;
}

export interface TextBlock extends BaseBlock {
  _type: 'block';
  style?: string;
  marks?: string[];
  listType?: string;
  children: MarkedText[];
  cssClass?: string;
  text: {
    _key: string;
    markDefs: any[];
    children: MarkedText[];
    _type: 'block';
    style?: string;
  }[];
}

export interface Image extends BaseBlock {
  _type: 'image';
  asset: {
    _ref: string;
  };
  cssClass?: string;
  alt?: string;
  caption?: string;
  url: string;
}

export interface Quote extends BaseBlock {
  _type: 'quote';
  quote: string;
  cssClass?: string;
  quoteCaption: string;
}

export interface YouTubeVideoID extends BaseBlock {
  _type: 'youtubeID';
  videoID: string;
  cssClass?: string;
  id: string;
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
  title: string;
  content: ArticleContentItem[];
  summaryText?: string;
  noteFromTheAuthor?: TextBlock[];
  sources?: TextBlock[];
  titleCssClass?: string;
  summaryTextCssClass?: string;
  coverImageStyle?: string;
  coverImage?: string;
  coverImageCredit?: string;
  pdfUrl?: string;
}

export const articles = ref<Article[]>([]);
