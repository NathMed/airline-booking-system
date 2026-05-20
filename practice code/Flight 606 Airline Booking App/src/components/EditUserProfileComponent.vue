<script setup>

</script>

<template>
  <div>

    <!-- Update Profile Form -->
    <!-- PATCH /users/update-profile -->
    <form @submit.prevent>
      <h3>Edit Profile</h3>

      <!-- firstName, lastName, phone, gender are updatable -->

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

      <!-- Required: must be exactly 11 digits -->
      <div>
        <label>Phone Number</label>
        <input type="text" placeholder="e.g. 09123456789" maxlength="11" />
      </div>

      <!-- PATCH /users/update-profile -->
      <button type="submit">Update Profile</button>

    </form>

    <!-- Update Email Form -->
    <!-- PATCH /users/update-email -->
    <form @submit.prevent>
      <h3>Update Email</h3>

      <!-- Required: must be valid email format -->
      <!-- Validated: must not already be in use by another account -->
      <div>
        <label>New Email Address</label>
        <input type="email" placeholder="name@example.com" />
      </div>

      <!-- PATCH /users/update-email -->
      <button type="submit">Update Email</button>

    </form>

    <!-- Update Password Form -->
    <!-- PATCH /users/update-password -->
    <form @submit.prevent>
      <h3>Change Password</h3>

      <!-- Required: current password for verification -->
      <div>
        <label>Current Password</label>
        <input type="password" placeholder="Enter current password" />
      </div>

      <!-- Required: minimum 8 characters -->
      <div>
        <label>New Password</label>
        <input type="password" placeholder="Minimum 8 characters" />
      </div>

      <!-- PATCH /users/update-password -->
      <button type="submit">Change Password</button>

    </form>

  </div>
</template>

<style scoped>

</style>