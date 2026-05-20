<script setup>

</script>

<template>
  <div>
    <h1>Login</h1>

    <form @submit.prevent>

      <!-- Required: must be a valid email format -->
      <div>
        <label>Email Address</label>
        <input type="email" placeholder="name@example.com" />
      </div>

      <!-- Required -->
      <div>
        <label>Password</label>
        <input type="password" placeholder="Enter your password" />
      </div>

      <!-- POST /users/login -->
      <!-- On success: store access token, redirect to Home -->
      <!-- On fail 404: email not found -->
      <!-- On fail 401: incorrect password -->
      <!-- On fail 403: account is deactivated -->
      <button type="submit">Login</button>

    </form>

    <!-- Redirect to Register page -->
    <p>Don't have an account? <a href="/register">Register here</a></p>

    <!-- Redirect to Guest Booking Lookup -->
    <p>Booked as a guest? <a href="/guest/booking-lookup">Look up your booking</a></p>

  </div>
</template>

<style scoped>

</style>