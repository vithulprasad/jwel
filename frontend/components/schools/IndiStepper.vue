<template>
  <div>
    <form action="">
      <!-- User name -->
      <div>
        <label for="name">School naame</label>
        <input id="name" placeholder="Enter School Name" />
      </div>
      <!-- School Phone -->
      <div>
        <label for="phone">School Contact Number</label>
        <input
          type="tel"
          v-model="phone"
          placeholder="Enter School Contact Number"
        />
      </div>
      <!--  type -->

      <div>
        <label for=""> User types</label>
        <v-radio-group inline>
          <v-radio label="Student" value="student"></v-radio>
          <v-radio label="Admin" value="admin"></v-radio>
        </v-radio-group>
      </div>
      <!-- school logo -->
      <div></div>

      <!-- school address -->
      <div>
        <label for="school-address" class="form-label">School Address</label>
        <textarea v-model="address" class="form-control" rows="3"></textarea>
      </div>

      <!-- Principal Details -->

      <label for="">Principal Details</label>
      <div>
        <input id="name" placeholder="Enter  Name" />
      </div>

      <div>
        <input type="email" v-model="email" placeholder="Email" />
      </div>
      <div>
        <input
          type="tel"
          v-model="phone"
          placeholder="Enter School Contact Number"
        />
      </div>

      <!-- submit button -->

      <div class="d-grid mt-4">
        <button class="btn btn-primary text-white" type="button">Submit</button>
      </div>
    </form>
  </div>
</template>

<script setup></script>

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
