<template>
  <div class="container bg-white rounded shadow" style="max-height: 100%">
    <div class="p-3">
      <div class="d-flex justify-content-between align-items-center">
        <h4>Edit School</h4>
        <button class="btn" @click="closeEditDilog">
          <img src="/static/icon/close_button.svg" alt="" />
        </button>
      </div>
      <!-- edit form  -->
      <form @submit.prevent="submitForm">
        <!-- School Name -->
        <div>
          <label for="school-name">School Name</label>
          <input
            v-model="formData.schoolName"
            id="school-name"
            placeholder="Enter School Name"
          />
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
        </div>

        <!-- User Type -->
        <div>
          <label>User Type</label>
          <v-radio-group inline v-model="formData.schoolType">
            <v-radio label="Independent School" value="independent"></v-radio>
            <v-radio label="Group School" value="group"></v-radio>
          </v-radio-group>
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
        </div>

        <!-- Principal Details -->
        <div>
          <label for="principal-name">Principal Name</label>
          <input
            v-model="formData.principalName"
            id="principal-name"
            placeholder="Enter Principal Name"
          />
        </div>

        <div>
          <label for="principal-email">Principal Email</label>
          <input
            type="email"
            v-model="formData.principalEmail"
            id="principal-email"
            placeholder="Enter Principal Email"
          />
        </div>

        <div>
          <label for="principal-phone">Principal Phone Number</label>
          <input
            type="tel"
            v-model="formData.principalPhone"
            id="principal-phone"
            placeholder="Enter Principal Phone Number"
          />
        </div>

        <!-- Vice Principal details -->
        <div>
          <label for="vice-name">Vice Principal Name</label>
          <input
            v-model="formData.viceName"
            id="vice-name"
            placeholder="Enter Vice Principal Name"
          />
        </div>

        <div>
          <label for="vice-email">Vice Principal Email</label>
          <input
            type="email"
            v-model="formData.viceEmail"
            id="vice-email"
            placeholder="Enter Vice Principal Email"
          />
        </div>

        <div>
          <label for="vice-phone">Vice Principal Phone Number</label>
          <input
            type="tel"
            v-model="formData.vicePhone"
            id="vice-phone"
            placeholder="Enter Vice Principal Phone Number"
          />
        </div>

        <!-- Submit Button -->
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
import { reactive } from "vue";
import { getSchoolById, updateSchoolById } from "~/apiConfig/apiConfig";

const props = defineProps(["schoolId"]);
const emit = defineEmits(["closeEditSchool"]);
const closeEditDilog = () => {
  emit("closeEditSchool");
};
const formData = reactive({
  schoolName: "",
  schoolPhone: "",
  schoolType: "",
  schoolAddress: "",
  principalName: "",
  principalEmail: "",
  principalPhone: "",
  viceName: "",
  viceEmail: "",
  vicePhone: "",
});
const fetchData = async () => {
  try {
    const response = await getSchoolById(props.schoolId);
    const schoolData = response.data;
    Object.assign(formData, {
      schoolName: schoolData.school_name,
      schoolPhone: schoolData.school_number,
      schoolType: schoolData.school_type,
      schoolAddress: schoolData.school_address,
      principalName: schoolData.principal_name,
      principalEmail: schoolData.principal_email,
      principalPhone: schoolData.principal_phone_number,
      viceName: schoolData.vice_name,
      viceEmail: schoolData.vice_email,
      vicePhone: schoolData.vice_phone_number,
    });
    console.log(schoolData, "School data fetched");
  } catch (error) {
    console.error("Error fetching initial data:", error);
  }
};
const submitForm = async () => {
  try {
    const response = await updateSchoolById(props.schoolId, formData);
    console.log(formData,"formdata given to backend")
    console.log("School updated successfully:", response);
    alert("School updated successfully");
  } catch (error) {
    console.error("Error updating school:", error);
    alert("Error updating school");
  }
};

onMounted(fetchData);
</script>

<style scoped></style>
