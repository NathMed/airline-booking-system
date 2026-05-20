<script setup>
  import AdminFlightFormComponent from '../components/AdminFlightFormComponent.vue';
  import EditFlightDetailsComponent from '../components/EditFlightDetailsComponent.vue';
</script>

<template>
  <div>
    <h1>Flight Management</h1>

    <!-- Create Flight Form -->
    <!-- POST /flights/create-flight -->
    <AdminFlightFormComponent />

    <!-- Flights Table -->
    <!-- GET /flights/get-all-flights -->
    <table>
      <thead>
        <tr>
          <th>Flight Number</th>
          <th>Airline</th>
          <th>Aircraft</th>
          <th>Origin</th>
          <th>Destination</th>
          <th>Departure</th>
          <th>Arrival</th>
          <th>Base Price</th>
          <th>Business Price</th>
          <th>Status</th>
          <th>Active</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <!-- v-for loop over flights list goes here -->
        <tr>
          <td><!-- flight.flightNumber --></td>
          <td><!-- flight.airlineId --></td>
          <td><!-- flight.aircraftId --></td>
          <td><!-- flight.originAirportId --> <!-- flight.originTerminal --></td>
          <td><!-- flight.destinationAirportId --> <!-- flight.destinationTerminal --></td>
          <td><!-- flight.departureTime --></td>
          <td><!-- flight.arrivalTime --></td>
          <td><!-- flight.basePrice --></td>
          <td><!-- flight.businessPrice --></td>
          <td><!-- flight.status --></td>
          <td><!-- flight.isActive ? 'Active' : 'Inactive' --></td>
          <td>
            <!-- Triggers EditFlightDetailsComponent to populate with this flight's data -->
            <button>Edit</button>

            <!-- PATCH /flights/deactivate-flight/:id -->
            <button>Deactivate</button>

            <!-- PATCH /flights/reactivate-flight/:id -->
            <button>Reactivate</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Edit Flight Form -->
    <!-- Shown when a flight row's Edit button is clicked -->
    <!-- PATCH /flights/update-flight/:id -->
    <EditFlightDetailsComponent />

  </div>
</template>

<style scoped>

</style>