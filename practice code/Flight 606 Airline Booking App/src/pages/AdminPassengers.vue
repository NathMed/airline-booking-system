<script setup>
	import AdminPassengerCardComponent from '../components/AdminPassengerCardComponent.vue';
	import AdminEditPassengerFormComponent from '../components/AdminEditPassengerFormComponent.vue';
</script>

<template>
  <div>
    <h1>Passenger Management</h1>

    <!-- Passengers Table -->
    <!-- GET /passengers/get-all-passengers -->
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Gender</th>
          <th>Email</th>
          <th>Nationality</th>
          <th>Passport Number</th>
          <th>Passport Expiry</th>
          <th>Phone</th>
          <th>Type</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <!-- v-for loop over passengers list goes here -->
        <AdminPassengerCardComponent />
      </tbody>
    </table>

    <!-- Edit Passenger Form -->
    <!-- Shown when a passenger row's Edit button is clicked -->
    <!-- PUT /passengers/admin-update-passenger/:id -->
    <AdminEditPassengerFormComponent />

  </div>
</template>

<style scoped>

</style>