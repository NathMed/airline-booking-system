<script setup>
	// Props: itinerary (Object)
	// itinerary shape: { _id, userId, guestEmail, bookings: [{ bookingId, type, gate }], isActive }
	// bookingId is fully populated with flightId, which is populated with originAirportId, destinationAirportId, airlineId
	defineProps({
		itinerary: Object,
	});
</script>

<template>
  <div>

    <!-- Itinerary ID -->
    <div>
      <label>Itinerary</label>
      <!-- itinerary._id -->
      <p><!-- _id --></p>
    </div>

    <!-- Itinerary Status -->
    <div>
      <label>Status</label>
      <!-- itinerary.isActive -->
      <p><!-- isActive ? 'Active' : 'Inactive' --></p>
    </div>

    <!-- Booking Segments -->
    <!-- v-for loop over itinerary.bookings goes here -->
    <div>

      <!-- Segment Type -->
      <!-- booking.type: outbound | return | layover -->
      <div>
        <label>Type</label>
        <p><!-- type --></p>
      </div>

      <!-- Gate -->
      <!-- booking.gate (optional) -->
      <div>
        <label>Gate</label>
        <p><!-- gate || 'TBA' --></p>
      </div>

      <!-- Flight Details -->
      <!-- booking.bookingId.flightId -->
      <div>
        <label>Flight</label>
        <!-- bookingId.flightId.flightNumber -->
        <p><!-- flightNumber --></p>
      </div>

      <div>
        <label>Airline</label>
        <!-- bookingId.flightId.airlineId.name -->
        <p><!-- airlineName --></p>
      </div>

      <div>
        <label>Origin</label>
        <!-- bookingId.flightId.originAirportId.city (iataCode) -->
        <p><!-- originCity (iataCode) --></p>
      </div>

      <div>
        <label>Destination</label>
        <!-- bookingId.flightId.destinationAirportId.city (iataCode) -->
        <p><!-- destinationCity (iataCode) --></p>
      </div>

      <div>
        <label>Departure</label>
        <!-- bookingId.flightId.departureTime -->
        <p><!-- departureTime --></p>
      </div>

      <div>
        <label>Arrival</label>
        <!-- bookingId.flightId.arrivalTime -->
        <p><!-- arrivalTime --></p>
      </div>

      <!-- Booking Reference -->
      <div>
        <label>Booking Reference</label>
        <!-- bookingId.bookingReference -->
        <p><!-- bookingReference --></p>
      </div>

      <!-- Remove Booking from Itinerary -->
      <!-- PATCH /itineraries/remove-booking/:id -->
      <!-- Cannot remove if it is the only booking in the itinerary -->
      <button>Remove Segment</button>

    </div>

    <!-- Add Booking to Itinerary -->
    <!-- PATCH /itineraries/add-booking/:id -->
    <form @submit.prevent>
      <h3>Add Flight Segment</h3>

      <!-- Populated from confirmed bookings via GET /bookings/user/my-bookings -->
      <div>
        <label>Select Booking</label>
        <select>
          <option value="">Select a confirmed booking</option>
          <!-- v-for loop over confirmed bookings goes here -->
        </select>
      </div>

      <!-- Validated: outbound | return | layover -->
      <div>
        <label>Flight Type</label>
        <select>
          <option value="">Select flight type</option>
          <option value="outbound">Outbound</option>
          <option value="return">Return</option>
          <option value="layover">Layover</option>
        </select>
      </div>

      <!-- Optional -->
      <div>
        <label>Gate</label>
        <input type="text" placeholder="e.g. Gate 12" />
      </div>

      <!-- PATCH /itineraries/add-booking/:id -->
      <button type="submit">Add Segment</button>

    </form>

  </div>
</template>

<style scoped>

</style>