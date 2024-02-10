import { defineStore } from 'pinia';
import Cookies from 'js-cookie';

export const useDarkModeStore = defineStore('darkMode', {
  state: () => ({
    darkMode: Cookies.get('darkMode') === 'false',
  }),
  actions: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
      document.cookie = `theme=${this.darkMode ? 'dark' : 'light'}`;
    },
  },
});
