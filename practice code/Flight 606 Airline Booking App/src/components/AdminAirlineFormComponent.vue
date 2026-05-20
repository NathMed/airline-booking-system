<script setup>

</script>

<template>
  <div>
    <h3>Add New Airline</h3>

    <form @submit.prevent>

      <!-- Required: airline name -->
      <!-- Validated: must be unique -->
      <div>
        <label>Airline Name</label>
        <input type="text" placeholder="e.g. Philippine Airlines" />
      </div>

      <!-- Required: exactly 2 uppercase letters -->
      <!-- Validated: must be unique -->
      <div>
        <label>IATA Code</label>
        <input type="text" placeholder="e.g. PR" maxlength="2" />
      </div>

      <!-- Required: full URL to airline logo image -->
      <div>
        <label>Logo URL</label>
        <input type="text" placeholder="https://example.com/logo.png" />
      </div>

      <!-- POST /airlines/create-airline -->
      <button type="submit">Create Airline</button>

    </form>

    <!-- Edit Airline Form -->
    <!-- Shown when an airline row's Edit button is clicked -->
    <form @submit.prevent>
      <h3>Edit Airline</h3>

      <!-- Only logoURL is updatable -->
      <!-- PATCH /airlines/update-airline/:id -->
      <div>
        <label>Logo URL</label>
        <input type="text" placeholder="https://example.com/new-logo.png" />
      </div>

      <button type="submit">Update Airline</button>

    </form>
  </div>
</template>

<style scoped>

</style>