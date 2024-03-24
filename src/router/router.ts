import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/Home.vue';
import About from '@/pages/About.vue';
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
      path: '/about',
      name: 'about',
      component: About,
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
      path: '/articles/:slug', // Dynamic segment
      name: 'articleDetail',
      component: Article,
      props: true, // Pass route.params to the component
    },
  ],
});

export default router;
