<script lang="ts">
import { defineComponent } from 'vue';
import NavBar from './components/partials/NavBar.vue';

export default defineComponent({
  name: 'App',
  components: {
    NavBar,
  },
});
</script>
<template>
  <div>
    <NavBar />
    <router-view />
  </div>
</template>
<style scoped></style>
