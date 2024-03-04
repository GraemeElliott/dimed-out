<script setup lang="ts">
import { useDarkModeStore } from '@/store/store.ts';
import { ref } from 'vue';
import { Sunny, Moon } from '@element-plus/icons-vue';

const darkModeStore = useDarkModeStore();
const darkMode = ref(darkModeStore.darkMode);

const toggleDarkMode = () => {
  darkModeStore.toggleDarkMode();
};
</script>

<template>
  <el-switch
    v-model="darkMode"
    style="--el-switch-on-color: #2c2c2c; --el-switch-off-color: #f2f2f2"
    size="large"
    @change="toggleDarkMode"
  >
    <template #active-action>
      <span class="custom-active-action">
        <el-icon class="vertical-align: middle" style="color: black">
          <Moon />
        </el-icon>
      </span>
    </template>
    <template #inactive-action>
      <span class="custom-inactive-action">
        <el-icon class="vertical-align: middle" style="color: black">
          <Sunny />
        </el-icon>
      </span>
    </template>
  </el-switch>
</template>

<style scoped></style>
