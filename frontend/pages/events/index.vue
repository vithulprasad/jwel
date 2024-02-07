<template>
  <div data-page="events">
    <EventsEventHeader @openDialog="openDialog" />
    <div class="container">
      <div class="row">
        <div
          :class="{ 'col-lg-6': isDialogOpen, 'col-lg-12': !isDialogOpen }"
          class="col-md-12 col-sm-12 pt-2"
        >
          <div class="row">
            <div
              v-if="events.length === 0"
              class="col-lg-12 col-md-12 col-sm-12 mx-auto"
            >
              <!-- Render empty page component if no events -->
              <EventsEmptyPage />
            </div>
            <div
              v-else
              class="col-lg-12 col-md-12 col-sm-12 mx-auto"
              v-for="eventDetails in events.data"
              :key="eventDetails.event_id"
            >
              <!-- Render event list component with event details as props -->
              <EventsEventList :eventValues="eventDetails" />
            </div>
          </div>
        </div>
        <div v-if="isDialogOpen" class="col-lg-6 col-md-12 col-sm-12 pt-2">
          <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 mx-auto">
              <EventsAddEvent @closeDialog="closeDialog" />
              <!-- <EventsTestStepper  @closeDialog="closeDialog"/> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getAllEvents } from "../../apiConfig/apiConfig";
definePageMeta({
  layout: "main",
});

const isDialogOpen = ref(false);
const events = ref([]);

const openDialog = () => {
  isDialogOpen.value = true;
};

const closeDialog = () => {
  isDialogOpen.value = false;
};

const fetchData = async () => {
  try {
    const res = await getAllEvents();
    events.value = res.data;
  } catch (error) {
    console.error("Error fetching events:", error.message);
  }
};

onMounted(() => {
  fetchData();
});
console.log(events.value.length,"Event lendght")
console.log(events,"eventssss")

</script>

<style scoped>
.contain {
}
</style>
