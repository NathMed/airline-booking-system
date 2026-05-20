<script setup>
	// Props: passenger (Object)
	// passenger shape: { _id, firstName, lastName, gender, email, nationality, passportNumber, passportExpiry, phone, userId, isProfileSaved, isActive }
	defineProps({
		passenger: Object,
	});
</script>

<template>
  <tr>

    <!-- passenger.firstName -->
    <td><!-- firstName --></td>

    <!-- passenger.lastName -->
    <td><!-- lastName --></td>

    <!-- passenger.gender: Male | Female -->
    <td><!-- gender --></td>

    <!-- passenger.email -->
    <td><!-- email --></td>

    <!-- passenger.nationality -->
    <td><!-- nationality --></td>

    <!-- passenger.passportNumber -->
    <td><!-- passportNumber --></td>

    <!-- passenger.passportExpiry -->
    <td><!-- passportExpiry --></td>

    <!-- passenger.phone -->
    <td><!-- phone --></td>

    <!-- Shows 'Registered' if userId exists, 'Guest' if userId is null -->
    <td><!-- userId ? 'Registered' : 'Guest' --></td>

    <!-- passenger.isActive -->
    <td><!-- isActive ? 'Active' : 'Inactive' --></td>

    <td>
      <!-- GET /passengers/get-passenger/:id -->
      <!-- Triggers AdminEditPassengerFormComponent to populate with this passenger's data -->
      <button>Edit</button>

      <!-- PATCH /passengers/activate-passenger/:id -->
      <button>Activate</button>

      <!-- PATCH /passengers/deactivate-passenger/:id -->
      <button>Deactivate</button>
    </td>

  </tr>
</template>

<style scoped>

</style>