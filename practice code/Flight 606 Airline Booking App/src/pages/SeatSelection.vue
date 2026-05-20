<script setup>
	import SeatSelector from '../components/SeatSelector.vue';
</script>

<template>
  <div>
    <h1>Select Your Seat</h1>

    <!-- Flight Summary -->
    <!-- GET /flights/get-flight/:id -->
    <!-- flightId passed from FlightResults via route query params -->
    <section>

      <div>
        <label>Flight</label>
        <p><!-- flight.flightNumber --></p>
      </div>

      <div>
        <label>Origin</label>
        <!-- flight.originAirportId.city (flight.originAirportId.iataCode) -->
        <p><!-- originCity (iataCode) --></p>
      </div>

      <div>
        <label>Destination</label>
        <!-- flight.destinationAirportId.city (flight.destinationAirportId.iataCode) -->
        <p><!-- destinationCity (iataCode) --></p>
      </div>

      <div>
        <label>Departure</label>
        <!-- flight.departureTime -->
        <p><!-- departureTime --></p>
      </div>

      <div>
        <label>Arrival</label>
        <!-- flight.arrivalTime -->
        <p><!-- arrivalTime --></p>
      </div>

    </section>

    <!-- Seat Availability Summary -->
    <!-- Returned alongside seats from GET /seats/get-seats-by-flight/:flightId -->
    <section>

      <div>
        <label>Total Seats</label>
        <!-- summary.total -->
        <p><!-- total --></p>
      </div>

      <div>
        <label>Available</label>
        <!-- summary.available -->
        <p><!-- available --></p>
      </div>

      <div>
        <label>Occupied</label>
        <!-- summary.occupied -->
        <p><!-- occupied --></p>
      </div>

    </section>

    <!-- Seat Legend -->
    <section>
      <div>
        <span>Business Class</span>
        <span>Economy Class</span>
        <span>Available</span>
        <span>Occupied</span>
        <span>Selected</span>
      </div>
    </section>

    <!-- Seat Map -->
    <!-- GET /seats/get-seats-by-flight/:flightId -->
    <!-- Passes seats array to SeatSelector for rendering the grid -->
    <!-- On seat selected: seatId passed to next step (PassengerDetails) -->
    <SeatSelector />

    <!-- Proceed Button -->
    <!-- Enabled only when a seat is selected -->
    <!-- Navigates to PassengerDetails with flightId and seatId as query params -->
    <button>Continue to Passenger Details</button>

  </div>
</template>

<style scoped>

</style>