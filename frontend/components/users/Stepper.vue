<template>
  <div>
    <form @submit.prevent="submitForm">
      <!-- user type -->

      <div>
        <label for=""> User types</label>
        <v-radio-group inline v-model="userType">
          <v-radio label="Student" value="student"></v-radio>
          <v-radio label="Admin" value="admin"></v-radio>
          <v-radio label="Not Defined" value="notDefined"></v-radio>
        </v-radio-group>
        <span
          style="color: red"
          v-for="error in v$.userType.$errors"
          :key="error.$uid"
        >
          {{ error.$message }}</span
        >
      </div>
      <!-- User name -->
      <div>
        <label for="name">User naame</label>
        <input v-model="userName" id="name" placeholder="Enter User Name" />
        <span
          style="color: red"
          v-for="error in v$.userName.$errors"
          :key="error.$uid"
        >
          {{ error.$message }}</span
        >
      </div>
      <!-- User logo -->
      <div>
        <label>user logo</label>

        <div>
          <label for="customFileInput" class="custom-file-label">Upload</label>
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
          v-model="userEmail"
          placeholder="Enter User Email"
        />
        <span
          style="color: red"
          v-for="error in v$.userEmail.$errors"
          :key="error.$uid"
        >
          {{ error.$message }}</span
        >
      </div>
      <!-- user Phone -->
      <div>
        <label for="phone">Phone Number</label>
        <input type="tel" v-model="userPhone" placeholder="Enter User Phone" />
        <span
          style="color: red"
          v-for="error in v$.userPhone.$errors"
          :key="error.$uid"
        >
          {{ error.$message }}</span
        >
      </div>
      <!-- parents phone -->
      <div>
        <label for="Parentsphone">Parents Number</label>
        <input
          type="tel"
          v-model="parentsPhone"
          placeholder="Enter User Phone"
        />
        <span
          style="color: red"
          v-for="error in v$.parentsPhone.$errors"
          :key="error.$uid"
        >
          {{ error.$message }}</span
        >
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
          <option v-for="school in schools" :key="school.school_id" :value="school.school_id">
            {{  school.school_name }}
          </option>
        </select>
        <span
          style="color: red"
          v-for="error in v$.selectedSchoolId.$errors"
          :key="error.$uid"
        >
          {{ error.$message }}</span
        >
      </div>
    
      <!-- school address -->
      <div>
        <label for="school-address" class="form-label">School Address</label>
        <textarea
          v-model="schoolAddress"
          class="form-control"
          rows="3"
        ></textarea>
        <span
          style="color: red"
          v-for="error in v$.schoolAddress.$errors"
          :key="error.$uid"
        >
          {{ error.$message }}</span
        >
      </div>
      <!-- file upload -->

      <!-- submit button -->

      <div class="d-grid mt-4">
        <button class="btn btn-primary text-white" type="submit">Submit</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { required, email, numeric, helpers } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

import { createUser, getAllSchools } from "~/apiConfig/apiConfig";



const schools = ref([]);
const selectedSchoolId = ref("");

const userType = ref("");
const userName = ref("");
const userEmail = ref("");
const userPhone = ref("");
const parentsPhone = ref("");
const schoolAddress = ref("");
const rules = computed(() => {
  return {
    userType: {
      required: helpers.withMessage("Please select user type", required),
    },
    userName: {
      required: helpers.withMessage("Please enter user name", required),
    },
    userEmail: {
      required: helpers.withMessage("Please enter email address", required),
      email: helpers.withMessage("Please enter a valid email address", email),
    },
    userPhone: {
      required: helpers.withMessage("Please enter phone number", required),
      numeric: helpers.withMessage(
        "Please enter a valid phone number",
        numeric
      ),
    },
    parentsPhone: {
      required: helpers.withMessage(
        "Please enter parents phone number",
        required
      ),
      numeric: helpers.withMessage(
        "Please enter a valid phone number",
        numeric
      ),
    },

    selectedSchoolId: {
      required: helpers.withMessage("Please select a school", required),
    },
    schoolAddress: {
      required: helpers.withMessage("Please enter school address", required),
    },
  };
});
const v$ = useVuelidate(rules, {
  userType,
  userName,
  userEmail,
  userPhone,
  parentsPhone,
  selectedSchoolId,
  schoolAddress,
});

// Fetch schools from the database
const fetchSchoolList = async () => {
  try {
    const response = await getAllSchools();
    schools.value = response.data;
  } catch (error) {
    console.error("Error fetching schools:", error);
  }
};


const submitForm = async () => {
  console.log(selectedSchoolId.value,"school valuee ")

  const result = await v$.value.$validate();
  if (result) {
    try {
      const response = await createUser({
        student_type: userType.value,
        student_name: userName.value,
        email_address: userEmail.value,
        phone_number: userPhone.value,
        parents_phone_number: parentsPhone.value,
        school_id: selectedSchoolId.value,
        school_address: schoolAddress.value,
      });
      console.log(response.data, "this the school data");
      resetForm();
    } catch (error) {
      console.log("error in creating student", error);
    }
  } else {
    alert("Form validation failed");
  }
};

const resetForm = () => {
  userType.value = "";
  userName.value = "";
  email.value = "";
  userPhone.value = "";
  parentsPhone.value = "";
  selectedSchoolId.value = "";
  schoolAddress.value = "";
};

onMounted(() => {
  fetchSchoolList();
  console.log("Mounted and fetching data... for students");
});
</script>

<style>
label {
  display: block;
  margin-bottom: 5px;
}

input {
  display: block;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
}
.custom-file-input {
  opacity: 0;
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.custom-file-label {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
}
</style>
