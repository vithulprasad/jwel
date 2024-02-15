<template>
  <div>
    <form @submit.prevent="submitForm">
      <!-- School Name -->

      <div>
        <label for="school-name">School Name</label>
        <input
          v-model="formData.schoolName"
          id="school-name"
          placeholder="Enter School Name"
        />
        <span
          style="color: red"
          v-for="error in v$.schoolName.$errors"
          :key="error.$uid"
        >
          {{ error.$message }}</span
        >
      </div>

      <!-- School Contact Number -->
      <div>
        <label for="school-phone">School Contact Number</label>
        <input
          type="tel"
          v-model="formData.schoolPhone"
          id="school-phone"
          placeholder="Enter School Contact Number"
        />
        <span
          style="color: red"
          v-for="error in v$.schoolPhone.$errors"
          :key="error.$uid"
        >
          {{ error.$message }}</span
        >
      </div>

      <!-- User Type -->
      <div>
        <label>User Type</label>
        <v-radio-group inline v-model="formData.schoolType">
          <v-radio label="Indipendant School" value="independant"></v-radio>
          <v-radio label="Group shcool" value="group"></v-radio>
        </v-radio-group>
        <span
          style="color: red"
          v-for="error in v$.schoolType.$errors"
          :key="error.$uid"
        >
          {{ error.$message }}</span
        >
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
          v-model="formData.schoolAddress"
          id="school-address"
          rows="3"
          placeholder="Enter School Address"
        ></textarea>
        <span
          style="color: red"
          v-for="error in v$.schoolAddress.$errors"
          :key="error.$uid"
        >
          {{ error.$message }}</span
        >
      </div>

      <!-- Principal Details -->
      <div>
        <label for="principal-name">Principal Name</label>
        <input
          v-model="formData.principalName"
          id="principal-name"
          placeholder="Enter Principal Name"
        />
        <span
          style="color: red"
          v-for="error in v$.principalName.$errors"
          :key="error.$uid"
        >
          {{ error.$message }}</span
        >
      </div>

      <div>
        <label for="principal-email">Principal Email</label>
        <input
          type="email"
          v-model="formData.principalEmail"
          id="principal-email"
          placeholder="Enter Principal Email"
        />
        <span
          style="color: red"
          v-for="error in v$.principalEmail.$errors"
          :key="error.$uid"
        >
          {{ error.$message }}</span
        >
      </div>

      <div>
        <label for="principal-phone">Principal Phone Number</label>
        <input
          type="tel"
          v-model="formData.principalPhone"
          id="principal-phone"
          placeholder="Enter Principal Phone Number"
        />
        <span
          style="color: red"
          v-for="error in v$.principalPhone.$errors"
          :key="error.$uid"
        >
          {{ error.$message }}</span
        >
      </div>

      <!-- Submit Button -->
      <div class="d-grid mt-4">
        <button class="btn btn-primary text-white" type="submit">Submit</button>
      </div>
    </form>
  </div>
</template>
<script setup>
import { ref, reactive, computed } from "vue";
import { required, email, numeric, helpers } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { createSchool } from "~/apiConfig/apiConfig";

const formData = reactive({
  schoolName: "",
  schoolPhone: "",
  schoolType: "",
  schoolAddress: "",
  principalName: "",
  principalEmail: "",
  principalPhone: "",
});
const rules = computed(() => {
  const phoneNumberPattern = /^\d*$/; // Regular expression to match only numbers

  return {
    schoolName: {
      required: helpers.withMessage("Please enter school name", required),
    },
    schoolPhone: {
      required: helpers.withMessage(
        "Please enter principal phone number",
        required
      ),
      numeric: helpers.withMessage(
        "Please enter a valid phone number",
        (value) => {
          if (value === "") return true; // Allow empty values, the required validator will handle it
          return /^\d+$/.test(value); // Check if the value contains only digits
        }
      ),
    },
    schoolType: {
      required: helpers.withMessage("Please select school type", () => {
        return formData.schoolType !== "";
      }),
    },
    schoolAddress: {
      required: helpers.withMessage("Please enter school address", required),
    },
    principalName: {
      required: helpers.withMessage("Please enter principal name", required),
    },
    principalEmail: {
      required: helpers.withMessage("Please enter principal email", required),
      email: helpers.withMessage("Please enter a valid email address", email),
    },
    principalPhone: {
      required: helpers.withMessage(
        "Please enter principal phone number",
        required
      ),
      numeric: helpers.withMessage(
        "Please enter a valid phone number",
        (value) => {
          if (value === "") return true; // Allow empty values, the required validator will handle it
          return /^\d+$/.test(value); // Check if the value contains only digits
        }
      ),
    },
  };
});

const v$ = useVuelidate(rules, formData);

const submitForm = async () => {
  const result = await v$.value.$validate();
  if (result) {
    try {
      const response = await createSchool({
        school_name: formData.schoolName,
        school_phone_number: formData.schoolPhone,
        school_type: formData.schoolType,
        school_address: formData.schoolAddress,
        principal_name: formData.principalName,
        principal_email: formData.principalEmail,
        principal_phone_number: formData.principalPhone,
      });
      console.log(response.data, "school created successfully");
      resetForm();
      alert("Form submitted successfully");
    } catch (error) {
      console.log("Error in creating school", error);
      alert("Error in form submission");
    }
  } else {
    alert("Form validation failed");
  }
};

const resetForm = () => {
  formData.schoolName = "";
  formData.schoolPhone = "";
  formData.schoolType = "";
  formData.schoolAddress = "";
  formData.principalName = "";
  formData.principalEmail = "";
  formData.principalPhone = "";
};
</script>

<!-- <script setup>
import { ref } from "vue";
import { required, email, numeric } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
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
</script> -->

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
input.is-invalid,
textarea.is-invalid {
  border-color: red;
}

.has-error .error-message {
  color: red;
}
</style>
