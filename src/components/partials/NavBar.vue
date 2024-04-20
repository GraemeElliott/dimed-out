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
  document.body.style.overflow = isMenuOpen.value ? 'hidden' : '';
};

const closeMenu = () => {
  isMenuOpen.value = false; // Always close the menu
  document.body.style.overflow = '';
};
</script>

<template>
  <nav class="pt-2 pb-2">
    <!-- Mobile Navbar -->
    <div>
      <div class="flex items-center justify-between px-4 py-3 md:hidden">
        <div class="relative">
          <router-link to="/" @click="closeMenu" custom v-slot="{ isActive }">
            <img
              class="object-contain w-36"
              :class="{ inverted: darkMode, 'active-link': isActive }"
              lazy
              src="../../assets/main_images/do_logo_mobile.png"
            />
          </router-link>
        </div>
        <!-- Menu icon -->
        <div class="flex">
          <ThemeSwitch class="mt-1 mr-2" />
          <el-button
            v-if="!isMenuOpen"
            @click="toggleMenu"
            link
            class="text-white"
          >
            <el-icon
              :style="{
                fontSize: '1.5rem',
                color: darkMode ? 'white' : 'black',
              }"
              ><Menu
            /></el-icon>
          </el-button>
          <el-button
            v-if="isMenuOpen"
            @click="toggleMenu"
            link
            class="text-white"
          >
            <el-icon
              :style="{
                fontSize: '1.5rem',
                color: darkMode ? 'white' : 'black',
              }"
              ><Close
            /></el-icon>
          </el-button>
        </div>
      </div>
    </div>
    <!-- Mobile Menu (Dropdown) -->
    <div
      :class="{
        block: isMenuOpen,
        hidden: !isMenuOpen,
        'bg-white text-black': !darkMode,
        'bg-gray-900 text-white': darkMode,
        'inset-0 h-screen overflow-hidden': isMenuOpen,
      }"
      class="md:hidden flex flex-col items-center mt-10 z-50 transition-all"
      style="top: 0; left: 0"
    >
      <router-link
        to="/"
        class="block px-3 py-2 uppercase ubuntu-large"
        @click="toggleMenu"
        v-slot="{ isActive }"
      >
        <span :class="{ 'active-link': isActive }">Home</span>
      </router-link>
      <router-link
        to="/articles"
        class="block px-3 py-2 uppercase ubuntu-large"
        @click="toggleMenu"
        v-slot="{ isActive }"
      >
        <span :class="{ 'active-link': isActive }">Articles</span>
      </router-link>
      <router-link
        to="/about"
        class="block px-3 py-2 uppercase ubuntu-large"
        @click="toggleMenu"
        v-slot="{ isActive }"
      >
        <span :class="{ 'active-link': isActive }">About</span>
      </router-link>
      <router-link
        to="/contact"
        class="block px-3 py-2 uppercase ubuntu-large"
        @click="toggleMenu"
        v-slot="{ isActive }"
      >
        <span :class="{ 'active-link': isActive }">Contact</span>
      </router-link>
    </div>
    <!-- Desktop and Tablet Navbar -->
    <div class="hidden md:flex md:items-center md:justify-between px-4 py-3 pt">
      <img
        class="object-contain w-48"
        :class="{ inverted: darkMode }"
        lazy
        src="../../assets/main_images/do_logo_tablet.png"
      />
      <div class="flex items-center space-x-10">
        <router-link
          to="/"
          class="uppercase ubuntu-regular"
          v-slot="{ isActive }"
        >
          <span :class="{ 'active-link': isActive }">Home</span>
        </router-link>
        <router-link
          to="/articles"
          class="uppercase ubuntu-regular"
          v-slot="{ isActive }"
        >
          <span :class="{ 'active-link': isActive }">Articles</span>
        </router-link>
        <router-link
          to="/about"
          class="uppercase ubuntu-regular"
          v-slot="{ isActive }"
        >
          <span :class="{ 'active-link': isActive }">About</span>
        </router-link>
        <router-link
          to="/contact"
          class="uppercase ubuntu-regular"
          v-slot="{ isActive }"
        >
          <span :class="{ 'active-link': isActive }">Contact</span>
        </router-link>
      </div>
      <div class="flex items-center space-x-4">
        <ThemeSwitch />
      </div>
    </div>
  </nav>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap');
.inverted {
  filter: invert(1);
}
.ubuntu-regular {
  font-family: 'Ubuntu', sans-serif;
  font-optical-sizing: auto;
  font-weight: 700;
  font-style: normal;
  font-size: 1.5rem;
}
.ubuntu-large {
  font-family: 'Ubuntu', sans-serif;
  font-optical-sizing: auto;
  font-weight: 700;
  font-style: normal;
  font-size: 2rem;
}
.active-link {
  position: relative;
  color: rgb(5 150 105);
  font-weight: bold;
  text-decoration: none;
}

.active-link::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: -3px;
  left: 0;
  background-color: rgb(5 150 105);
  visibility: hidden;
  transform: scaleX(0);
  transition: all 0.3s ease-in-out 0s;
}

.active-link:hover::after,
.active-link:focus::after {
  visibility: visible;
  transform: scaleX(1);
}
</style>
