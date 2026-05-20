<script setup>
	// Props: notification (Object)
	// notification shape: { _id, userId, type, message, referenceId, referenceModel, isRead, emailSent, emailSentAt, isActive, createdAt }
	// type enum: booking_confirmed | flight_status_change | itinerary_created
	defineProps({
		notification: Object,
	});
</script>

<template>
  <div>

    <!-- Unread Indicator -->
    <!-- Shown when notification.isRead is false -->
    <div>
      <!-- isRead ? '' : 'Unread' -->
    </div>

    <!-- Notification Type -->
    <!-- notification.type: booking_confirmed | flight_status_change | itinerary_created -->
    <div>
      <label>Type</label>
      <p><!-- type --></p>
    </div>

    <!-- Notification Message -->
    <!-- notification.message -->
    <div>
      <p><!-- message --></p>
    </div>

    <!-- Reference -->
    <!-- notification.referenceModel: Booking | Flight | Itinerary -->
    <!-- notification.referenceId -->
    <div>
      <label>Reference</label>
      <p><!-- referenceModel --> <!-- referenceId --></p>
    </div>

    <!-- Email Sent Info -->
    <!-- notification.emailSent -->
    <!-- notification.emailSentAt -->
    <div>
      <label>Email Sent</label>
      <p><!-- emailSent ? emailSentAt : 'Not sent' --></p>
    </div>

    <!-- Date -->
    <!-- notification.createdAt -->
    <div>
      <label>Date</label>
      <p><!-- createdAt --></p>
    </div>

    <!-- Mark as Read -->
    <!-- PATCH /notifications/mark-as-read/:id -->
    <!-- Only shown when notification.isRead is false -->
    <button>Mark as Read</button>

  </div>
</template>

<style scoped>

</style>