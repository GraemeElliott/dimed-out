<script setup lang="ts">
import { toRef, ref } from 'vue';
import { useDarkModeStore } from '@/store/store';
import { Menu, Close } from '@element-plus/icons-vue';
import ThemeSwitch from './ThemeSwitch.vue';

const darkModeStore = useDarkModeStore();
const darkMode = toRef(darkModeStore, 'darkMode');

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
  <nav class="pt-2 pb-2">
    <!-- Mobile Navbar -->
    <div>
      <div class="flex items-center justify-between px-4 py-3 md:hidden">
        <div class="relative">
          <img
            class="object-contain w-36"
            :class="{ inverted: darkMode }"
            lazy
            src="../../assets/main_images/do_logo_mobile.png"
          />
          <!-- <el-image
          :src="imageUrl"
          class="object-fit w-36 pt-2"
          :class="{ inverted: darkMode }"
          lazy
        /> -->
        </div>
        <!-- Menu icon -->
        <el-button
          v-if="!isMenuOpen"
          @click="toggleMenu"
          link
          class="text-white"
        >
          <el-icon
            :style="{ fontSize: '1.5rem', color: darkMode ? 'white' : 'black' }"
          >
            <Menu />
          </el-icon>
        </el-button>
        <!-- Close icon -->
        <el-button
          v-if="isMenuOpen"
          @click="toggleMenu"
          link
          class="text-white"
        >
          <el-icon
            :style="{ fontSize: '1.5rem', color: darkMode ? 'white' : 'black' }"
          >
            <Close />
          </el-icon>
        </el-button>
      </div>
    </div>
    <!-- Mobile Menu (Dropdown) -->
    <div
      :class="{
        block: isMenuOpen,
        hidden: !isMenuOpen,
        'bg-white text-black': !darkMode,
        'bg-gray-900 text-white': darkMode,
      }"
      class="md:hidden flex flex-col items-center absolute w-full z-50"
      style="top: 4rem; left: 0"
    >
      <router-link to="/" class="block px-3 py-2 uppercase bebas-neue-regular"
        >Home</router-link
      >
      <router-link
        to="/articles"
        class="block px-3 py-2 uppercase bebas-neue-regular"
        >Articles</router-link
      >
      <router-link
        to="/about"
        class="block px-3 py-2 uppercase bebas-neue-regular"
        >About</router-link
      >
      <router-link
        to="/contact"
        class="block px-3 py-2 uppercase bebas-neue-regular"
        >Contact</router-link
      >
      <!-- Theme switch -->
      <div class="flex items-center space-x-2">
        <ThemeSwitch class="mt-2 pb-2" />
      </div>
    </div>
    <!-- Desktop and Tablet Navbar -->
    <div class="hidden md:flex md:items-center md:justify-between px-4 py-3 pt">
      <!-- Logo -->
      <img
        class="object-contain w-48"
        :class="{ inverted: darkMode }"
        lazy
        src="../../assets/main_images/do_logo_tablet.png"
      />
      <div class="flex items-center space-x-10">
        <router-link to="/" class="uppercase bebas-neue-regular"
          >Home</router-link
        >
        <router-link to="/articles" class="uppercase bebas-neue-regular"
          >Articles</router-link
        >
        <router-link to="/about" class="uppercase bebas-neue-regular"
          >About</router-link
        >
        <router-link to="/contact" class="uppercase bebas-neue-regular"
          >Contact</router-link
        >
      </div>
      <!-- Navigation links -->
      <div class="flex items-center space-x-4">
        <ThemeSwitch />
      </div>
    </div>
  </nav>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
.inverted {
  filter: invert(1);
}
.bebas-neue-regular {
  font-family: 'Bebas Neue', sans-serif;
  font-weight: 500;
  font-style: normal;
  font-size: 2rem;
}
</style>
