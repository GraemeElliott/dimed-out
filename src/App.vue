<script setup lang="ts">
import { useDarkModeStore } from '@/store/store';
import NavBar from './components/partials/NavBar.vue';
import Footer from './components/partials/Footer.vue';

const darkModeStore = useDarkModeStore();


</script>

<template>
  <div
    :class="{
      'bg-white text-black': !darkModeStore.darkMode,
      'bg-gray-900 text-white': darkModeStore.darkMode,
    }"
    class="flex flex-col min-h-screen"
  >
    <NavBar />
    <router-view class="flex-grow"/>
    <Footer />
  </div>
</template>

<style scoped></style>
