<script setup>
	// Props: booking (Object), isGuest (Boolean)
	// booking shape: { _id, bookingReference, flightId, totalAmount, status, isActive, guestEmail, userId }
	// isGuest: true if shown on GuestBookingLookup, false if shown on MyBookings
	defineProps({
		booking: Object,
		isGuest: Boolean,
	});
</script>

<template>
  <div>

    <!-- Booking Reference -->
    <div>
      <label>Booking Reference</label>
      <!-- booking.bookingReference e.g. F606-1234567890 -->
      <p><!-- bookingReference --></p>
    </div>

    <!-- Flight Details -->
    <!-- booking.flightId -->
    <div>
      <label>Flight</label>
      <!-- flightId.flightNumber -->
      <p><!-- flightNumber --></p>
    </div>

    <div>
      <label>Origin</label>
      <!-- flightId.originAirportId.city (flightId.originAirportId.iataCode) -->
      <p><!-- originCity (iataCode) --></p>
    </div>

    <div>
      <label>Destination</label>
      <!-- flightId.destinationAirportId.city (flightId.destinationAirportId.iataCode) -->
      <p><!-- destinationCity (iataCode) --></p>
    </div>

    <div>
      <label>Departure</label>
      <!-- flightId.departureTime -->
      <p><!-- departureTime --></p>
    </div>

    <div>
      <label>Arrival</label>
      <!-- flightId.arrivalTime -->
      <p><!-- arrivalTime --></p>
    </div>

    <!-- Booking Info -->
    <div>
      <label>Total Amount</label>
      <!-- booking.totalAmount -->
      <p><!-- totalAmount --></p>
    </div>

    <div>
      <label>Status</label>
      <!-- booking.status: pending | confirmed | cancelled -->
      <p><!-- status --></p>
    </div>

    <div>
      <label>Active</label>
      <!-- booking.isActive -->
      <p><!-- isActive ? 'Active' : 'Inactive' --></p>
    </div>

    <!-- Cancel Booking -->
    <!-- Shown only when booking.status is pending or confirmed -->
    <div>

      <!-- Logged-in user cancel -->
      <!-- PATCH /bookings/user/cancel-booking/:bookingReference -->
      <!-- Shown when isGuest is false -->
      <button>Cancel Booking</button>

      <!-- Guest cancel -->
      <!-- PATCH /bookings/guest/cancel-booking/:bookingReference -->
      <!-- Requires guestEmail confirmation -->
      <!-- Shown when isGuest is true -->
      <form @submit.prevent>
        <input type="email" placeholder="Confirm your email to cancel" />
        <button type="submit">Cancel Booking</button>
      </form>

    </div>

  </div>
</template>

<style scoped>

</style>