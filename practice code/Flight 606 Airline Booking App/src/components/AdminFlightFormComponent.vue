<script setup>

</script>

<template>
  <div>
    <h3>Add New Flight</h3>

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

      <!-- Required: must reference an existing active aircraft -->
      <!-- Populated via GET /aircrafts/get-all-aircraft -->
      <div>
        <label>Aircraft</label>
        <select>
          <option value="">Select aircraft</option>
          <!-- v-for loop over aircraft list goes here -->
        </select>
      </div>

      <!-- Required: must reference an existing active airport -->
      <!-- Populated via GET /airports/get-all-airports -->
      <div>
        <label>Origin Airport</label>
        <select>
          <option value="">Select origin airport</option>
          <!-- v-for loop over airports list goes here -->
        </select>
      </div>

      <!-- Optional -->
      <div>
        <label>Origin Terminal</label>
        <input type="text" placeholder="e.g. Terminal 1" />
      </div>

      <!-- Required: must reference an existing active airport -->
      <!-- Populated via GET /airports/get-all-airports -->
      <div>
        <label>Destination Airport</label>
        <select>
          <option value="">Select destination airport</option>
          <!-- v-for loop over airports list goes here -->
        </select>
      </div>

      <!-- Optional -->
      <div>
        <label>Destination Terminal</label>
        <input type="text" placeholder="e.g. Terminal 2" />
      </div>

      <!-- Required: must be unique -->
      <div>
        <label>Flight Number</label>
        <input type="text" placeholder="e.g. PR101" />
      </div>

      <!-- Required -->
      <div>
        <label>Departure Time</label>
        <input type="datetime-local" />
      </div>

      <!-- Required -->
      <div>
        <label>Arrival Time</label>
        <input type="datetime-local" />
      </div>

      <!-- Required: economy class price, must not be negative -->
      <div>
        <label>Base Price (Economy)</label>
        <input type="number" placeholder="e.g. 3500" min="0" />
      </div>

      <!-- Required: must be greater than basePrice -->
      <div>
        <label>Business Class Price</label>
        <input type="number" placeholder="e.g. 8000" min="0" />
      </div>

      <!-- POST /flights/create-flight -->
      <!-- Auto-generates seats based on aircraft.totalSeats on success -->
      <button type="submit">Create Flight</button>

    </form>
  </div>
</template>

<style scoped>

</style>