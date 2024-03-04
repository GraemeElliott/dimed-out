<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useDarkModeStore } from '@/store/store';
import NavBar from './components/partials/NavBar.vue';
import Footer from './components/partials/Footer.vue';

const darkModeStore = useDarkModeStore();

const darkMode = ref(false);

onMounted(() => {
  darkModeStore.initializeDarkMode();
});

watch(darkModeStore, () => {
  darkMode.value = darkModeStore.darkMode;
});
</script>

<template>
  <div
    :class="{
      'bg-white text-black': !darkMode,
      'bg-gray-900 text-white': darkMode,
    }"
    class="min-h-screen"
  >
    <NavBar />
    <router-view />
    <Footer
      :class="{
        'bg-white text-black': !darkMode,
        'bg-gray-900 text-white': darkMode,
      }"
    />
  </div>
</template>

<style scoped></style>
