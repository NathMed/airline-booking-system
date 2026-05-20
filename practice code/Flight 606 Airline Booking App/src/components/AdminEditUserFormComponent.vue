<script setup>

</script>

<template>
  <div>
    <h3>Edit User</h3>

    <form @submit.prevent>

      <!-- PATCH /users/update-user/:id -->
      <!-- All fields below are updatable by admin -->

      <div>
        <label>First Name</label>
        <input type="text" placeholder="Enter first name" />
      </div>

      <div>
        <label>Last Name</label>
        <input type="text" placeholder="Enter last name" />
      </div>

      <div>
        <label>Gender</label>
        <select>
          <option value="">Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      <div>
        <label>Email</label>
        <input type="email" placeholder="name@example.com" />
      </div>

      <div>
        <label>Phone</label>
        <input type="text" placeholder="e.g. 09123456789" maxlength="11" />
      </div>

      <!-- Toggles user between Admin and regular User role -->
      <div>
        <label>Role</label>
        <select>
          <option value="false">User</option>
          <option value="true">Admin</option>
        </select>
      </div>

      <!-- PATCH /users/update-user/:id -->
      <button type="submit">Update User</button>

    </form>
  </div>
</template>

<style scoped>

</style>