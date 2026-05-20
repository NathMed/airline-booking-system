<script setup>
	import FlightCardComponent from '../components/FlightCardComponent.vue';
</script>

<template>
  <div>
    <h1>Available Flights</h1>

    <!-- Search Summary -->
    <!-- Displays the origin, destination and date from route query params -->
    <!-- $route.query.originAirportId, $route.query.destinationAirportId, $route.query.departureDate -->
    <div>
      <p><!-- originAirport.city (originAirport.iataCode) --></p>
      <p>→</p>
      <p><!-- destinationAirport.city (destinationAirport.iataCode) --></p>
      <p><!-- departureDate --></p>
    </div>

    <!-- Flight Results List -->
    <!-- GET /flights/search?originAirportId=&destinationAirportId=&departureDate= -->
    <!-- v-for loop over flights list goes here -->
    <div>
      <FlightCardComponent />
    </div>

    <!-- Empty State -->
    <!-- Shown when no flights are returned -->
    <div>
      <p><!-- No flights found for this date --></p>
    </div>

  </div>
</template>

<style scoped>

</style>