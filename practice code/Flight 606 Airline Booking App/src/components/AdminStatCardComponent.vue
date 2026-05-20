<script setup>
  // Props: label (String), icon (String), count (Number)
  // count is passed in from parent after fetching from the respective admin endpoint
  defineProps({
    label: String,
    icon: String,
    count: Number,
  });
</script>

<template>
  <div>

    <!-- Icon -->
    <!-- Uses bootstrap-icons class e.g. bi-people, bi-airplane -->
    <i :class="`bi bi-${icon}`"></i>

    <!-- Stat Count -->
    <!-- Displays the total count fetched from the backend -->
    <p>{{ count }}</p>

    <!-- Stat Label -->
    <p>{{ label }}</p>

  </div>
</template>

<style scoped>

</style>