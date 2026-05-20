<script setup>

</script>

<template>
  <div>
    <form @submit.prevent>

      <!-- Trip Type Selection -->
      <div>
        <label>
          <input type="radio" name="tripType" value="one-way" />
          One-way
        </label>
        <label>
          <input type="radio" name="tripType" value="roundtrip" />
          Roundtrip
        </label>
        <label>
          <input type="radio" name="tripType" value="multi-city" />
          Multi-city
        </label>
      </div>

      <!-- Origin Airport -->
      <div>
        <label>From</label>
        <select>
          <option value="">Select origin airport</option>
        </select>
      </div>

      <!-- Destination Airport -->
      <div>
        <label>To</label>
        <select>
          <option value="">Select destination airport</option>
        </select>
      </div>

      <!-- Departure Date -->
      <div>
        <label>Departure Date</label>
        <input type="date" />
      </div>

      <!-- Return Date (shown only when tripType is roundtrip) -->
      <div>
        <label>Return Date</label>
        <input type="date" />
      </div>

      <button type="submit">Search Flights</button>

    </form>
  </div>
</template>

<style scoped>

</style>