import { defineStore } from 'pinia';
import Cookies from 'js-cookie';

export const useDarkModeStore = defineStore('darkMode', {
  state: () => ({
    darkMode: Cookies.get('darkMode') === 'true', // Initialize state based on cookie value
    initialized: false, // Track whether the store has been initialized
  }),
  actions: {
    initializeDarkMode() {
      // Set the darkMode state based on the value retrieved from cookies
      this.darkMode = Cookies.get('darkMode') === 'true';
      this.initialized = true; // Mark the store as initialized
    },
    toggleDarkMode() {
      // Toggle the darkMode state
      this.darkMode = !this.darkMode;
      // Update the cookie with the new value
      Cookies.set('darkMode', this.darkMode ? 'true' : 'false', {
        expires: 365,
      });
    },
  },
});
