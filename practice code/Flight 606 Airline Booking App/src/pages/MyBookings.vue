<script setup>
	import BookingCardComponent from '../components/BookingCardComponent.vue';
</script>

<template>
  <div>
    <h1>My Bookings</h1>

    <!-- Bookings List -->
    <!-- GET /bookings/user/my-bookings -->
    <!-- Fetches all bookings tied to req.user.id (from JWT token) -->
    <!-- v-for loop over bookings list goes here -->
    <div>
      <!-- isGuest set to false — uses logged-in user cancel flow -->
      <!-- PATCH /bookings/user/cancel-booking/:bookingReference -->
      <BookingCardComponent :isGuest="false" />
    </div>

    <!-- Empty State -->
    <!-- Shown when no bookings are found for this user -->
    <div>
      <p><!-- You have no bookings yet --></p>
      <!-- Redirect to Home to search for flights -->
      <a href="/">Search for a flight</a>
    </div>

  </div>
</template>

<style scoped>

</style>