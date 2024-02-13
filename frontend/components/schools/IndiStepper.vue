<template>
  <div>
    <form @submit.prevent="submitForm">
      <!-- School Name -->
      <div>
        <label for="school-name">School Name</label>
        <input
          v-model="schoolName"
          id="school-name"
          placeholder="Enter School Name"
        />
      </div>

      <!-- School Contact Number -->
      <div>
        <label for="school-phone">School Contact Number</label>
        <input
          type="tel"
          v-model="schoolPhone"
          id="school-phone"
          placeholder="Enter School Contact Number"
        />
      </div>

      <!-- User Type -->
      <div>
        <label>User Type</label>
        <v-radio-group inline v-model="schoolType">
          <v-radio label="Indipendant School" value="independant"></v-radio>
          <v-radio label="Group shcool" value="group"></v-radio>
        </v-radio-group>
      </div>
      <!-- School logo -->
      <div>
        <label>School logo</label>

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

      <!-- School Address -->
      <div>
        <label for="school-address">School Address</label>
        <textarea
          v-model="schoolAddress"
          id="school-address"
          rows="3"
          placeholder="Enter School Address"
        ></textarea>
      </div>

      <!-- Principal Details -->
      <div>
        <label for="principal-name">Principal Name</label>
        <input
          v-model="principalName"
          id="principal-name"
          placeholder="Enter Principal Name"
        />
      </div>

      <div>
        <label for="principal-email">Principal Email</label>
        <input
          type="email"
          v-model="principalEmail"
          id="principal-email"
          placeholder="Enter Principal Email"
        />
      </div>

      <div>
        <label for="principal-phone">Principal Phone Number</label>
        <input
          type="tel"
          v-model="principalPhone"
          id="principal-phone"
          placeholder="Enter Principal Phone Number"
        />
      </div>

      <!-- Submit Button -->
      <div class="d-grid mt-4">
        <button class="btn btn-primary text-white" type="submit">Submit</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { createSchool } from "~/apiConfig/apiConfig";

const schoolName = ref("");
const schoolPhone = ref("");
const schoolType = ref("");
const schoolAddress = ref("");
const principalName = ref("");
const principalEmail = ref("");
const principalPhone = ref("");

const submitForm = async () => {
  const formData = {
    school_name: schoolName.value,
    school_phone_number: schoolPhone.value,
    school_type: schoolType.value,
    school_address: schoolAddress.value,
    principal_name: principalName.value,
    principal_email: principalEmail.value,
    principal_phone_number: principalPhone.value,
  };
  try {
    const response = await createSchool(formData);
    console.log(response.data, "school created successfully");
    resetForm();
  } catch (error) {
    console.log("error in creating school", error);
  }
};

const resetForm = () => {
  schoolName.value = "";
  schoolPhone.value = "";
  schoolType.value = "";
  schoolAddress.value = "";
  principalName.value = "";
  principalEmail.value = "";
  principalPhone.value = "";
};
</script>

<style>
label {
  display: block;
  margin-bottom: 5px;
}

input,
textarea {
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
