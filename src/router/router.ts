import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/Home.vue';
import Contact from '@/pages/Contact.vue';
import Articles from '@/pages/Articles.vue';
import Article from '@/pages/Article.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact,
    },
    {
      path: '/articles',
      name: 'articles',
      component: Articles,
    },
    {
      path: '/articles/:slug',
      name: 'articleDetail',
      component: Article,
      props: true,
    },
  ],
});

export default router;
