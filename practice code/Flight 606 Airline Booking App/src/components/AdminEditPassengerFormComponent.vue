<script setup>

</script>

<template>
  <div>
    <h3>Edit Passenger</h3>

    <form @submit.prevent>

      <!-- PUT /passengers/admin-update-passenger/:id -->
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
        <label>Nationality</label>
        <input type="text" placeholder="e.g. Filipino" />
      </div>

      <div>
        <label>Passport Number</label>
        <input type="text" placeholder="e.g. P1234567A" />
      </div>

      <div>
        <label>Passport Expiry</label>
        <input type="date" />
      </div>

      <div>
        <label>Phone</label>
        <input type="text" placeholder="e.g. 09123456789" maxlength="11" />
      </div>

      <!-- PUT /passengers/admin-update-passenger/:id -->
      <button type="submit">Update Passenger</button>

    </form>
  </div>
</template>

<style scoped>

</style>