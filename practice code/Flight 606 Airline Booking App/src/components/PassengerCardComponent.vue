<script setup>
	// Props: passenger (Object)
	// passenger shape: { _id, firstName, lastName, gender, dateOfBirth, email, nationality, passportNumber, passportExpiry, phone, isProfileSaved, isActive }
	defineProps({
		passenger: Object,
	});
</script>

<template>
  <div>

    <!-- passenger.firstName + passenger.lastName -->
    <div>
      <h3><!-- firstName --> <!-- lastName --></h3>
    </div>

    <div>
      <label>Gender</label>
      <!-- passenger.gender: Male | Female -->
      <p><!-- gender --></p>
    </div>

    <div>
      <label>Date of Birth</label>
      <!-- passenger.dateOfBirth -->
      <p><!-- dateOfBirth --></p>
    </div>

    <div>
      <label>Email</label>
      <!-- passenger.email -->
      <p><!-- email --></p>
    </div>

    <div>
      <label>Nationality</label>
      <!-- passenger.nationality -->
      <p><!-- nationality --></p>
    </div>

    <div>
      <label>Passport Number</label>
      <!-- passenger.passportNumber -->
      <p><!-- passportNumber --></p>
    </div>

    <div>
      <label>Passport Expiry</label>
      <!-- passenger.passportExpiry -->
      <p><!-- passportExpiry --></p>
    </div>

    <div>
      <label>Phone</label>
      <!-- passenger.phone -->
      <p><!-- phone --></p>
    </div>

    <div>
      <!-- Triggers EditPassengerProfileComponent to populate with this passenger's data -->
      <!-- GET passenger data via passenger._id -->
      <button>Edit</button>

      <!-- Selects this passenger for the current booking -->
      <!-- Passes passenger._id to the booking flow -->
      <button>Select Passenger</button>
    </div>

  </div>
</template>

<style scoped>

</style>