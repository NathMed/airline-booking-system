<script setup>
	import ItineraryCardComponent from '../components/ItineraryCardComponent.vue';
</script>

<template>
  <div>
    <h1>My Itinerary</h1>

    <!-- Create Itinerary Form -->
    <!-- POST /itineraries/create-itinerary -->
    <!-- bookings: array of { bookingId, type, gate } -->
    <form @submit.prevent>
      <h2>Create New Itinerary</h2>

      <!-- At least one booking is required -->
      <!-- Populated from confirmed bookings via GET /bookings/user/my-bookings -->
      <div>
        <label>Select Booking</label>
        <select>
          <option value="">Select a confirmed booking</option>
          <!-- v-for loop over confirmed bookings goes here -->
        </select>
      </div>

      <!-- Required: type of flight segment -->
      <!-- Validated: outbound | return | layover -->
      <div>
        <label>Flight Type</label>
        <select>
          <option value="">Select flight type</option>
          <option value="outbound">Outbound</option>
          <option value="return">Return</option>
          <option value="layover">Layover</option>
        </select>
      </div>

      <!-- Optional -->
      <div>
        <label>Gate</label>
        <input type="text" placeholder="e.g. Gate 12" />
      </div>

      <!-- POST /itineraries/create-itinerary -->
      <!-- On success: notification triggered for itinerary_created -->
      <button type="submit">Create Itinerary</button>

    </form>

    <!-- Itineraries List -->
    <!-- GET /itineraries/my-itineraries -->
    <!-- Fetches all active itineraries tied to req.user.id -->
    <!-- v-for loop over itineraries list goes here -->
    <div>
      <ItineraryCardComponent />
    </div>

    <!-- Empty State -->
    <!-- Shown when no itineraries are found for this user -->
    <div>
      <p><!-- You have no itineraries yet --></p>
    </div>

  </div>
</template>

<style scoped>

</style>