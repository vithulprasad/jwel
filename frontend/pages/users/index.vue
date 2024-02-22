<template>
  <div data-page="users">
    <UsersUserHeader
      @openDialog="openDialog"
      @filterStudents="filterStudents"
    />
    <div class="container">
      <div class="row">
        <div
          :class="{ 'col-lg-6': isDialogOpen, 'col-lg-12': !isDialogOpen }"
          class="col-md-12 col-sm-12 pt-2"
        >
          <div class="row">
            <div
              v-if="students.length === 0"
              class="col-lg-12 col-md-12 col-sm-12 mx-auto"
            >
              <!-- Render empty page component if no students -->
              <UsersEmptyUser />
            </div>
            <div
              v-else
              class="col-lg-12 col-md-12 col-sm-12 mx-auto"
              v-for="studentDetails in filteredStudents"
              :key="studentDetails.student_id"
            >
              <!-- Render student list component with student details as props -->
              <UsersUserList :studentValues="studentDetails" />
            </div>
          </div>
        </div>
        <div v-if="isDialogOpen" class="col-lg-6 col-md-12 col-sm-12 pt-2">
          <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 mx-auto">
              <UsersAddUser @closeDialog="closeDialog" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getAllStudents } from "../../apiConfig/apiConfig";

definePageMeta({
  layout: "main",
});

const isDialogOpen = ref(false);
const students = ref([]);
const filteredStudents = ref([]);
const selectedUserType = ref("All Users"); // Default selected user type

const openDialog = () => {
  isDialogOpen.value = true;
};

const closeDialog = () => {
  isDialogOpen.value = false;
};
const fetchData = async () => {
  try {
    const res = await getAllStudents();
    students.value = res.data;
    filteredStudents.value = [...res.data];
  } catch (error) {
    console.error("Error fetching students:", error.message);
  }
};
// Filter students based on user type
const filterStudents = (userType) => {
  //Logic to map the label to the db values
  const userTypeMap = {
    Students: "student",
    Admins: "admin",
  };
  const userTypeDBValue = userTypeMap[userType];

  console.log("Filtering students by:", userType);
  selectedUserType.value = userType; // Update selected user type
  console.log(selectedUserType.value, "selected usertype");
  if (userType === "All Users" || userType === "notDefined") {
    // If 'All Users' is selected, show all students
    filteredStudents.value = [...students.value];
  } else if (userTypeDBValue) {
    // Filter students based on user type
    filteredStudents.value = students.value.filter(
      (student) =>
        student.student_type.toLowerCase() === userTypeDBValue.toLowerCase()
    );
  }
  console.log("Filtered students:", filteredStudents.value);
};

onMounted(() => {
  fetchData();
  console.log("Mounted and fetching data... for students");
});
</script>

<style scoped>
/* Add scoped styles here if needed */
</style>
