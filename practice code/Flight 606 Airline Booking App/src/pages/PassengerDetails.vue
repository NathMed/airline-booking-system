<script setup>
	import PassengerCardComponent from '../components/PassengerCardComponent.vue';
	import EditPassengerProfileComponent from '../components/EditPassengerProfileComponent.vue';
</script>

<template>
  <div>
    <h1>Passenger Details</h1>

    <!-- Saved Passenger Profiles -->
    <!-- Shown for logged-in users only -->
    <!-- GET /passengers/user/my-passengers -->
    <!-- Fetches saved passenger profiles tied to req.user.id -->
    <section>
      <h2>Saved Passengers</h2>

      <!-- v-for loop over saved passengers list goes here -->
      <div>
        <PassengerCardComponent />
      </div>

      <!-- Empty State -->
      <!-- Shown when no saved passenger profiles are found -->
      <div>
        <p><!-- No saved passenger profiles found --></p>
      </div>
    </section>

    <!-- Create New Passenger Form -->
    <section>
      <h2>Add New Passenger</h2>

      <form @submit.prevent>

        <!-- Required -->
        <div>
          <label>First Name</label>
          <input type="text" placeholder="Enter first name" />
        </div>

        <!-- Required -->
        <div>
          <label>Last Name</label>
          <input type="text" placeholder="Enter last name" />
        </div>

        <!-- Required: Male | Female -->
        <div>
          <label>Gender</label>
          <select>
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <!-- Required -->
        <div>
          <label>Date of Birth</label>
          <input type="date" />
        </div>

        <!-- Required: guest only -->
        <!-- Hidden for logged-in users — email pulled from req.user.email -->
        <div>
          <label>Email</label>
          <input type="email" placeholder="name@example.com" />
        </div>

        <!-- Required -->
        <div>
          <label>Nationality</label>
          <input type="text" placeholder="e.g. Filipino" />
        </div>

        <!-- Required: must be unique -->
        <div>
          <label>Passport Number</label>
          <input type="text" placeholder="e.g. P1234567A" />
        </div>

        <!-- Required -->
        <div>
          <label>Passport Expiry</label>
          <input type="date" />
        </div>

        <!-- Required: must be exactly 11 digits -->
        <div>
          <label>Phone Number</label>
          <input type="text" placeholder="e.g. 09123456789" maxlength="11" />
        </div>

        <!-- POST /passengers/user/create-passenger (logged-in user) -->
        <!-- POST /passengers/guest/create-passenger (guest) -->
        <button type="submit">Add Passenger</button>

      </form>
    </section>

    <!-- Edit Passenger Form -->
    <!-- Shown when a saved passenger card's Edit button is clicked -->
    <!-- PATCH /passengers/user/update-passenger/:id -->
    <EditPassengerProfileComponent />

  </div>
</template>

<style scoped>

</style>