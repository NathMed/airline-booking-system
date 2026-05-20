<script setup>
	import AdminUserCardComponent from '../components/AdminUserCardComponent.vue';
	import AdminEditUserFormComponent from '../components/AdminEditUserFormComponent.vue';
</script>

<template>
  <div>
    <h1>User Management</h1>

    <!-- Users Table -->
    <!-- GET /users/show-all-users -->
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Gender</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Role</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <!-- v-for loop over users list goes here -->
        <AdminUserCardComponent />
      </tbody>
    </table>

    <!-- Edit User Form -->
    <!-- Shown when a user row's Edit button is clicked -->
    <!-- PATCH /users/update-user/:id -->
    <AdminEditUserFormComponent />

  </div>
</template>

<style scoped>

</style>