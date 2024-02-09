<template>
  <div>
    <form action="">
      <!-- user type -->

      <div>
        <label for=""> User types</label>
        <v-radio-group inline>
          <v-radio label="Student" value="student"></v-radio>
          <v-radio label="Admin" value="admin"></v-radio>
          <v-radio label="Not Defined" value="notDefined"></v-radio>
        </v-radio-group>
      </div>
      <!-- User name -->
      <div>
        <label for="name">User naame</label>
        <input id="name" placeholder="Enter User Name" />
      </div>
      <!-- email -->

      <div>
        <label for="email">Email Address</label>
        <input type="email" v-model="email" placeholder="Enter User Email" />
      </div>
      <!-- user Phone -->
      <div>
        <label for="phone">Phone Number</label>
        <input type="tel" v-model="phone" placeholder="Enter User Phone" />
      </div>
      <!-- parents phone -->
      <div>
        <label for="Parentsphone">Parents Number</label>
        <input
          type="tel"
          v-model="Parentsphone"
          placeholder="Enter User Phone"
        />
      </div>
      <!-- School -->
      <div>
        <label for="event-type" class="form-label">Schools</label>
        <select
          aria-placeholder="plese select School"
          v-model="schools"
          class="form-select"
        >
          <option value="" disabled selected>Please select an School</option>
          <option
            v-for="school in schools"
            :key="school.value"
            :value="school.value"
          >
            {{ school.label }}
          </option>
        </select>
      </div>
      <!-- school address -->
      <div>
        <label for="school-address" class="form-label">School Address</label>
        <textarea v-model="address" class="form-control" rows="3"></textarea>
      </div>
      <!-- file upload -->
      <!-- submit button -->

      <div class="d-grid mt-4">
        <button class="btn btn-primary text-white" type="button">Submit</button>
      </div>
    </form>
  </div>
</template>

<script setup>
const schools = [
  { label: "School1", value: "School1" },
  { label: "School2", value: "School2" },
  { label: "School3", value: "School3" },
];
</script>

<style >
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
