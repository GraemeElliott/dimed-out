<script setup lang="ts">
import { useDarkModeStore } from '@/store/store.ts';
import { ref, watchEffect } from 'vue';
import { Sunny, Moon } from '@element-plus/icons-vue';

const darkModeStore = useDarkModeStore();
const darkMode = ref(darkModeStore.darkMode);

watchEffect(() => {
  darkMode.value = darkModeStore.darkMode;
});

const toggleDarkMode = () => {
  darkModeStore.toggleDarkMode();
};
</script>

<template>
  <button @click="toggleDarkMode" class="toggle-theme-btn">
    <el-icon :size="22">
      <template v-if="darkMode">
        <Moon />
      </template>
      <template v-else>
        <Sunny />
      </template>
    </el-icon>
  </button>
</template>

<style scoped></style>
