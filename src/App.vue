<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useDarkModeStore } from '@/store/store';
import NavBar from './components/partials/NavBar.vue';

const darkModeStore = useDarkModeStore();

const darkMode = ref(false);

onMounted(() => {
  const themeCookie = document.cookie.replace(
    /(?:(?:^|.*;\s*)theme\s*=\s*([^;]*).*$)|^.*$/,
    '$1'
  );

  if (themeCookie === 'dark') {
    darkModeStore.toggleDarkMode();
  }
});

watch(darkModeStore, () => {
  darkMode.value = darkModeStore.darkMode;
});
</script>

<template>
  <div :class="{ 'light-theme': !darkMode, 'dark-theme': darkMode }">
    <NavBar />
    <router-view />
  </div>
</template>

<style scoped></style>
