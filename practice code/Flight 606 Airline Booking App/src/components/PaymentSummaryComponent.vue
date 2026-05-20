<script setup>

</script>

<template>
  <div>
    <h3>Payment</h3>

    <form @submit.prevent>

      <!-- Hidden: bookingId passed from the previous booking step -->
      <!-- booking._id -->

      <!-- Total amount pulled from booking.totalAmount -->
      <div>
        <label>Amount Due</label>
        <p><!-- booking.totalAmount --></p>
      </div>

      <!-- Required: must match enum in backend -->
      <!-- Validated: credit_card | debit_card | gcash | cash -->
      <div>
        <label>Payment Method</label>
        <select>
          <option value="">Select payment method</option>
          <option value="credit_card">Credit Card</option>
          <option value="debit_card">Debit Card</option>
          <option value="gcash">GCash</option>
          <option value="cash">Cash</option>
        </select>
      </div>

      <!-- Amount field: should match booking.totalAmount -->
      <div>
        <label>Amount</label>
        <input type="number" placeholder="e.g. 5000" min="0" />
      </div>

      <!-- Guest only: required if userId is null -->
      <!-- POST /payments/guest/create-payment requires guestEmail -->
      <div>
        <label>Guest Email</label>
        <input type="email" placeholder="name@example.com" />
      </div>

      <!-- POST /payments/user/create-payment (logged-in user) -->
      <!-- POST /payments/guest/create-payment (guest) -->
      <!-- On success: booking.status updated to 'confirmed' -->
      <!-- On success: notification triggered for booking_confirmed -->
      <button type="submit">Confirm Payment</button>

    </form>
  </div>
</template>

<style scoped>

</style>