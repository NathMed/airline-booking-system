<script setup>
	import SearchFlightComponent from '../components/SearchFlightComponent.vue';
</script>

<template>
  <div>
    <section>
      <h1>Find Your Next Flight</h1>
      <p>Search available flights and book your seat.</p>
      <SearchFlightComponent @search="handleSearch" />
    </section>
   </div>
</template>

<style scoped>
	
</style>