<template>
  <form @submit.prevent="submitForm">
    <div>
      <label for="name">Ministry Name</label>
      <input
        v-model="ministryName"
        id="name"
        placeholder="Enter Ministry Name"
      />
      <span
        style="color: red"
        v-for="error in v$.ministryName.$errors"
        :key="error.$uid"
      >
        {{ error.$message }}</span
      >
    </div>
    <div class="d-grid mt-4">
      <button class="btn btn-primary text-white" type="submit">Save</button>
    </div>
  </form>
</template>

<script setup>
import { ref, computed } from "vue";
import { required,helpers } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { createMinistry } from "~/apiConfig/apiConfig";

const ministryName = ref("");
const rules = computed(() => {
  return {
    ministryName: {
      required: helpers.withMessage("Please enter Mininstry", required),
    },
  };
});

const v$ = useVuelidate(rules, { ministryName });

const submitForm = async () => {
  const result = await v$.value.$validate();
  if (result) {
    try {
      const response = await createMinistry({
        ministry_name: ministryName.value,
      });
      console.log(response.data, "Ministry created successfully");
      resetForm();
    } catch (error) {
      console.log("error in creating Ministry", error);
    }
  } else {
    alert("Form validation failed");
  }
};

const resetForm = () => {
  ministryName.value = "";
};
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
</style>

<!-- <template>
  <form @submit.prevent="submitForm">
    <div>
      <label for="name">Minstry Name</label>
      <input
        v-model="ministryName"
        id="name"
        placeholder="Enter Minstry Name"
      />
    </div>
    <div class="d-grid mt-4">
      <button class="btn btn-primary text-white" type="submit">Save</button>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { createMinistry } from "~/apiConfig/apiConfig";
const ministryName = ref("");
const submitForm = async () => {
  const formData = {
    ministry_name: ministryName.value,
  };
  try {
    const response = await createMinistry(formData);
    console.log(response.data, "Ministry created successfully");
    resetForm();
  } catch (error) {
    console.log("error in creating Ministry", error);
  }
};
const resetForm = () => {
  ministryName.value = "";
};
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
</style> -->
