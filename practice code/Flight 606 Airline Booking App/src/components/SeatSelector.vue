<script setup>
	// Props: seats (Array)
	// seat shape: { _id, flightId, seatNumber, class, isOccupied, isActive }
	// class enum: business | economy
	// Emits: seat-selected with the selected seat object
	defineProps({
		seats: Array,
	});

	defineEmits(['seat-selected']);
</script>

<template>
  <div>

    <!-- Seat Grid -->
    <!-- Generated from seats array passed from SeatSelection.vue -->
    <!-- First 2 rows (1A-2F) are Business class -->
    <!-- Remaining rows are Economy class -->
    <!-- v-for loop over seats goes here -->
    <div>

      <!-- Business Class Label -->
      <!-- Shown before row 1 -->
      <p>Business Class</p>

      <!-- Economy Class Label -->
      <!-- Shown before row 3 -->
      <p>Economy Class</p>

      <!-- Column Headers: A B C | D E F -->
      <div>
        <span>A</span>
        <span>B</span>
        <span>C</span>
        <!-- Aisle gap -->
        <span>D</span>
        <span>E</span>
        <span>F</span>
      </div>

      <!-- Individual Seat -->
      <!-- seat.seatNumber e.g. 1A, 2B, 3C -->
      <!-- seat.class: business | economy -->
      <!-- seat.isOccupied: true | false -->
      <!-- On click: emit 'seat-selected' with seat object if not occupied -->
      <button>
        <!-- seat.seatNumber -->
      </button>

    </div>

    <!-- Selected Seat Info -->
    <!-- Shown when a seat is selected -->
    <div>
      <label>Selected Seat</label>
      <!-- selectedSeat.seatNumber (selectedSeat.class) -->
      <p><!-- seatNumber (class) --></p>
    </div>

  </div>
</template>

<style scoped>

</style>