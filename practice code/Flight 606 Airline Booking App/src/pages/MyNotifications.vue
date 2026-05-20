<script setup>
	import NotificationItemComponent from '../components/NotificationItemComponent.vue';
</script>

<template>
  <div>
    <h1>My Notifications</h1>

    <!-- Mark All as Read -->
    <!-- PATCH /notifications/mark-all-as-read -->
    <!-- Only shown when there are unread notifications -->
    <button>Mark All as Read</button>

    <!-- Notifications List -->
    <!-- GET /notifications/my-notifications -->
    <!-- Fetches all active notifications tied to req.user.id sorted by createdAt descending -->
    <!-- v-for loop over notifications list goes here -->
    <div>
      <NotificationItemComponent />
    </div>

    <!-- Empty State -->
    <!-- Shown when no notifications are found -->
    <div>
      <p><!-- You have no notifications --></p>
    </div>

  </div>
</template>

<style scoped>

</style>