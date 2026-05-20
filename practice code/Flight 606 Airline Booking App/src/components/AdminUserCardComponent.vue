<script setup>
	// Props: user (Object)
	// user shape: { _id, firstName, lastName, gender, email, phone, isAdmin, isActive }
	defineProps({
		user: Object,
	});
</script>

<template>
  <tr>

    <!-- user.firstName -->
    <td><!-- firstName --></td>

    <!-- user.lastName -->
    <td><!-- lastName --></td>

    <!-- user.gender: Male | Female -->
    <td><!-- gender --></td>

    <!-- user.email -->
    <td><!-- email --></td>

    <!-- user.phone -->
    <td><!-- phone --></td>

    <!-- Shows 'Admin' if isAdmin is true, 'User' if false -->
    <td><!-- isAdmin ? 'Admin' : 'User' --></td>

    <!-- user.isActive -->
    <td><!-- isActive ? 'Active' : 'Inactive' --></td>

    <td>
      <!-- GET /users/show-user/:id -->
      <!-- Triggers AdminEditUserFormComponent to populate with this user's data -->
      <button>Edit</button>

      <!-- PATCH /users/deactivate-user/:id -->
      <button>Deactivate</button>

      <!-- PATCH /users/reactivate-user/:id -->
      <button>Reactivate</button>
    </td>

  </tr>
</template>

<style scoped>

</style>