<script setup>

</script>

<template>
  <div>
    <h3>Add New Aircraft</h3>

    <form @submit.prevent>

      <!-- Required: must reference an existing active airline -->
      <!-- Populated via GET /airlines/get-all-airlines -->
      <div>
        <label>Airline</label>
        <select>
          <option value="">Select airline</option>
          <!-- v-for loop over airlines list goes here -->
        </select>
      </div>

      <!-- Required: must be unique per airline -->
      <div>
        <label>Model</label>
        <input type="text" placeholder="e.g. Boeing 737" />
      </div>

      <!-- Required: min 150, max 300 -->
      <div>
        <label>Total Seats</label>
        <input type="number" placeholder="e.g. 180" min="150" max="300" />
      </div>

      <!-- POST /aircrafts/create-aircraft -->
      <button type="submit">Create Aircraft</button>

    </form>

    <!-- Edit Aircraft Form -->
    <!-- Shown when an aircraft row's Edit button is clicked -->
    <form @submit.prevent>
      <h3>Edit Aircraft</h3>

      <!-- PATCH /aircrafts/update-aircraft/:id -->
      <!-- All three fields are updatable -->

      <div>
        <label>Airline</label>
        <select>
          <option value="">Select airline</option>
          <!-- v-for loop over airlines list goes here -->
        </select>
      </div>

      <div>
        <label>Model</label>
        <input type="text" placeholder="e.g. Airbus A320" />
      </div>

      <div>
        <label>Total Seats</label>
        <input type="number" placeholder="e.g. 200" min="150" max="300" />
      </div>

      <button type="submit">Update Aircraft</button>

    </form>
  </div>
</template>

<style scoped>

</style>