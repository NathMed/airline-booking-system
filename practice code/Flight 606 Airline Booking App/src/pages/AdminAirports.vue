<script setup>
	import AdminAirportFormComponent from '../components/AdminAirportFormComponent.vue';
</script>

<template>
  <div>
    <h1>Airport Management</h1>

    <!-- Create Airport Form -->
    <!-- POST /airports/create-airport -->
    <AdminAirportFormComponent />

    <!-- Airports Table -->
    <!-- GET /airports/get-all-airports -->
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>IATA Code</th>
          <th>City</th>
          <th>Country</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <!-- v-for loop over airports list goes here -->
        <tr>
          <td><!-- airport.name --></td>
          <td><!-- airport.iataCode --></td>
          <td><!-- airport.city --></td>
          <td><!-- airport.country --></td>
          <td><!-- airport.isActive ? 'Active' : 'Inactive' --></td>
          <td>
            <!-- PATCH /airports/deactivate-airport/:id -->
            <button>Deactivate</button>

            <!-- PATCH /airports/reactivate-airport/:id -->
            <button>Reactivate</button>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<style scoped>

</style>