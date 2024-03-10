<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { useDarkModeStore } from '@/store/store';
import NavBar from './components/partials/NavBar.vue';
import Footer from './components/partials/Footer.vue';

const darkModeStore = useDarkModeStore();

onMounted(() => {
  const handleResize = () => {
    darkModeStore.initializeDarkMode(); // Re-initialize to force reactivity update
  };
  window.addEventListener('resize', handleResize);

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
  });
});
</script>

<template>
  <div
    :class="{
      'bg-white text-black': !darkModeStore.darkMode,
      'bg-gray-900 text-white': darkModeStore.darkMode,
    }"
    class="min-h-screen"
  >
    <NavBar />
    <router-view />
    <Footer />
  </div>
</template>

<style scoped></style>
