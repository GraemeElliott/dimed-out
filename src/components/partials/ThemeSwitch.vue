<script setup lang="ts">
import { useDarkModeStore } from '@/store/store.ts';
import { computed } from 'vue';

const darkModeStore = useDarkModeStore();
const darkMode = computed(() => darkModeStore.darkMode);

const toggleDarkMode = () => {
  darkModeStore.toggleDarkMode();
};
</script>

<template>
  <el-switch v-model="darkMode" size="large" @change="toggleDarkMode" />
</template>

<style scoped></style>
