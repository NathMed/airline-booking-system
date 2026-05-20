<script setup>
	// Props: flight (Object)
	// flight shape: { _id, flightNumber, airlineId, aircraftId, originAirportId, destinationAirportId,
	//                 departureTime, arrivalTime, status, basePrice, businessPrice,
	//                 originTerminal, destinationTerminal, isActive }
	defineProps({
		flight: Object,
	});
</script>

<template>
  <div>

    <!-- Airline Info -->
    <div>
      <!-- flight.airlineId.logoURL -->
      <img src="" alt="Airline logo" />
      <!-- flight.airlineId.name -->
      <p><!-- airlineName --></p>
    </div>

    <!-- Flight Number -->
    <div>
      <label>Flight</label>
      <p><!-- flight.flightNumber --></p>
    </div>

    <!-- Route -->
    <div>

      <!-- Origin -->
      <div>
        <!-- flight.originAirportId.iataCode -->
        <p><!-- iataCode --></p>
        <!-- flight.originAirportId.city -->
        <p><!-- city --></p>
        <!-- flight.originTerminal -->
        <p><!-- Terminal -- if available --></p>
        <!-- flight.departureTime -->
        <p><!-- departureTime --></p>
      </div>

      <p>→</p>

      <!-- Destination -->
      <div>
        <!-- flight.destinationAirportId.iataCode -->
        <p><!-- iataCode --></p>
        <!-- flight.destinationAirportId.city -->
        <p><!-- city --></p>
        <!-- flight.destinationTerminal -->
        <p><!-- Terminal -- if available --></p>
        <!-- flight.arrivalTime -->
        <p><!-- arrivalTime --></p>
      </div>

    </div>

    <!-- Pricing -->
    <div>

      <div>
        <label>Economy</label>
        <!-- flight.basePrice -->
        <p><!-- basePrice --></p>
      </div>

      <div>
        <label>Business</label>
        <!-- flight.businessPrice -->
        <p><!-- businessPrice --></p>
      </div>

    </div>

    <!-- Flight Status -->
    <!-- flight.status: scheduled | delayed | on-time | cancelled | departed | arrived -->
    <div>
      <p><!-- flight.status --></p>
    </div>

    <!-- Select Flight Button -->
    <!-- Navigates to SeatSelection page with flightId as query param -->
    <button>Select Flight</button>

  </div>
</template>

<style scoped>

</style>