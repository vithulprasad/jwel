<template>
  <div class="container bg-white rounded shadow" style="max-height: 100%">
    <div class="p-3">
      <div class="d-flex justify-content-between align-items-center">
        <h4>Add New Event</h4>
        <button class="btn" @click="closeDialog">
          <img src="/static/icon/close_button.svg" alt="" />
        </button>
      </div>
      <!-- <div class="d-flex">
          <img src="/static/icon/search.svg" alt="" />
          <h6>Event information</h6>
          <img src="/static/icon/search.svg" alt="" />
          <h6>Event management</h6>
        </div> -->

      <SchoolsIndiStepper />
    </div>
  </div>
</template>

<!-- Button with close logic -->
<!-- <button class="btn btn-danger" @click="closeDialog">Close</button> -->

<!-- <script>
export default {
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },
  },
};
</script> -->
<script setup>
const emit = defineEmits(["closeDialog"]);

const closeDialog = () => {
  emit("closeDialog");
};
</script>

<style scoped>
.form-container {
  max-height: 400x; /* Set the maximum height for the form container */
  overflow-y: auto; /* Enable vertical scrolling */
  padding: 15px;
}
</style>
