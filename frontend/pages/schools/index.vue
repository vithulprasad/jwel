<template>
  <div data-page="schools">
    <SchoolsSchoolHeader @openDialog="openDialog" />

    <div class="container">
      <div class="row">
        <div
          :class="{ 'col-lg-6': isDialogOpen, 'col-lg-12': !isDialogOpen }"
          class="col-md-12 col-sm-12 pt-2"
        >
          <div class="row">
            <div
              v-if="schools.length === 0"
              class="col-lg-12 col-md-12 col-sm-12 mx-auto"
            >
              <!-- Render empty page component if no students -->
              <SchoolsEmptySchool />
            </div>
            <div
              v-else
              class="col-lg-12 col-md-12 col-sm-12 mx-auto"
              v-for="schoolDetails in schools"
              :key="schoolDetails.school_id"
            >
              <!-- Render student list component with student details as props -->
              <SchoolsSchoolList :schoolValues="schoolDetails" />
            </div>
          </div>
        </div>
        <div v-if="isDialogOpen" class="col-lg-6 col-md-12 col-sm-12 pt-2">
          <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 mx-auto">
              <SchoolsAddSchool @closeDialog="closeDialog" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getAllSchools } from "../../apiConfig/apiConfig";

definePageMeta({
  layout: "main",
});

const isDialogOpen = ref(false);
const schools = ref([]);

const openDialog = () => {
  isDialogOpen.value = true;
};

const closeDialog = () => {
  isDialogOpen.value = false;
};

//fucnton to fetch all students data to display
const fetchData = async () => {
  try {
    const res = await getAllSchools();
    schools.value = res.data;
  } catch (error) {
    console.error("Error fetching students:", error.message);
  }
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
/* Add scoped styles here if needed */
</style>
