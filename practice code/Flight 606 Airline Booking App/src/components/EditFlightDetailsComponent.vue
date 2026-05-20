<script setup>

</script>

<template>
  <div>
    <h3>Edit Flight</h3>

    <form @submit.prevent>

      <!-- PATCH /flights/update-flight/:id -->
      <!-- All fields below are updatable -->

      <!-- Populated via GET /airlines/get-all-airlines -->
      <div>
        <label>Airline</label>
        <select>
          <option value="">Select airline</option>
          <!-- v-for loop over airlines list goes here -->
        </select>
      </div>

      <!-- Populated via GET /aircrafts/get-all-aircraft -->
      <div>
        <label>Aircraft</label>
        <select>
          <option value="">Select aircraft</option>
          <!-- v-for loop over aircraft list goes here -->
        </select>
      </div>

      <!-- Populated via GET /airports/get-all-airports -->
      <div>
        <label>Origin Airport</label>
        <select>
          <option value="">Select origin airport</option>
          <!-- v-for loop over airports list goes here -->
        </select>
      </div>

      <div>
        <label>Origin Terminal</label>
        <input type="text" placeholder="e.g. Terminal 1" />
      </div>

      <!-- Populated via GET /airports/get-all-airports -->
      <div>
        <label>Destination Airport</label>
        <select>
          <option value="">Select destination airport</option>
          <!-- v-for loop over airports list goes here -->
        </select>
      </div>

      <div>
        <label>Destination Terminal</label>
        <input type="text" placeholder="e.g. Terminal 2" />
      </div>

      <div>
        <label>Flight Number</label>
        <input type="text" placeholder="e.g. PR101" />
      </div>

      <div>
        <label>Departure Time</label>
        <input type="datetime-local" />
      </div>

      <div>
        <label>Arrival Time</label>
        <input type="datetime-local" />
      </div>

      <div>
        <label>Base Price (Economy)</label>
        <input type="number" placeholder="e.g. 3500" min="0" />
      </div>

      <div>
        <label>Business Class Price</label>
        <input type="number" placeholder="e.g. 8000" min="0" />
      </div>

      <!-- Status update: triggers notification if delayed or cancelled -->
      <!-- Validated: scheduled | delayed | on-time | cancelled | departed | arrived -->
      <div>
        <label>Status</label>
        <select>
          <option value="scheduled">Scheduled</option>
          <option value="delayed">Delayed</option>
          <option value="on-time">On-time</option>
          <option value="cancelled">Cancelled</option>
          <option value="departed">Departed</option>
          <option value="arrived">Arrived</option>
        </select>
      </div>

      <!-- PATCH /flights/update-flight/:id -->
      <button type="submit">Update Flight</button>

    </form>
  </div>
</template>

<style scoped>

</style>