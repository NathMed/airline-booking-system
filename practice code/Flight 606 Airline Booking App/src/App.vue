<script setup>
  import { RouterLink, RouterView } from 'vue-router';
  import { useGlobalStore } from './stores/global';
  import Navbar from './components/NavbarComponent.vue';
  import Footer from './components/FooterComponent.vue';

  const globalStore = useGlobalStore();
</script>

<template>
  <div>
    <Navbar />
    
    <main>
      <RouterView />
    </main>

    <Footer />
  </div>
</template>

<style scoped>
  
</style>
