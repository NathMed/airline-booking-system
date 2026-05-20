<script setup>
	import BookingCardComponent from '../components/BookingCardComponent.vue';
</script>

<template>
  <div>
    <h1>Guest Booking Lookup</h1>

    <!-- Guest Email Lookup Form -->
    <!-- POST /bookings/guest/my-bookings -->
    <form @submit.prevent>

      <div>
        <label>Guest Email</label>
        <input type="email" placeholder="Enter the email used during booking" />
      </div>

      <button type="submit">Find My Bookings</button>

    </form>

    <!-- Booking Results List -->
    <!-- Shown after successful lookup -->
    <!-- v-for loop over bookings list goes here -->
    <div>
      <BookingCardComponent />
    </div>

    <!-- Empty State -->
    <!-- Shown when no bookings are found for this email -->
    <div>
      <p><!-- No bookings found for this email --></p>
    </div>

  </div>
</template>

<style scoped>

</style>