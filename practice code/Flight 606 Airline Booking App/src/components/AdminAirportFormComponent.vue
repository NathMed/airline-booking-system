<script setup>

</script>

<template>
  <div>
    <h3>Add New Airport</h3>

    <form @submit.prevent>

      <!-- Required: must be unique -->
      <div>
        <label>Airport Name</label>
        <input type="text" placeholder="e.g. Ninoy Aquino International Airport" />
      </div>

      <!-- Required: exactly 3 uppercase letters, must be unique -->
      <div>
        <label>IATA Code</label>
        <input type="text" placeholder="e.g. MNL" maxlength="3" />
      </div>

      <!-- Required -->
      <div>
        <label>City</label>
        <input type="text" placeholder="e.g. Manila" />
      </div>

      <!-- Required -->
      <div>
        <label>Country</label>
        <input type="text" placeholder="e.g. Philippines" />
      </div>

      <!-- POST /airports/create-airport -->
      <button type="submit">Create Airport</button>

    </form>
  </div>
</template>

<style scoped>

</style>