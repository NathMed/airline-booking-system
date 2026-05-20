<script setup>
	import BookingConfirmationCardComponent from '../components/BookingConfirmationCardComponent.vue';
	import PaymentSummaryComponent from '../components/PaymentSummaryComponent.vue';
</script>

<template>
  <div>
    <h1>Booking Confirmation</h1>

    <!-- Booking Summary -->
    <!-- GET /bookings/get-booking/:bookingReference -->
    <!-- Displays the full booking details after successful booking creation -->
    <BookingConfirmationCardComponent />

    <!-- Payment Section -->
    <!-- POST /payments/user/create-payment (logged-in user) -->
    <!-- POST /payments/guest/create-payment (guest) -->
    <PaymentSummaryComponent />

  </div>
</template>

<style scoped>

</style>