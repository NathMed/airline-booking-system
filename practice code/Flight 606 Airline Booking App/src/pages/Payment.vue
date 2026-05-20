<script setup>
	import PaymentSummaryComponent from '../components/PaymentSummaryComponent.vue';
</script>

<template>
  <div>
    <h1>Payment</h1>

    <!-- Booking Summary -->
    <!-- Pulled from route query params or store -->
    <!-- bookingId, bookingReference, totalAmount, seatClass passed from previous step -->
    <section>
      <h2>Order Summary</h2>

      <div>
        <label>Booking Reference</label>
        <p><!-- bookingReference --></p>
      </div>

      <div>
        <label>Flight</label>
        <p><!-- flightNumber --></p>
      </div>

      <div>
        <label>Seat</label>
        <p><!-- seatNumber --> (<!-- seatClass -->)</p>
      </div>

      <div>
        <label>Total Amount</label>
        <p><!-- totalAmount --></p>
      </div>
    </section>

    <!-- Payment Form -->
    <!-- POST /payments/user/create-payment (logged-in user) -->
    <!-- POST /payments/guest/create-payment (guest) -->
    <!-- On success: booking.status updated to 'confirmed' -->
    <!-- On success: notification triggered for booking_confirmed -->
    <!-- On success: redirect to ConfirmBooking page -->
    <PaymentSummaryComponent />

  </div>
</template>

<style scoped>

</style>