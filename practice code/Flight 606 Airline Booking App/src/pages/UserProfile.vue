<script setup>
	import EditUserProfileComponent from '../components/EditUserProfileComponent.vue';
</script>

<template>
  <div>
    <h1>My Profile</h1>

    <!-- Profile Display -->
    <!-- GET /users/profile -->
    <!-- Fetches profile tied to req.user.id from JWT token -->
    <section>
      <h2>Account Information</h2>

      <div>
        <label>First Name</label>
        <p><!-- user.firstName --></p>
      </div>

      <div>
        <label>Last Name</label>
        <p><!-- user.lastName --></p>
      </div>

      <div>
        <label>Gender</label>
        <p><!-- user.gender --></p>
      </div>

      <div>
        <label>Email</label>
        <p><!-- user.email --></p>
      </div>

      <div>
        <label>Phone</label>
        <p><!-- user.phone --></p>
      </div>

      <div>
        <label>Role</label>
        <!-- user.isAdmin ? 'Admin' : 'User' -->
        <p><!-- role --></p>
      </div>

    </section>

    <!-- Edit Profile Forms -->
    <!-- Shown when Edit button is clicked -->
    <EditUserProfileComponent />

  </div>
</template>

<style scoped>

</style>