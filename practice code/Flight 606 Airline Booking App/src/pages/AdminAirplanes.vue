<script setup>
	import AdminAirlineFormComponent from '../components/AdminAirlineFormComponent.vue';
	import AdminAircraftFormComponent from '../components/AdminAircraftFormComponent.vue';
</script>

<template>
  <div>
    <h1>Airlines & Aircraft Management</h1>

    <!--  AIRLINES SECTION  -->
    <section>
      <h2>Airlines</h2>

      <!-- Create Airline Form -->
      <!-- POST /airlines/create-airline -->
      <AdminAirlineFormComponent />

      <!-- Airlines Table -->
      <!-- GET /airlines/get-all-airlines -->
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>IATA Code</th>
            <th>Logo</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <!-- v-for loop over airlines list goes here -->
          <tr>
            <td><!-- airline.name --></td>
            <td><!-- airline.iataCode --></td>
            <td><!-- airline.logoURL --></td>
            <td><!-- airline.isActive ? 'Active' : 'Inactive' --></td>
            <td>
              <!-- PATCH /airlines/update-airline/:id -->
              <button>Edit</button>

              <!-- PATCH /airlines/deactivate-airline/:id -->
              <button>Deactivate</button>

              <!-- PATCH /airlines/reactivate-airline/:id -->
              <button>Reactivate</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <!--  AIRCRAFT SECTION  -->
    <section>
      <h2>Aircraft</h2>

      <!-- Create Aircraft Form -->
      <!-- POST /aircrafts/create-aircraft -->
      <AdminAircraftFormComponent />

      <!-- Aircraft Table -->
      <!-- GET /aircrafts/get-all-aircraft -->
      <table>
        <thead>
          <tr>
            <th>Airline</th>
            <th>Model</th>
            <th>Total Seats</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <!-- v-for loop over aircraft list goes here -->
          <tr>
            <td><!-- aircraft.airlineId --></td>
            <td><!-- aircraft.model --></td>
            <td><!-- aircraft.totalSeats --></td>
            <td><!-- aircraft.isActive ? 'Active' : 'Inactive' --></td>
            <td>
              <!-- PATCH /aircrafts/update-aircraft/:id -->
              <button>Edit</button>

              <!-- PATCH /aircrafts/deactivate-aircraft/:id -->
              <button>Deactivate</button>

              <!-- PATCH /aircrafts/reactivate-aircraft/:id -->
              <button>Reactivate</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

  </div>
</template>

<style scoped>

</style>