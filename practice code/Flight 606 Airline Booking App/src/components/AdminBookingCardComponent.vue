<script setup>
	// Props: booking (Object)
	// booking shape: { _id, bookingReference, userId, guestEmail, flightId, totalAmount, status, isActive }
	defineProps({
		booking: Object,
	});
</script>

<template>
  <tr>

    <!-- booking.bookingReference -->
    <td><!-- bookingReference --></td>

    <!-- Shows userId if logged-in user, guestEmail if guest -->
    <td><!-- userId || guestEmail --></td>

    <!-- booking.flightId -->
    <td><!-- flightId --></td>

    <!-- booking.totalAmount -->
    <td><!-- totalAmount --></td>

    <!-- booking.status: pending | confirmed | cancelled -->
    <td><!-- status --></td>

    <!-- booking.isActive -->
    <td><!-- isActive ? 'Active' : 'Inactive' --></td>

    <td>
      <!-- Triggers EditBookingComponent to populate with this booking's data -->
      <button>Edit</button>

      <!-- PATCH /bookings/update-booking-status/:id -->
      <!-- Cycles status: pending → confirmed → cancelled -->
      <select>
        <option value="pending">Pending</option>
        <option value="confirmed">Confirmed</option>
        <option value="cancelled">Cancelled</option>
      </select>
      <button>Update Status</button>

      <!-- PATCH /bookings/deactivate-booking/:id -->
      <button>Deactivate</button>

      <!-- PATCH /bookings/reactivate-booking/:id -->
      <button>Reactivate</button>
    </td>

  </tr>
</template>

<style scoped>

</style>