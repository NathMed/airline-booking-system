<script setup>

</script>

<template>
  <div>
    <h1>Create an Account</h1>

    <form @submit.prevent>

      <!-- Required: must not be empty -->
      <div>
        <label>First Name</label>
        <input type="text" placeholder="Enter first name" />
      </div>

      <!-- Required: must not be empty -->
      <div>
        <label>Last Name</label>
        <input type="text" placeholder="Enter last name" />
      </div>

      <!-- Required: Male | Female -->
      <div>
        <label>Gender</label>
        <select>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      <!-- Required: must be valid email format, must be unique -->
      <div>
        <label>Email Address</label>
        <input type="email" placeholder="name@example.com" />
      </div>

      <!-- Required: minimum 8 characters -->
      <div>
        <label>Password</label>
        <input type="password" placeholder="Minimum 8 characters" />
      </div>

      <!-- Required: must match password -->
      <div>
        <label>Confirm Password</label>
        <input type="password" placeholder="Confirm your password" />
      </div>

      <!-- Required: must be exactly 11 digits -->
      <div>
        <label>Phone Number</label>
        <input type="text" placeholder="e.g. 09123456789" maxlength="11" />
      </div>

      <!-- POST /users/register -->
      <!-- On success: redirect to Login page -->
      <!-- On fail 409: email already registered -->
      <button type="submit">Register</button>

    </form>

    <!-- Redirect to Login page -->
    <p>Already have an account? <a href="/login">Login here</a></p>

  </div>
</template>

<style scoped>

</style>