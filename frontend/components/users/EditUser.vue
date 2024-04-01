<template>
  <div class="container bg-white rounded shadow" style="max-height: 100%">
    <div class="p-3">
      <div class="d-flex justify-content-between align-items-center">
        <h4>Edit User</h4>
        <button class="btn" @click="closeEditDilog">
          <img src="/static/icon/close_button.svg" alt="" />
        </button>
      </div>
      <!-- edit form  -->
      <form @submit.prevent="submitForm">
        <!-- user type -->

        <div>
          <label for=""> User types</label>
          <v-radio-group inline v-model="formData.userType">
            <v-radio label="Student" value="student"></v-radio>
            <v-radio label="Admin" value="admin"></v-radio>
            <v-radio label="Not Defined" value="notDefined"></v-radio>
          </v-radio-group>
          <!-- <span
          style="color: red"
          v-for="error in v$.userType.$errors"
          :key="error.$uid"
        >
          {{ error.$message }}</span
        > -->
        </div>
        <!-- User name -->
        <div>
          <label for="name">User naame</label>
          <input
            v-model="formData.userName"
            id="name"
            placeholder="Enter User Name"
          />
          <!-- <span
          style="color: red"
          v-for="error in v$.userName.$errors"
          :key="error.$uid"
        >
          {{ error.$message }}</span
        > -->
        </div>
        <!-- User logo -->
        <div>
          <label>user logo</label>

          <div>
            <label for="customFileInput" class="custom-file-label"
              >Upload</label
            >
            <input
              class="form-control custom-file-input"
              type="file"
              id="customFileInput"
              @change="handleFileChange"
            />
          </div>
        </div>
        <!-- email -->

        <div>
          <label for="email">Email Address</label>
          <input
            type="email"
            v-model="formData.userEmail"
            placeholder="Enter User Email"
          />
          <!-- <span
          style="color: red"
          v-for="error in v$.userEmail.$errors"
          :key="error.$uid"
        >
          {{ error.$message }}</span
        > -->
        </div>
        <!-- user Phone -->
        <div>
          <label for="phone">Phone Number</label>
          <input
            type="tel"
            v-model="formData.userPhone"
            placeholder="Enter User Phone"
          />
          <!-- <span
          style="color: red"
          v-for="error in v$.userPhone.$errors"
          :key="error.$uid"
        >
          {{ error.$message }}</span
        > -->
        </div>
        <!-- parents phone -->
        <div>
          <label for="Parentsphone">Parents Number</label>
          <input
            type="tel"
            v-model="formData.parentsPhone"
            placeholder="Enter User Phone"
          />
          <!-- <span
          style="color: red"
          v-for="error in v$.parentsPhone.$errors"
          :key="error.$uid"
        >
          {{ error.$message }}</span
        > -->
        </div>
        <!-- School -->
        <div>
          <label for="event-type" class="form-label">Schools</label>
          <select
            aria-placeholder="plese select School"
            v-model="selectedSchoolId"
            class="form-select"
          >
            <option disabled selected>Please select an School</option>
            <option
              v-for="school in schools"
              :key="school.school_id"
              :value="school.school_id"
            >
              {{ school.school_name }}
            </option>
          </select>
        </div>

        <!-- school address -->
        <div>
          <label for="school-address" class="form-label">School Address</label>
          <textarea
            v-model="formData.schoolAddress"
            class="form-control"
            rows="3"
          ></textarea>
          <!-- <span
          style="color: red"
          v-for="error in v$.schoolAddress.$errors"
          :key="error.$uid"
        >
          {{ error.$message }}</span
        > -->
        </div>
        <!-- file upload -->

        <!-- submit button -->

        <div class="d-grid mt-4">
          <button class="btn btn-primary text-white" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import {
  getUserById,
  updateUserById,
  getAllSchools,
  getSchoolById,
} from "~/apiConfig/apiConfig";
import { reactive } from "vue";
const props = defineProps(["userId"]);
const schools = ref([]);
const selectedSchoolId = ref("");
const emit = defineEmits(["closeEditDilog"]);
const closeEditDilog = () => {
  emit("closeEditDilog");
};
const formData = reactive({
  userType: "",
  userName: "",
  userPhone: "",
  userEmail: "",
  parentsPhone: "",

  schoolAddress: "",
});
const fetchData = async () => {
  try {
    const response = await getUserById(props.userId);
    const userData = response.data;
    const userSchoolResponse = await getSchoolById(userData.school_id);
    const userSchool = userSchoolResponse.data;
    console.log(userSchool, "selected user school");

    const schoolResponse = await getAllSchools();
    schools.value = schoolResponse.data;
    Object.assign(formData, {
      userType: userData.student_type,
      userName: userData.student_name,
      userPhone: userData.phone_number,
      userEmail: userData.email_address,
      parentsPhone: userData.parents_phone_number,
      schoolAddress: userData.school_address,
    });
  } catch (error) {
    console.error("Error fetching initial data:", error);
  }
};
const submitForm = async () => {
  try {
    const response = await updateUserById(props.userId, formData);

    alert("User updated successfully");
  } catch (error) {
    console.error("Error updating User:", error);
    alert("Error updating User");
  }
};
onMounted(fetchData);
</script>

<style lang="scss" scoped></style>
