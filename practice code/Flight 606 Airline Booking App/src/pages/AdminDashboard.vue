<script setup>
  import AdminStatCardComponent from '../components/AdminStatCardComponent.vue';
</script>

<template>
  <div>
    <h1>Admin Dashboard</h1>

    <!-- Summary Stats Section -->
    <!-- Each card fetches its count from the respective admin endpoint -->
    <section>

      <!-- Total Users -->
      <!-- GET /users/show-all-users -->
      <AdminStatCardComponent
        label="Total Users"
        icon="people"
      />

      <!-- Total Flights -->
      <!-- GET /flights/get-all-flights -->
      <AdminStatCardComponent
        label="Total Flights"
        icon="airplane"
      />

      <!-- Total Bookings -->
      <!-- GET /bookings/get-all-bookings -->
      <AdminStatCardComponent
        label="Total Bookings"
        icon="journal-bookmark"
      />

      <!-- Total Payments -->
      <!-- GET /payments/get-all-payments -->
      <AdminStatCardComponent
        label="Total Payments"
        icon="credit-card"
      />

      <!-- Total Passengers -->
      <!-- GET /passengers/get-all-passengers -->
      <AdminStatCardComponent
        label="Total Passengers"
        icon="person-vcard"
      />

      <!-- Unread Notifications -->
      <!-- GET /notifications/get-all-notifications -->
      <AdminStatCardComponent
        label="Notifications"
        icon="bell"
      />

    </section>

    <!-- Quick Navigation to Admin Pages -->
    <section>
      <h2>Manage</h2>

      <!-- Navigates to /admin/flights -->
      <button>Flights</button>

      <!-- Navigates to /admin/airports -->
      <button>Airports</button>

      <!-- Navigates to /admin/airplanes -->
      <button>Airlines & Aircraft</button>

      <!-- Navigates to /admin/bookings -->
      <button>Bookings</button>

      <!-- Navigates to /admin/users -->
      <button>Users</button>

      <!-- Navigates to /admin/passengers -->
      <button>Passengers</button>

    </section>
  </div>
</template>

<style scoped>

</style>