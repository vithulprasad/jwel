<template>
  <div data-page="ministry">
    <MinistriesMHeader @openDialogM="openDialogM" />

    <div class="container">
      <div class="row">
        <div
          :class="{ 'col-lg-6': isDialogOpen, 'col-lg-12': !isDialogOpen }"
          class="col-md-12 col-sm-12 pt-2"
        >
          <div class="row">
            <div
              v-if="ministry.length === 0"
              class="col-lg-12 col-md-12 col-sm-12 mx-auto"
            >
              <!-- Render empty page component if no students -->
              <MinistriesEmptyMinistry />
            </div>
            <div
              v-else
              class="col-lg-12 col-md-12 col-sm-12 mx-auto"
              v-for="ministryDetails in ministry"
              :key="ministryDetails.ministry_id"
            >
              <!-- Render student list component with student details as props -->
              <MinistriesMList :ministryValues="ministryDetails" />
            </div>
          </div>
        </div>
        <div v-if="isDialogOpen" class="col-lg-6 col-md-12 col-sm-12 pt-2">
          <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 mx-auto">
              <MinistriesAddM @closeDialog="closeDialog" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getAllMinstry } from "../../apiConfig/apiConfig";
definePageMeta({
  layout: "main",
});

const isDialogOpen = ref(false);
const ministry = ref([]);

const openDialogM = () => {
  isDialogOpen.value = true;
};

const closeDialog = () => {
  isDialogOpen.value = false;
};
const fetchData = async () => {
  try {
    const res = await getAllMinstry();
    ministry.value = res.data;
  } catch (error) {
    console.error("Error fetching Ministry:", error.message);
  }
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
/* Add scoped styles here if needed */
</style>
