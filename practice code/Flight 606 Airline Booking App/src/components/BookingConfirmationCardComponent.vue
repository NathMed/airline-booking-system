<script setup>

</script>

<template>
  <div>

    <!-- Booking Reference -->
    <!-- booking.bookingReference -->
    <div>
      <h2>Booking Reference</h2>
      <p><!-- bookingReference e.g. F606-1234567890 --></p>
    </div>

    <!-- Flight Details -->
    <!-- GET /flights/get-flight/:id -->
    <div>
      <h3>Flight Details</h3>

      <div>
        <label>Flight Number</label>
        <p><!-- flight.flightNumber --></p>
      </div>

      <div>
        <label>Airline</label>
        <p><!-- flight.airlineId --></p>
      </div>

      <div>
        <label>Origin</label>
        <!-- flight.originAirportId + flight.originTerminal -->
        <p><!-- originAirport.city (originAirport.iataCode) — Terminal --></p>
      </div>

      <div>
        <label>Destination</label>
        <!-- flight.destinationAirportId + flight.destinationTerminal -->
        <p><!-- destinationAirport.city (destinationAirport.iataCode) — Terminal --></p>
      </div>

      <div>
        <label>Departure</label>
        <p><!-- flight.departureTime --></p>
      </div>

      <div>
        <label>Arrival</label>
        <p><!-- flight.arrivalTime --></p>
      </div>

      <div>
        <label>Flight Status</label>
        <p><!-- flight.status --></p>
      </div>
    </div>

    <!-- Seat Details -->
    <!-- GET /seats/get-seat/:id -->
    <div>
      <h3>Seat Details</h3>

      <div>
        <label>Seat Number</label>
        <p><!-- seat.seatNumber --></p>
      </div>

      <div>
        <label>Class</label>
        <!-- seat.class: business | economy -->
        <p><!-- seat.class --></p>
      </div>
    </div>

    <!-- Booking Status -->
    <div>
      <h3>Booking Status</h3>

      <div>
        <label>Status</label>
        <!-- booking.status: pending | confirmed | cancelled -->
        <p><!-- booking.status --></p>
      </div>

      <div>
        <label>Total Amount</label>
        <p><!-- booking.totalAmount --></p>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>