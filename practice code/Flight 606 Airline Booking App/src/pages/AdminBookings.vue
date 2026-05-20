<script setup>
	import AdminBookingCardComponent from '../components/AdminBookingCardComponent.vue';
	import EditBookingComponent from '../components/EditBookingComponent.vue';
</script>

<template>
  <div>
    <h1>Booking Management</h1>

    <!-- Bookings Table -->
    <!-- GET /bookings/get-all-bookings -->
    <table>
      <thead>
        <tr>
          <th>Booking Reference</th>
          <th>User / Guest</th>
          <th>Flight</th>
          <th>Total Amount</th>
          <th>Status</th>
          <th>Active</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <!-- v-for loop over bookings list goes here -->
        <AdminBookingCardComponent />
      </tbody>
    </table>

    <!-- Edit Booking Form -->
    <!-- Shown when a booking row's Edit button is clicked -->
    <!-- PATCH /bookings/update-booking/:id -->
    <!-- PATCH /bookings/update-booking-status/:id -->
    <EditBookingComponent />

  </div>
</template>

<style scoped>

</style>