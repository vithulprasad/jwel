<template>
  <div class="container bg-white rounded shadow" style="max-height: 100%">
    <div class="p-3">
      <div class="d-flex justify-content-between align-items-center">
        <h4>Add New Alliance</h4>
        <button class="btn" @click="closeDialog">
          <img src="/static/icon/close_button.svg" alt="" />
        </button>
      </div>
      <form @submit.prevent="">
        
        <!-- Submit button -->
        <div class="d-grid mt-4">
          <button class="btn btn-primary text-white" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<!-- Button with close logic -->
<!-- <button class="btn btn-danger" @click="closeDialog">Close</button> -->

<script setup>
const emit = defineEmits(["closeDialog", "openUserSelectionDialog"]);

function openUserSelectionDialog() {
  emit("openUserSelectionDialog");
}
function closeDialog() {
  emit("closeDialog");
}
</script>

<style scoped>
.form-container {
  max-height: 400px;
  overflow-y: auto;
  padding: 15px;
}
</style>
