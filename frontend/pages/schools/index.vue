<template>
  <div data-page="schools">
    <SchoolsSchoolHeader @openDialog="openDialog" />

    <div class="container">
      <div class="row">
        <div
          :class="{
            'col-lg-6': isDialogOpen || isViewDilogOpen || isEditDilogOpen,
            'col-lg-12': !(isDialogOpen || isViewDilogOpen || isEditDilogOpen),
          }"
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
              <SchoolsSchoolList
                :schoolValues="schoolDetails"
                @openViewSchool="openViewDilog"
                @editSchool="openEditDilog"
              />
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
        <div v-if="isViewDilogOpen" class="col-lg-6 col-md-12 col-sm-12 pt-2">
          <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 mx-auto">
              <SchoolsViewSchool @closeViewSchool="closeViewDilog" />
            </div>
          </div>
        </div>
        <div v-if="isEditDilogOpen" class="col-lg-6 col-md-12 col-sm-12 pt-2">
          <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 mx-auto">
              <SchoolsEditSchool
                :schoolId="selectedSchoolIdEdit"
                @closeEditSchool="closeEditDilog"
              />
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
const isViewDilogOpen = ref(false);
const isEditDilogOpen = ref(false);
const selectedSchoolIdEdit = ref(null);
const schools = ref([]);

const openDialog = () => {
  closeAllDialogs();
  isDialogOpen.value = true;
};

const closeDialog = () => {
  isDialogOpen.value = false;
};
const openViewDilog = () => {
  closeAllDialogs();
  isViewDilogOpen.value = true;
};
const closeViewDilog = () => {
  isViewDilogOpen.value = false;
};
const openEditDilog = (schoolId) => {
  closeAllDialogs();
  selectedSchoolIdEdit.value = schoolId;
  console.log(selectedSchoolIdEdit.value, "edit school id");
  isEditDilogOpen.value = true;
};
const closeEditDilog = () => {
  isEditDilogOpen.value = false;
};
const closeAllDialogs = () => {
  isDialogOpen.value = false;
  isViewDilogOpen.value = false;
  isEditDilogOpen.value = false;
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
